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
    public class NotificationsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IAuthorizationService _auth;
        private readonly IHubContext<UpdateHub> _hub;

        public IHubContext<UpdateHub> Hub => _hub;

        public NotificationsController(Context context, IAuthorizationService auth, IHubContext<UpdateHub> hub)
        {
            _context = context;
            _auth = auth;
            _hub = hub;
        }

        // GET: api/Notifications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotifications()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.Notifications)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            // Include campaigns
            await _context.Entry(user)
                    .Collection(u => u.Notifications)
                    .Query().OfType<CampaignNotification>()
                    .Include(n => n.Campaign).LoadAsync();

            return Ok(user.Notifications);
        }

        [HttpDelete("clearall")]
        public async Task<IActionResult> ClearAllNotifications()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.Notifications)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            _context.RemoveRange(user.Notifications);

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Notifications/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Notification>> DeleteNotification(Guid id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, notification, "NotificationEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();

            return notification;
        }

        [HttpPost("suggest")]
        public async Task<IActionResult> MakeSuggestion([FromBody] Suggestion suggestion)
        {
            var campaign = await _context.Campaigns
                .Where(c => c.Id == suggestion.CampaignId)
                .Include(c => c.Members)
                .FirstOrDefaultAsync();

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            foreach (var member in campaign.Members)
            {
                var notification = new SuggestionNotification()
                {
                    CampaignId = campaign.Id,
                    Message = suggestion.Message,
                    SuggestionURL = suggestion.URL,
                    SuggestedById = userId,
                    UserId = member.UserId
                };

                _context.SuggestionNotifications.Add(notification);
            }

            await _context.SaveChangesAsync();

            await _hub.Clients
                .Groups(campaign.Members.Select(m => $"notifications-{m.UserId}").ToList())
                .SendAsync("Notify");

            return NoContent();
        }

        private bool NotificationExists(Guid id)
        {
            return _context.Notifications.Any(e => e.Id == id);
        }
    }
}
