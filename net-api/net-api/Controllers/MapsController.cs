using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using net_api.Models;
using Amazon.S3;
using Amazon.Runtime;
using Amazon.S3.Model;
using System.IO;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Text;
using Google.Cloud.Storage.V1;
using Google.Apis.Auth.OAuth2;

namespace net_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapsController : ControllerBase
    {
        private static AmazonS3Client _S3;
        private static StorageClient _Storage;

        private readonly Context _context;

        public MapsController(Context context)
        {
            _context = context;
        }

        // GET: api/Maps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Map>>> GetMaps([FromQuery] Guid? campaignId)
        {
            if (campaignId == null)
            {
                return BadRequest("missing campaign id");
            }

            var maps = await _context.Maps
                .Where(m => m.CampaignId == campaignId)
                .Select(m => new Map{
                    Id = m.Id,
                    CampaignId = m.CampaignId,
                    UserId = m.UserId,
                    MinZoom = 0,
                    MaxZoom = m.MaxZoom,
                    Status = m.Status,
                    PlayerVisible = m.PlayerVisible,
                    Name = m.Name,
                })
                .ToListAsync();

            return maps;
        }

        [HttpPost("finished")]
        public async Task<IActionResult> ProcessingCompletedWebhook([FromQuery] Guid id)
        {
            var map = await _context.Maps.Where(m => m.Id == id).FirstOrDefaultAsync();

            if (map == null)
            {
                return NotFound();
            }

            var obj = await S3.GetObjectAsync(new GetObjectRequest
            {
                BucketName = Environment.GetEnvironmentVariable("S3_BUCKET_NAME"),
                Key = id.ToString() + ".json",
            });

            Map parsedMap;

            using (var reader = new StreamReader(obj.ResponseStream))
            {
                string json = await reader.ReadToEndAsync();

                parsedMap = JsonConvert.DeserializeObject<Map>(json);
            }

            map.MaxZoom = parsedMap.MaxZoom;
            map.MinZoom = parsedMap.MinZoom;
            map.Mapping = parsedMap.Mapping;
            map.Status = MapStatus.Processed;

            _context.Entry(map).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}/tile/{zoom}/{x}/{y}")]
        public async Task<IActionResult> GetTile([FromRoute] Guid id, [FromRoute] int zoom, [FromRoute] int x, [FromRoute] int y)
        {
            if (id == null)
            {
                return BadRequest("missing map id");
            }

            var tileBytes =
                await _context
                .Query<MapBytePosition>()
                .FromSql("SELECT JSONB_ARRAY_ELEMENTS(JSONB_EXTRACT_PATH(\"Mapping\", {0})) AS \"BytePosition\" FROM \"Maps\" WHERE \"Id\" = {1}", $"{zoom}_{x}_{y}", id)
                .ToArrayAsync();

            if (tileBytes.Length == 0)
            {
                return NotFound();
            }

            var fileData = tileBytes.Select(t => long.Parse(t.BytePosition)).ToArray();

            var obj = await S3.GetObjectAsync(new GetObjectRequest
            {
                BucketName = Environment.GetEnvironmentVariable("S3_BUCKET_NAME"),
                Key = id.ToString() + ".map",
                ByteRange = new ByteRange(fileData[0], fileData[1])
            });

            byte[] bytes;

            using (var stream = obj.ResponseStream)
            {
                using(var memStream = new MemoryStream())
                {
                    await stream.CopyToAsync(memStream);
                    bytes = memStream.ToArray();
                }
            }

            Response.Headers.Add("Cache-Control", "max-age=31557600");

            return File(bytes, "image/png");
        }

        // GET: api/Maps/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Map>> GetMap(Guid id)
        {
            var map = await _context.Maps.FindAsync(id);

            if (map == null)
            {
                return NotFound();
            }

            return map;
        }

        // POST: api/Maps
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostMap([FromForm]IFormFile file, [FromForm]Guid? campaignId, [FromForm] string name)
        {
            if (file == null)
            {
                return BadRequest("missing file");
            }

            if (campaignId == null)
            {
                return BadRequest("missing campaign id");
            }

            if (name == null || name.Trim().Length == 0)
            {
                return BadRequest("missing name");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var id = Guid.NewGuid();

            var uploader = Storage.CreateObjectUploader(
                Environment.GetEnvironmentVariable("S3_INGEST_BUCKET_NAME"),
                id.ToString(),
                file.ContentType,
                file.OpenReadStream()
                );

            var progress = await uploader.UploadAsync();

            var map = new Map
            {
                Id = id,
                CampaignId = (Guid)campaignId,
                UserId = userId,
                Status = MapStatus.Processing,
                PlayerVisible = false,
                Name = name
            };

            _context.Maps.Add(map);

            await _context.SaveChangesAsync();

            return Ok(map);
        }

        // DELETE: api/Maps/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Map>> DeleteMap(Guid id)
        {
            var map = await _context.Maps.FindAsync(id);
            if (map == null)
            {
                return NotFound();
            }

            _context.Maps.Remove(map);
            await _context.SaveChangesAsync();

            return map;
        }

        private bool MapExists(Guid id)
        {
            return _context.Maps.Any(e => e.Id == id);
        }

        private StorageClient Storage
        {
            get
            {
                if (_Storage == null)
                {

                    _Storage = StorageClient
                        .Create(credential: GoogleCredential.FromJson(Environment.GetEnvironmentVariable("STORAGE_SERVICE_ACCOUNT")));
                }

                return _Storage;
            }
        }

        private AmazonS3Client S3
        {
            get
            {
                if (_S3 == null)
                {
                    _S3 = new AmazonS3Client(
                        Environment.GetEnvironmentVariable("S3_ACCESS_KEY"),
                        Environment.GetEnvironmentVariable("S3_ACCESS_SECRET"),
                        new AmazonS3Config
                            {
                                ServiceURL = Environment.GetEnvironmentVariable("S3_SERVICE_URL")
                            });
                }

                return _S3;
            }
        }
    }
}
