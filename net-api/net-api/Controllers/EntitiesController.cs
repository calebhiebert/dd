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
        private readonly IAuthorizationService _auth;

        public EntitiesController(Context context, IHubContext<UpdateHub> hub, IAuthorizationService auth)
        {
            _context = context;
            _hub = hub;
            _auth = auth;
        }

        // GET: api/Entities
        [HttpGet]
        public async Task<IActionResult> GetEntities([FromQuery] Guid? campaignId, [FromQuery] bool spawnable)
        {
            if (campaignId == null)
            {
                return BadRequest("missing campaign id");
            }

            var campaign = await _context.Campaigns
                .Where(c => c.Id == campaignId)
                .Include(c => c.Members)
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

            var viewSpawnableAuthResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            if (spawnable && !viewSpawnableAuthResult.Succeeded)
            {
                return Forbid();
            }

            var query = _context.Entities
                .Where(e => e.CampaignId == campaign.Id);

            if (spawnable == true)
            {
                query = query.Where(e => e.Spawnable == true);
            }
            else
            {
                query = query.Where(e => e.Spawnable == false);
            }

            var entities = await query.ToListAsync();

            return Ok(entities);
        }

        // GET: api/Entities/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEntity([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = await _context.Entities
                .Where(e => e.Id == id)
                .Include(e => e.Preset)
                .Include(e => e.Campaign)
                    .ThenInclude(c => c.Members)
                .FirstOrDefaultAsync();

            if (entity == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, entity.Campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
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

            _context.AssetViews.Add(new AssetView(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, entity.CampaignId)
            {
                EntityId = entity.Id,
            });
            await _context.SaveChangesAsync();

            return Ok(entity);
        }

        // PUT: api/Entities/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntity([FromRoute] Guid id, [FromBody] Entity entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != entity.Id)
            {
                return BadRequest();
            }

            var existingEntity = await _context.Entities
                .Where(e => e.Id == entity.Id)
                .Include(e => e.Campaign)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            if (existingEntity == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, existingEntity, "EntityEditPolicy");
            var campaignEditableAuthResult = await _auth.AuthorizeAsync(User, existingEntity.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            if (!campaignEditableAuthResult.Succeeded)
            {
                entity.Spawnable = false;
            }

            entity.Campaign = null;
            entity.EntityConcepts = null;
            entity.Map = null;
            entity.SpawnedFrom = null;
            entity.User = null;
            entity.Preset = null;

            entity.UserId = existingEntity.UserId;
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

            var campaign = await _context.Campaigns
                .Include(c => c.Members)
                .FirstOrDefaultAsync(c => c.Id == entity.CampaignId);

            var preset = await _context.EntityPresets
                .FirstOrDefaultAsync(p => p.Id == entity.EntityPresetId);

            if (campaign == null || preset == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignViewPolicy");
            var campaignEditableAuthResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            // Check that the user is allowed to create the specified entity type
            if (!preset.PlayerCreatable && !campaignEditableAuthResult.Succeeded)
            {
                return Forbid();
            }

            if (!campaignEditableAuthResult.Succeeded)
            {
                entity.Spawnable = false;
            }

            entity.Campaign = null;
            entity.EntityConcepts = null;
            entity.Map = null;
            entity.SpawnedFrom = null;
            entity.User = null;
            entity.Preset = null;
            entity.Id = Guid.NewGuid();

            _context.Entities.Add(entity);

            await _context.SaveChangesAsync();

            await _hub.Clients.Group($"campaign-{entity.CampaignId}")
                .SendAsync("EntityCreate", entity);

            return CreatedAtAction("GetEntity", new { id = entity.Id }, entity);
        }

        // DELETE: api/Entities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntity([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = await _context.Entities
                .Where(e => e.Id == id)
                .Include(e => e.Campaign)
                .FirstOrDefaultAsync();

            if (entity == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, entity, "EntityEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            _context.Entities.Remove(entity);
            await _context.SaveChangesAsync();

            await _hub.Clients.Group($"campaign-{entity.CampaignId}")
                .SendAsync("EntityDelete", entity.Id);

            return Ok(entity);
        }

        [HttpPost("spawn/{id}")]
        public async Task<IActionResult> SpawnSpawnable([FromQuery] int count, [FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var preset = await _context.Entities
                .Where(ep => ep.Id == id)
                .Include(ep => ep.Campaign)
                .FirstOrDefaultAsync();

            if (preset == null)
            {
                return NotFound();
            }
            else if (!preset.Spawnable)
            {
                return BadRequest("entity is not spawnable");
            }

            var authResult = await _auth.AuthorizeAsync(User, preset.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            for (var i = 0; i < count; i++)
            {
                var entity = new Entity
                {
                    Name = preset.Name,
                    ContentJson = preset.ContentJson,
                    UserId = preset.UserId,
                    CampaignId = preset.CampaignId,
                    Currency = preset.Currency,
                    ImageId = preset.ImageId,
                    ImageColor1 = preset.ImageColor1,
                    ImageColor2 = preset.ImageColor2,
                    Spawnable = false,
                    FieldsJson = preset.FieldsJson,
                    Health = preset.Health,
                    XP = preset.XP,
                    EntityPresetId = preset.EntityPresetId,
                    SpawnedFromId = preset.Id
                };

                _context.Entities.Add(entity);

                await _hub.Clients.Group($"campaign-{entity.CampaignId}")
                    .SendAsync("EntityCreate", entity);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EntityExists(Guid id)
        {
            return _context.Entities.Any(e => e.Id == id);
        }
    }
}