using System;
using System.Collections.Generic;
using System.Linq;
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
    public class OverviewStatesController : ControllerBase
    {
        private readonly Context _context;
        private readonly IHubContext<UpdateHub> _hub;
        private readonly IAuthorizationService _auth;

        public OverviewStatesController(Context context, IAuthorizationService auth, IHubContext<UpdateHub> hub)
        {
            _context = context;
            _auth = auth;
            _hub = hub;
        }

        // GET: api/OverviewStates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OverviewState>> GetOverviewState(Guid id)
        {
            var overviewState = await _context.OverviewState
                .Where(os => os.Id == id)
                .Include(os => os.Campaign)
                    .ThenInclude(c => c.Members)
                .FirstOrDefaultAsync();

            if (overviewState == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, overviewState.Campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            return overviewState;
        }

        // PUT: api/OverviewStates/campaign/guid
        [HttpPut("campaign/{campaignId}")]
        public async Task<IActionResult> PutOverviewState(Guid campaignId, OverviewState overviewState)
        {
            var campaign = await _context.Campaigns
                .Where(c => c.Id == campaignId)
                .FirstOrDefaultAsync();

            if (campaign == null)
            {
                return NotFound();
            }

            if (campaign.OverviewStateId != null && campaign.OverviewStateId != overviewState.Id)
            {
                return BadRequest("mismatched overview state ids");
            }

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            if (campaign.OverviewStateId == null)
            {
                overviewState.Id = Guid.NewGuid();

                _context.OverviewState.Add(overviewState);
                campaign.OverviewStateId = overviewState.Id;
                _context.Entry(campaign).State = EntityState.Modified;
            } else
            {
                _context.Entry(overviewState).State = EntityState.Modified;
            }

            overviewState.Campaign = null;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OverviewStateExists(overviewState.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            await _hub.Clients.Group($"campaign-{campaign.Id}")
                .SendAsync("OverviewStateUpdate", overviewState);

            return Ok(overviewState);
        }

        private bool OverviewStateExists(Guid id)
        {
            return _context.OverviewState.Any(e => e.Id == id);
        }
    }
}
