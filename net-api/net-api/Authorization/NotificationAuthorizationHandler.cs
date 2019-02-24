using Microsoft.AspNetCore.Authorization;
using net_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace net_api.Authorization
{
    public class NotificationAuthorizationHandler : AuthorizationHandler<NotificationEditorRequirement, Notification>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, NotificationEditorRequirement requirement, Notification resource)
        {
            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == resource.UserId)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public class NotificationEditorRequirement : IAuthorizationRequirement { }
}
