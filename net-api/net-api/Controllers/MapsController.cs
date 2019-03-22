using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using net_api.Models;
using Amazon.S3;
using Amazon.S3.Model;
using System.IO;
using Newtonsoft.Json;
using Microsoft.AspNetCore.SignalR;

namespace net_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapsController : ControllerBase
    {
        private static AmazonS3Client _S3;

        private readonly Context _context;
        private readonly IHubContext<UpdateHub> _hub;
        private readonly IAuthorizationService _auth;

        public MapsController(Context context, IHubContext<UpdateHub> hub, IAuthorizationService auth)
        {
            _context = context;
            _hub = hub;
            _auth = auth;
        }

        // GET: api/Maps
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Map>>> GetMaps(
            [FromQuery] Guid? campaignId,
            [FromQuery] int? limit,
            [FromQuery] int? offset,
            [FromQuery] string search
            )
        {
            if (campaignId == null)
            {
                return BadRequest("missing campaign id");
            }

            var campaign = await _context.Campaigns
                .AsNoTracking()
                .Where(c => c.Id == campaignId)
                .Include(c => c.Members)
                .FirstOrDefaultAsync();

            if (campaign == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignViewPolicy");
            var campaignEditableAuthResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            var mapQuery = _context.Maps
                .Where(m => m.CampaignId == campaignId);

            if (!campaignEditableAuthResult.Succeeded)
            {
                mapQuery = mapQuery.Where(m => m.Status == MapStatus.Processed && m.PlayerVisible == true);
            }

            if (search != null && search.Trim().Length > 0)
            {
                mapQuery = mapQuery.Where(m => m.Name.ToLower().Contains(search.ToLower()));
            }

            if (limit == null || limit <= 0)
            {
                limit = 10;
            } else if (limit > 50)
            {
                limit = 50;
            }

            if (offset == null || offset < 0)
            {
                offset = 0;
            }

            mapQuery = mapQuery.Skip((int)offset).Take((int)limit);

            var totalCount = await mapQuery.CountAsync();

            var maps = await mapQuery
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

            return Ok(new { Maps = maps, Total = totalCount });
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

            // Create notification
            var notification = new MapNotification
            {
                UserId = map.UserId,
                Message = $"The map {map.Name} has finished processing and is now ready for use",
                MapId = map.Id,
                CampaignId = map.CampaignId
            };

            _context.Notifications.Add(notification);

            await _context.SaveChangesAsync();

            await _hub.Clients.Group($"notifications-{map.UserId}")
                .SendAsync("Notify");

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

            // Cache for a year
            Response.Headers.Add("Cache-Control", "max-age=31557600");

            return File(bytes, "image/png");
        }

        // GET: api/Maps/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetMap(Guid id)
        {
            var map = await _context.Maps
                .Where(m => m.Id == id)
                .Include(m => m.Campaign)
                    .ThenInclude(c => c.Members)
                .FirstOrDefaultAsync();

            if (map == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, map.Campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            _context.AssetViews.Add(new AssetView(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, map.CampaignId)
            {
                MapId = map.Id,
            });
            await _context.SaveChangesAsync();

            return Ok(map);
        }

        // POST: api/Maps
        [HttpPost]
        [Authorize]
        [RequestSizeLimit(50000000)]
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

            var campaign = await _context.Campaigns
                .Where(c => c.Id == campaignId)
                .Include(c => c.Members)
                .FirstOrDefaultAsync();

            if (campaign == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            var id = Guid.NewGuid();

            var putRequest = new PutObjectRequest();
            putRequest.BucketName = Environment.GetEnvironmentVariable("S3_INGEST_BUCKET_NAME");
            putRequest.InputStream = file.OpenReadStream();
            putRequest.Key = id.ToString();

            var putResult = await S3.PutObjectAsync(putRequest);

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var map = new Map
            {
                Id = id,
                CampaignId = (Guid)campaignId,
                UserId = userId,
                Status = MapStatus.Processing,
                PlayerVisible = true,
                Name = name
            };

            _context.Maps.Add(map);

            await _context.SaveChangesAsync();

            return Ok(map);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateMap([FromBody] Map map, [FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (map.Id != id)
            {
                return BadRequest("submitted body id does not match route id");
            }

            var originalMap = await _context.Maps
                .Where(m => m.Id == id)
                .Include(m => m.Campaign)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            if (originalMap == null)
            {
                return NotFound();
            } else if (originalMap.Status == MapStatus.Processing)
            {
                return BadRequest("cannot update map while procesing");
            }

            var authResult = await _auth.AuthorizeAsync(User, originalMap.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            map.Mapping = originalMap.Mapping;
            map.UserId = originalMap.UserId;
            map.Status = originalMap.Status;

            _context.Entry(map).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }

        // DELETE: api/Maps/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Map>> DeleteMap(Guid id)
        {
            var map = await _context.Maps
                .Where(m => m.Id == id)
                .Include(m => m.Campaign)
                .FirstOrDefaultAsync();

            if (map == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, map.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            try
            {
                var deleteRequest = new DeleteObjectsRequest();
                deleteRequest.BucketName = Environment.GetEnvironmentVariable("S3_BUCKET_NAME");
                deleteRequest.AddKey($"{id.ToString()}.map");
                deleteRequest.AddKey($"{id.ToString()}.json");

                await S3.DeleteObjectsAsync(deleteRequest);
            } catch(Exception ex)
            {
                Console.WriteLine("Error during map delete", ex.Message);
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
