using Microsoft.AspNetCore.Authorization;
using net_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace net_api.Authorization
{
    public class CampaignEditableHandler : AuthorizationHandler<CampaignEditorRequirement, Campaign>
    {
        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context, 
            CampaignEditorRequirement requirement, 
            Campaign resource)
        {
            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (resource.UserId == userId)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public class CampaignViewableHandler : AuthorizationHandler<CampaignViewerRequirement, Campaign>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, CampaignViewerRequirement requirement, Campaign resource)
        {
            if (resource.Members == null)
            {
                throw new ArgumentException("Campaign is missing members");
            }

            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (resource.UserId == userId)
            {
                context.Succeed(requirement);
            } else if (resource.Members.Any(m => m.UserId == userId))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public class CampaignEditorRequirement : IAuthorizationRequirement { }
    public class CampaignViewerRequirement : IAuthorizationRequirement { }
}
