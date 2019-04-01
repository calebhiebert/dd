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
    public class CampaignInvitesController : ControllerBase
    {
        private readonly Context _context;
        private readonly IHubContext<UpdateHub> _hub;
        private readonly IAuthorizationService _auth;

        public CampaignInvitesController(Context context, IHubContext<UpdateHub> hub, IAuthorizationService auth)
        {
            _context = context;
            _hub = hub;
            _auth = auth;
        }

        // GET: api/CampaignInvites
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetCampaignInvites([FromQuery(Name = "campaignId")] Guid? campaignId)
        {
            if (campaignId == null)
            {
                return BadRequest("Missing campaign id");
            }

            var campaign = await _context.Campaigns
                .Where(c => c.Id == campaignId)
                .Include(c => c.Invites)
                    .ThenInclude(i => i.User)
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

            return Ok(campaign.Invites);
        }

        // GET: api/CampaignInvites/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCampaignInvite([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var campaignInvite = await _context.CampaignInvites
                .Include(c => c.Campaign)
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();

            if (campaignInvite == null)
            {
                return NotFound();
            }

            return Ok(campaignInvite);
        }

        [HttpPost("{id}/accept")]
        [Authorize]
        public async Task<IActionResult> AcceptInvite([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var campaignInvite = await _context.CampaignInvites.FindAsync(id);

            if (campaignInvite == null)
            {
                return NotFound();
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _context.Users
                .Where(u => u.Id == userId)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            var campaign = await _context.Campaigns
                .Where(c => c.Id == campaignInvite.CampaignId)
                .Include(c => c.Members)
                .FirstOrDefaultAsync();

            if (campaign.Members.Any(m => m.UserId == userId))
            {
                return BadRequest("already in campaign");
            } 

            var campaignUser = new CampaignUser
            {
                UserId = userId,
                CampaignId = campaignInvite.CampaignId
            };

            campaignInvite.Status = CampaignInviteStatus.Accepted;
            campaignInvite.AcceptedUserId = userId;

            var campaignMembers = campaign.Members;

            foreach (var member in campaignMembers)
            {
                var notification = new CampaignNotification
                {
                    CampaignId = campaign.Id,
                    UserId = member.UserId,
                    Message = $"{user.Username} has joined {campaign.Name}!"
                };

                _context.Notifications.Add(notification);
            }

            _context.Add(campaignUser);

            await _context.SaveChangesAsync();

            await _hub.Clients
                .Groups(campaignMembers.Select(m => $"notifications-{m.UserId}").ToList())
                .SendAsync("Notify");

            await _hub.Clients.Group($"campaign-{campaign.Id}").SendAsync("RefreshCurrentCampaign");

            return NoContent();
        }

        [HttpPost("{id}/decline")]
        [Authorize]
        public async Task<IActionResult> DeclineInvite([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var campaignInvite = await _context.CampaignInvites.FindAsync(id);

            if (campaignInvite == null)
            {
                return NotFound();
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _context.Users
                .Where(u => u.Id == userId)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            var campaign = await _context.Campaigns
                .Where(c => c.Id == campaignInvite.CampaignId)
                .Include(c => c.Members)
                .FirstOrDefaultAsync();

            if (campaign.Members.Any(m => m.UserId == userId))
            {
                return BadRequest("already in campaign");
            }

            campaignInvite.Status = CampaignInviteStatus.Declined;
            campaignInvite.AcceptedUserId = userId;

            var campaignMembers = campaign.Members;

            foreach (var member in campaignMembers)
            {
                var notification = new CampaignNotification
                {
                    CampaignId = campaign.Id,
                    UserId = member.UserId,
                    Message = $"{user.Username} has declined to join {campaign.Name}!"
                };

                _context.Notifications.Add(notification);
            }

            await _context.SaveChangesAsync();

            await _hub.Clients
                .Groups(campaignMembers.Select(m => $"notifications-{m.UserId}").ToList())
                .SendAsync("Notify");

            return NoContent();
        }

        private bool ClaimType(Claim obj)
        {
            throw new NotImplementedException();
        }

        // POST: api/CampaignInvites
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostCampaignInvite([FromBody] CampaignInvite campaignInvite)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var campaign = await _context.Campaigns
                .Where(c => c.Id == campaignInvite.CampaignId)
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

            campaignInvite.Id = Nanoid.Nanoid.Generate(size: 64);
            campaignInvite.Campaign = null;
            campaignInvite.User = null;

            _context.CampaignInvites.Add(campaignInvite);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCampaignInvite", new { id = campaignInvite.Id }, campaignInvite);
        }

        // PUT: api/CampaignInvites/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCampaignInvite([FromRoute] string id, [FromBody] CampaignInvite campaignInvite)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != campaignInvite.Id)
            {
                return BadRequest();
            }

            var existingInvite = await _context.CampaignInvites
                .Where(invite => invite.Id == id)
                    .Include(i => i.Campaign)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            if (existingInvite == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, existingInvite.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            campaignInvite.Campaign = null;
            campaignInvite.User = null;

            _context.Entry(campaignInvite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CampaignInviteExists(id))
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

        private bool CampaignInviteExists(string id)
        {
            return _context.CampaignInvites.Any(e => e.Id == id);
        }
    }
}