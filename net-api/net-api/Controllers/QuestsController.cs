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
    public class QuestsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IAuthorizationService _auth;
        private readonly IHubContext<UpdateHub> _hub;


        public QuestsController(Context context, IAuthorizationService auth, IHubContext<UpdateHub> hub)
        {
            _context = context;
            _auth = auth;
            _hub = hub;
        }

        // GET: api/Quests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quest>>> GetQuests(
            [FromQuery] Guid campaignId,
            [FromQuery] string search,
            [FromQuery] int? limit,
            [FromQuery] int? offset,
            [FromQuery] Guid[] except,
            [FromQuery] Guid[] only,
            [FromQuery] QuestStatus[] status
            )
        {
            if (campaignId == null)
            {
                return BadRequest("missing campaign id");
            }

            var campaign = await _context.Campaigns
                .Include(c => c.Members)
                .FirstOrDefaultAsync(c => c.Id == campaignId);

            if (campaign == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            var campaignEditableAuthResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            var query = _context.Quests.Where(q => q.CampaignId == campaign.Id);

            if (!campaignEditableAuthResult.Succeeded)
            {
                query = query.Where(q => q.Visible == true);
            }

            if (search != null)
            {
                query = query
                    .Where(q => 
                        q.Name.ToLower()
                        .Contains(search.Trim().ToLower()));
            }

            if (except != null && except.Length > 0)
            {
                query = query.Where(q => !except.Contains(q.Id));
            }

            if (only != null && only.Length > 0)
            {
                query = query.Where(q => only.Contains(q.Id));
            }

            if (status != null && status.Length > 0)
            {
                query = query.Where(q => status.Contains(q.Status));
            }

            if (limit == null)
            {
                limit = 10;
            } else if (limit > 50)
            {
                limit = 50;
            } else if (limit <= 0)
            {
                limit = 10;
            }

            if (offset < 0 || offset == null)
            {
                offset = 0;
            }

            query = query
                .OrderBy(q => q.Name)
                .Skip((int)offset)
                .Take((int)limit);

            var quests = await query.ToListAsync();

            return Ok(quests);
        }

        // GET: api/Quests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quest>> GetQuest(Guid id)
        {
            var quest = await _context.Quests
                .Where(q => q.Id == id)
                .Include(q => q.Campaign)
                    .ThenInclude(c => c.Members)
                .FirstOrDefaultAsync();

            if (quest == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, quest.Campaign, quest.Visible ? "CampaignViewPolicy" : "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            _context.AssetViews.Add(new AssetView(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, quest.CampaignId)
            {
                QuestId = quest.Id,
            });
            await _context.SaveChangesAsync();

            return quest;
        }

        // PUT: api/Quests/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuest(Guid id, Quest quest)
        {
            if (id != quest.Id)
            {
                return BadRequest();
            }

            var originalQuest = await _context.Quests
                .Where(q => q.Id == id)
                .Include(q => q.Campaign)
                    .ThenInclude(c => c.Members)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            if (originalQuest == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, originalQuest.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            // Make sure the quest is not in an invalid state
            if (!quest.Visible)
            {
                quest.Accepted = false;
                quest.AcceptedAt = null;
                quest.Available = false;
                quest.Status = QuestStatus.None;
            }

            if (!quest.Available)
            {
                quest.Accepted = false;
                quest.Status = QuestStatus.None;
            }

            _context.Entry(quest).State = EntityState.Modified;

            // The quest was just accepted
            if (!originalQuest.Accepted && quest.Accepted)
            {
                // Create a notification for all members
                foreach (var member in originalQuest.Campaign.Members)
                {
                    var notification = new QuestNotification(member.UserId, $"Quest {quest.Name} has been accepted!", originalQuest.CampaignId, originalQuest.Id);
                    _context.Notifications.Add(notification);
                }

                await _hub.Clients
                    .Groups(originalQuest.Campaign.Members.Select(m => $"notifications-{m.UserId}").ToList())
                    .SendAsync("Notify");
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestExists(id))
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

        // POST: api/Quests
        [HttpPost]
        public async Task<ActionResult<Quest>> PostQuest(Quest quest)
        {
            var campaign = await _context.Campaigns
                .Where(c => c.Id == quest.CampaignId)
                .FirstOrDefaultAsync();

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            _context.Quests.Add(quest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuest", new { id = quest.Id }, quest);
        }

        // DELETE: api/Quests/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Quest>> DeleteQuest(Guid id)
        {
            var quest = await _context.Quests
                .Where(q => q.Id == id)
                .Include(q => q.Campaign)
                .FirstOrDefaultAsync();

            if (quest == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, quest.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            _context.Quests.Remove(quest);
            await _context.SaveChangesAsync();

            return quest;
        }

        private bool QuestExists(Guid id)
        {
            return _context.Quests.Any(e => e.Id == id);
        }
    }
}
