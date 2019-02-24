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

namespace net_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EntityPresetsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IAuthorizationService _auth;

        public EntityPresetsController(Context context, IAuthorizationService auth)
        {
            _context = context;
            _auth = auth;
        }

        // GET: api/EntityPresets
        [HttpGet]
        public async Task<IActionResult> GetEntityPresets([FromQuery] Guid campaignId)
        {
            if (campaignId == null)
            {
                return BadRequest("Missing campaign id");
            }

            var campaign = await _context.Campaigns
                .Where(c => c.Id == campaignId)
                .Include(c => c.Members)
                .Include(c => c.EntityPresets)
                .FirstOrDefaultAsync();

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            return Ok(campaign.EntityPresets);
        }

        // GET: api/EntityPresets/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEntityPreset([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entityPreset = await _context.EntityPresets
                .Where(ep => ep.Id == id)
                .Include(ep => ep.Campaign)
                    .ThenInclude(c => c.Members)
                .FirstOrDefaultAsync();

            if (entityPreset == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, entityPreset.Campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            return Ok(entityPreset);
        }

        // PUT: api/EntityPresets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntityPreset([FromRoute] Guid id, [FromBody] EntityPreset entityPreset)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != entityPreset.Id)
            {
                return BadRequest();
            }

            var campaign = await _context.Campaigns
                .Where(c => c.Id == entityPreset.CampaignId)
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

            _context.Entry(entityPreset).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntityPresetExists(id))
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

        // POST: api/EntityPresets
        [HttpPost]
        public async Task<IActionResult> PostEntityPreset([FromBody] EntityPreset entityPreset)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var campaign = await _context.Campaigns
                .Where(c => c.Id == entityPreset.CampaignId)
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

            _context.EntityPresets.Add(entityPreset);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEntityPreset", new { id = entityPreset.Id }, entityPreset);
        }

        // DELETE: api/EntityPresets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntityPreset([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // TODO authenticate requests

            var entityPreset = await _context.EntityPresets.FindAsync(id);
            if (entityPreset == null)
            {
                return NotFound();
            }

            var campaign = await _context.Campaigns
                .Where(c => c.Id == entityPreset.CampaignId)
                .FirstOrDefaultAsync();

            if (campaign == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            _context.EntityPresets.Remove(entityPreset);
            await _context.SaveChangesAsync();

            return Ok(entityPreset);
        }

        private bool EntityPresetExists(Guid id)
        {
            return _context.EntityPresets.Any(e => e.Id == id);
        }
    }
}