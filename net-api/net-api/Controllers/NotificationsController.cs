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
    public class NotificationsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IAuthorizationService _auth;

        public NotificationsController(Context context, IAuthorizationService auth)
        {
            _context = context;
            _auth = auth;
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

        private bool NotificationExists(Guid id)
        {
            return _context.Notifications.Any(e => e.Id == id);
        }
    }
}
