using net_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Controllers
{
    public class NotificationService
    {
        private UpdateHub _hub;
        private Context _context;

        public NotificationService(UpdateHub hub, Context context)
        {
            _hub = hub;
            _context = context;
        }

        public async Task Notify(IReadOnlyList<string> userIds)
        {
            await _hub.Clients.Groups(userIds).SendCoreAsync("Notify", new object[] { });
        }
    }
}
