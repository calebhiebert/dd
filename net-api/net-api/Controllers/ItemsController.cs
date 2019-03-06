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
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ItemsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IAuthorizationService _auth;

        public ItemsController(Context context, IAuthorizationService auth)
        {
            _context = context;
            _auth = auth;
        }

        // GET: api/Items
        [HttpGet]
        public async Task<IActionResult> GetItems(
            [FromQuery] Guid campaignId, 
            [FromQuery] int limit,
            [FromQuery] int offset,
            [FromQuery] string search
            )
        {
            if (campaignId == null)
            {
                return BadRequest("Missing campaign id");
            }

            var campaign = _context.Campaigns
                .Where(c => c.Id == campaignId)
                .Include(c => c.Members)
                .FirstOrDefault();

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

            if (limit <= 0)
            {
                limit = 50;
            } else if (limit > 50)
            {
                limit = 50;
            }

            if (offset < 0)
            {
                offset = 0;
            }

            IQueryable<Item> items;

            items = _context.Items.Where(i => i.CampaignId == campaignId).OrderBy(i => i.Name);

            // Do not show player items that are not player visible
            if (!campaignEditableAuthResult.Succeeded)
            {
                items = items.Where(i => i.PlayerVisible == true);
            }

            if (search != null)
            {
                search = search.ToLower().Trim();

                items = items.Where(
                    i => i.Name.ToLower().Contains(search));
            }

            var count = items.Count();

            if (limit > 0 || offset > 0)
            {
                items = items
                    .Skip(offset)
                    .Take(limit);
            }

            var itemArray = items.ToArray();

            return Ok(new
            {
                Items = itemArray,
                Total = count,
            });
        }

        // GET: api/Items/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = await _context.Items
                .Where(i => i.Id == id)
                .Include(i => i.Campaign)
                    .ThenInclude(c => c.Members)
                .FirstOrDefaultAsync();

            if (item == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, item.Campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            return Ok(item);
        }

        [HttpGet("tags")]
        public async Task<IActionResult> GetTagList([FromQuery] Guid campaignId)
        {
            var campaign = await _context.Campaigns
                .Where(c => c.Id == campaignId)
                .FirstOrDefaultAsync();

            if (campaign == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            var tags = await _context.Query<Tags>()
                .FromSql("SELECT DISTINCT UNNEST(\"Tags\") AS \"Tag\" FROM \"Items\"")
                .Select(t => t.Tag)
                .ToArrayAsync();

            return Ok(tags);
        }

        // PUT: api/Items/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem([FromRoute] Guid id, [FromBody] Item item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != item.Id)
            {
                return BadRequest();
            }

            var existingItem = await _context.Items
                .Where(i => i.Id == id)
                .AsNoTracking()
                .Include(i => i.Campaign)
                .FirstOrDefaultAsync();

            var authResult = await _auth.AuthorizeAsync(User, existingItem.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

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

            var campaign = await _context.Campaigns
                .Where(c => c.Id == item.CampaignId)
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

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            item.UserId = userId;

            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItem", new { id = item.Id }, item);
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = await _context.Items
                .Where(i => i.Id == id)
                .Include(i => i.Campaign)
                .FirstOrDefaultAsync();

            if (item == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, item.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(item);
        }

        private bool ItemExists(Guid id)
        {
            return _context.Items.Any(e => e.Id == id);
        }
    }
}