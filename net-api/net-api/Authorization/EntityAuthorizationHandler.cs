using Microsoft.AspNetCore.Authorization;
using net_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace net_api.Authorization
{
    public class EntityEditableHandler : AuthorizationHandler<EntityEditorRequirement, Entity>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, EntityEditorRequirement requirement, Entity resource)
        {
            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (resource.Campaign == null)
            {
                throw new ArgumentException("Entity is missing campaign");
            }

            if (userId == resource.Campaign.UserId || resource.UserId == userId)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public class EntityEditorRequirement : IAuthorizationRequirement { }
}
