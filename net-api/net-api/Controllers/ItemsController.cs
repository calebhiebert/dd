using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using net_api.Models;

namespace net_api.Controllers
{
    public struct ItemsQueryResponse
    {
        public Item[] Items { get; set; }
        public int Total { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ItemsController : ControllerBase
    {
        private readonly Context _context;

        public ItemsController(Context context)
        {
            _context = context;
        }

        // GET: api/Items
        [HttpGet]
        public IActionResult GetItems(
            [FromQuery(Name = "campaignId")] string campaignId, 
            [FromQuery(Name = "limit")] int limit,
            [FromQuery(Name = "offset")] int offset,
            [FromQuery(Name = "tags")] string tags,
            [FromQuery(Name = "search")] string search
            )
        {
            if (campaignId == null)
            {
                return BadRequest("Missing campaign id");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var campaign = _context.Campaigns
                .Where(c => c.Id == campaignId)
                .Include(c => c.Members)
                .FirstOrDefault();

            if (campaign == null)
            {
                return NotFound();
            }

            // Authorize requests
            if (userId != campaign.UserId && !campaign.Members.Any(m => m.UserId == userId))
            {
                return BadRequest("not authorized");
            }

            if (limit == 0)
            {
                limit = 1000;
            } else if (limit > 50)
            {
                limit = 50;
            }

            IQueryable<Item> items;

            items = _context.Items.Where(i => i.CampaignId == campaignId).OrderBy(i => i.Name);

            // Do not show player items that are not player visible
            if (userId != campaign.UserId)
            {
                items = items.Where(i => i.PlayerVisible == true);
            }

            if (tags != null)
            {
                var tagList = tags.Split(",");
                items = items.Where(i => i.Tags.Any(t => tagList.Contains(t)));
            }

            if (search != null)
            {
                search = search.ToLower().Trim();

                items = items.Where(
                    i => i.Name.ToLower().Contains(search) ||
                    i.Description.ToLower().Contains(search));
            }

            var count = items.Count();

            if (limit > 0 || offset > 0)
            {
                items = items
                    .Skip(offset)
                    .Take(limit);
            }

            return Ok(new ItemsQueryResponse
            {
                Items = items.ToArray(),
                Total = count,
            });
        }

        // GET: api/Items/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // TODO authenticate requests

            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // PUT: api/Items/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem([FromRoute] string id, [FromBody] Item item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != item.Id)
            {
                return BadRequest();
            }

            // TODO authenticate requests

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Items
        [HttpPost]
        public async Task<IActionResult> PostItem([FromBody] Item item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // TODO authenticate requests

            item.Id = Nanoid.Nanoid.Generate();

            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItem", new { id = item.Id }, item);
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            // TODO authenticate requests

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(item);
        }

        private bool ItemExists(string id)
        {
            return _context.Items.Any(e => e.Id == id);
        }
    }
}