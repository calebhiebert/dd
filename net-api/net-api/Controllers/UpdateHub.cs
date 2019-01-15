using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace net_api.Controllers
{
    [Authorize]
    public class UpdateHub : Hub
    {
        public async Task Authenticate()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"notifications-{Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value}");
            await Clients.Caller.SendAsync("AuthenticateComplete");
        }
    }
}
