using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using net_api.Models;

namespace net_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EntitiesController : ControllerBase
    {
        private readonly Context _context;
        private readonly IHubContext<UpdateHub> _hub;

        public EntitiesController(Context context, IHubContext<UpdateHub> hub)
        {
            _context = context;
            _hub = hub;
        }

        // GET: api/Entities
        [HttpGet]
        public async Task<IActionResult> GetEntities([FromQuery] string campaignId, [FromQuery] bool spawnable)
        {
            if (campaignId == "")
            {
                return BadRequest("missing campaign id");
            }

            var campaign = await _context.Campaigns.Include(c => c.Members).FirstOrDefaultAsync(c => c.Id == campaignId);

            if (campaign == null)
            {
                return NotFound();
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId != campaign.UserId || !campaign.Members.Any(m => m.UserId == userId))
            {
                return BadRequest("no permissions");
            }

            if (spawnable && userId != campaign.UserId)
            {
                return BadRequest("can't view spawnables if not admin");
            }

            var query = _context.Entities.Where(e => e.CampaignId == campaign.Id);

            if (spawnable == true)
            {
                query = query.Where(e => e.Spawnable == true);
            }

            var entities = await query.ToListAsync();

            return Ok(entities);
        }

        // GET: api/Entities/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEntity([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // TODO authenticate requests

            var entity = await _context.Entities.Where(e => e.Id == id).Include(e => e.Preset).FirstOrDefaultAsync();

            if (entity == null)
            {
                return NotFound();
            }

            // Make sure a null health is not returned
            if (entity.Health == null)
            {
                entity.Health = new Health
                {
                    Max = 1,
                    Current = 0
                };
            }

            // Make sure a null currency is not returned
            if (entity.Currency == null)
            {
                entity.Currency = 0;
            }

            return Ok(entity);
        }

        // PUT: api/Entities/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntity([FromRoute] string id, [FromBody] Entity entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != entity.Id)
            {
                return BadRequest();
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var campaign = await _context.Campaigns.Include(c => c.Members).FirstOrDefaultAsync(c => c.Id == entity.CampaignId);

            // Check that the user is part of the campaign
            if (userId != campaign.UserId && !campaign.Members.Any(m => m.UserId == userId))
            {
                return BadRequest("no permissions");
            }

            if (userId != campaign.UserId)
            {
                entity.Spawnable = false;
            }

            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            await _hub.Clients.Group($"campaign-{entity.CampaignId}")
                .SendAsync("EntityUpdate", entity);

            return NoContent();
        }

        // POST: api/Entities
        [HttpPost]
        public async Task<IActionResult> PostEntity([FromBody] Entity entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var campaign = await _context.Campaigns.Include(c => c.Members).FirstOrDefaultAsync(c => c.Id == entity.CampaignId);
            var preset = await _context.EntityPresets.FirstOrDefaultAsync(p => p.Id == entity.EntityPresetId);

            if (campaign == null || preset == null)
            {
                return NotFound();
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // Check that the user is part of the campaign
            if (userId != campaign.UserId && !campaign.Members.Any(m => m.UserId == userId))
            {
                return BadRequest("no permissions");
            }

            // Check that the user is allowed to create the specified entity type
            if (!preset.PlayerCreatable && userId != campaign.UserId)
            {
                return BadRequest("entity type is not player creatable, and you are not admin");
            }

            if (userId != campaign.UserId)
            {
                entity.Spawnable = false;
            }

            entity.Id = Nanoid.Nanoid.Generate();

            _context.Entities.Add(entity);
            await _context.SaveChangesAsync();

            await _hub.Clients.Group($"campaign-{entity.CampaignId}")
                .SendAsync("EntityCreate", entity);

            return CreatedAtAction("GetEntity", new { id = entity.Id }, entity);
        }

        // DELETE: api/Entities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntity([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // TODO authenticate requests

            var entity = await _context.Entities.FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }

            _context.Entities.Remove(entity);
            await _context.SaveChangesAsync();

            return Ok(entity);
        }

        private bool EntityExists(string id)
        {
            return _context.Entities.Any(e => e.Id == id);
        }
    }
}