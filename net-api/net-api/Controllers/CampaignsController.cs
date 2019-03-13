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
    public class CampaignsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IHubContext<UpdateHub> _hub;
        private readonly IAuthorizationService _auth;

        public CampaignsController(Context context, IHubContext<UpdateHub> hub, IAuthorizationService auth)
        {
            _context = context;
            _hub = hub;
            _auth = auth;
        }

        // GET: api/Campaigns
        [HttpGet]
        public IEnumerable<Campaign> GetCampaigns()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return _context.Campaigns
                .Include(c => c.Members)
                .Include(c => c.User)
                .Where(c => c.UserId == userId || c.Members.Any(m => m.UserId == userId));
        }

        // GET: api/Campaigns/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCampaign([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var campaign = await _context.Campaigns
                .Where(c => c.Id == id)
                .Include(c => c.EntityPresets)
                .Include(c => c.Entities)
                .Include(c => c.ConceptTypes)
                .Include(c => c.Members)
                    .ThenInclude(m => m.User)
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

            if (campaign.CurrencyMap == null || campaign.CurrencyMap.Count == 0)
            {
                campaign.CurrencyMap = new List<CurrencyLevel> { new CurrencyLevel { Name = "gp", UseInConversions = true, Value = 1 } };
            } else if (campaign.CurrencyMap[0].Value != 1 || campaign.CurrencyMap[0].UseInConversions == false)
            {
                campaign.CurrencyMap[0].Value = 1;
                campaign.CurrencyMap[0].UseInConversions = true;
            }

            return Ok(campaign);
        }

        // PUT: api/Campaigns/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCampaign([FromRoute] Guid id, [FromBody] Campaign campaign)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != campaign.Id)
            {
                return BadRequest();
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var existingCampaign = await _context.Campaigns
                .AsNoTracking()
                .Where(c => c.Id == id)
                .Include(c => c.Members)
                .FirstOrDefaultAsync();

            if (existingCampaign == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            campaign.UserId = existingCampaign.UserId;

            var cmap = campaign.CurrencyMap;

            if (cmap == null || cmap.Count == 0)
            {
                campaign.CurrencyMap = new List<CurrencyLevel> { new CurrencyLevel { Name = "gp", UseInConversions = true, Value = 1 } };
            }
            else if (campaign.CurrencyMap[0].Value != 1 || campaign.CurrencyMap[0].UseInConversions == false)
            {
                cmap[0].Value = 1;
                cmap[0].UseInConversions = true;

                campaign.CurrencyMap = cmap;
            }

            _context.Entry(campaign).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CampaignExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            await _hub.Clients.Group($"campaign-{campaign.Id}")
                .SendAsync("CampaignUpdate", campaign);

            return NoContent();
        }

        // POST: api/Campaigns
        [HttpPost]
        public async Task<IActionResult> PostCampaign([FromBody] Campaign campaign)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var campaignUser = new CampaignUser
            {
                CampaignId = campaign.Id,
                UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            };

            campaign.Members.Add(campaignUser);

            _context.Campaigns.Add(campaign);
            _context.CampaignUsers.Add(campaignUser);

            await _context.SaveChangesAsync();

            var cmap = campaign.CurrencyMap;

            if (cmap == null || cmap.Count == 0)
            {
                campaign.CurrencyMap = new List<CurrencyLevel> { new CurrencyLevel { Name = "gp", UseInConversions = true, Value = 1 } };
            }
            else if (campaign.CurrencyMap[0].Value != 1 || campaign.CurrencyMap[0].UseInConversions == false)
            {
                cmap[0].Value = 1;
                cmap[0].UseInConversions = true;

                campaign.CurrencyMap = cmap;
            }

            return CreatedAtAction("GetCampaign", new { id = campaign.Id }, campaign);
        }

        // DELETE: api/Campaigns/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCampaign([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var campaign = await _context.Campaigns.FindAsync(id);
            if (campaign == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            _context.Campaigns.Remove(campaign);
            await _context.SaveChangesAsync();

            return Ok(campaign);
        }

        [HttpDelete("{id}/member/{memberId}")]
        public async Task<IActionResult> RemoveMember(Guid id, string memberId)
        {
            var campaign = await _context.Campaigns
                .Where(c => c.Id == id)
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

            var user = campaign.Members
                .Where(m => m.CampaignId == id && m.UserId == memberId)
                .FirstOrDefault();

            if (user == null)
            {
                return NotFound();
            }

            if (user.UserId == campaign.UserId)
            {
                return BadRequest("cannot remove owner");
            }

            _context.CampaignUsers.Remove(user);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CampaignExists(Guid id)
        {
            return _context.Campaigns.Any(e => e.Id == id);
        }
    }
}