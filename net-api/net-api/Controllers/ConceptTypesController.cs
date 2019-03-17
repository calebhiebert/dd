using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using net_api.Models;

namespace net_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ConceptTypesController : ControllerBase
    {
        private readonly Context _context;
        private readonly IAuthorizationService _auth;
        private readonly IHubContext<UpdateHub> _hub;

        public ConceptTypesController(Context context, IAuthorizationService auth, IHubContext<UpdateHub> hub)
        {
            _context = context;
            _auth = auth;
            _hub = hub;
        }

        // GET: api/ConceptTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ConceptType>> GetConceptType(Guid id)
        {
            var conceptType = await _context.ConceptTypes
                .Where(ct => ct.Id == id)
                .Include(ct => ct.Campaign)
                    .ThenInclude(c => c.Members)
                .FirstOrDefaultAsync();

            if (conceptType == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, conceptType.Campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            return conceptType;
        }

        // PUT: api/ConceptTypes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConceptType(Guid id, ConceptType conceptType)
        {
            if (id != conceptType.Id)
            {
                return BadRequest();
            }

            var campaign = await _context.Campaigns
                .Where(c => c.Id == conceptType.CampaignId)
                .Include(c => c.Members)
                .FirstOrDefaultAsync();

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            _context.Entry(conceptType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConceptTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            await _hub.Clients.Group($"campaign-{campaign.Id}").SendAsync("RefreshCurrentCampaign");

            return NoContent();
        }

        // POST: api/ConceptTypes
        [HttpPost]
        public async Task<ActionResult<ConceptType>> PostConceptType(ConceptType conceptType)
        {
            var campaign = await _context.Campaigns
            .Where(c => c.Id == conceptType.CampaignId)
            .Include(c => c.Members)
            .FirstOrDefaultAsync();

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            conceptType.UserId = userId;

            _context.ConceptTypes.Add(conceptType);
            await _context.SaveChangesAsync();

            await _hub.Clients.Group($"campaign-{campaign.Id}").SendAsync("RefreshCurrentCampaign");

            return CreatedAtAction("GetConceptType", new { id = conceptType.Id }, conceptType);
        }

        // DELETE: api/ConceptTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ConceptType>> DeleteConceptType(Guid id)
        {
            var conceptType = await _context.ConceptTypes
                .Where(ct => ct.Id == id)
                .Include(ct => ct.Campaign)
                .FirstOrDefaultAsync();

            if (conceptType == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, conceptType.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            _context.ConceptTypes.Remove(conceptType);
            await _context.SaveChangesAsync();

            await _hub.Clients.Group($"campaign-{conceptType.CampaignId}").SendAsync("RefreshCurrentCampaign");

            return conceptType;
        }

        private bool ConceptTypeExists(Guid id)
        {
            return _context.ConceptTypes.Any(e => e.Id == id);
        }
    }
}
