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

namespace net_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapsController : ControllerBase
    {
        private static AmazonS3Client _S3;

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
                })
                .ToListAsync();

            return maps;
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
        public async Task<IActionResult> PostMap([FromForm]IFormFile file, [FromForm]Guid? campaignId)
        {
            if (file == null)
            {
                return BadRequest("missing file");
            }

            if (campaignId == null)
            {
                return BadRequest("missing campaign id");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var client = new HttpClient();
            var content = new MultipartFormDataContent();
            content.Add(new StreamContent(file.OpenReadStream()), "file", "mapfile");

            var result = await client.PostAsync($"{Environment.GetEnvironmentVariable("MAP_TILER_ENDPOINT")}?password={Environment.GetEnvironmentVariable("MAP_TILER_PASSWORD")}", content);
            if (result.IsSuccessStatusCode)
            {
                var resultValue = await result.Content.ReadAsAsync<Map>();
                resultValue.UserId = userId;
                resultValue.CampaignId = (Guid)campaignId;

                _context.Maps.Add(resultValue);
                await _context.SaveChangesAsync();

                // Clear mapping value before it's sent to the client
                resultValue.Mapping = null;

                return Ok(resultValue);
            } else
            {
                return BadRequest(result);
            }
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
