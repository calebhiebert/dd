using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using net_api.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace net_api.Controllers
{
    [Authorize]
    public class UpdateHub : Hub
    {
        private readonly IAuthorizationService _auth;
        private readonly Context _context;

        public UpdateHub(Context context, IAuthorizationService auth)
        {
            _context = context;
            _auth = auth;
        }

        public async Task Authenticate()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"notifications-{Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value}");
            await Clients.Caller.SendAsync("AuthenticateComplete");
        }

        public async Task SubscribeCampaign(Guid campaignId)
        {
            var campaign = await _context.Campaigns
                .Where(c => c.Id == campaignId)
                .Include(c => c.Members)
                .FirstOrDefaultAsync();

            if (campaign == null)
            {
                return;
            }

            var authResult = await _auth.AuthorizeAsync(Context.User, campaign, "CampaignViewPolicy");

            if (authResult.Succeeded)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, $"campaign-{campaignId}");
            }
        }

        public async Task UnsubscribeCampaign(string campaignId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"campaign-{campaignId}");
        }

        public async Task SubscribeNote(Guid? noteId)
        {
            if (noteId != null)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, $"note-{noteId.ToString()}");
            }
        }

        public async Task UnsubscribeNote(Guid? noteId)
        {
            if (noteId != null)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"note-{noteId.ToString()}");
            }
        }

        public async Task NoteCursorUpdate(Guid? noteId, CursorUpdate cursorUpdate)
        {
            if (noteId == null || cursorUpdate == null)
            {
                return;
            }

            var userId = Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _context.Users
                .Where(u => u.Id == userId)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return;
            }

            await Clients.GroupExcept($"note-{noteId.ToString()}", Context.ConnectionId)
                .SendAsync("NoteCursorUpdate", new { Id = user.Id, DisplayName = user.Username, NoteId = noteId, Range = cursorUpdate.Range });
        }

        public async Task NoteDeltaUpdate(Guid? noteId, Object delta)
        {
            if (noteId == null || delta == null)
            {
                return;
            }

            await Clients.GroupExcept($"note-{noteId.ToString()}", Context.ConnectionId)
                .SendAsync("NoteDeltaUpdate", new { Id = noteId, Delta = delta });
        }
    }
}
