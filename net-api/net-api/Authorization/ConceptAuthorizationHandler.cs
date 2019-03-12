using Microsoft.AspNetCore.Authorization;
using net_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace net_api.Authorization
{
    public class ConceptEditableHandler : AuthorizationHandler<ConceptEditorRequirement, ConceptType>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ConceptEditorRequirement requirement, ConceptType resource)
        {
            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (resource.UserId == userId ||
                (resource.PlayerEditable && resource.Campaign.Members.Any(m => m.UserId == userId)) ||
                (resource.Campaign != null && resource.Campaign.UserId == userId))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public class ConceptEditorRequirement : IAuthorizationRequirement { }
}
