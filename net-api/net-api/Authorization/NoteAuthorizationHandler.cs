using Microsoft.AspNetCore.Authorization;
using net_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace net_api.Authorization
{
    public class NoteEditableHandler : AuthorizationHandler<NoteEditorRequirement, Note>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, NoteEditorRequirement requirement, Note resource)
        {
            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (resource.Campaign == null)
            {
                throw new ArgumentException("Note is missing campaign");
            } else if (resource.Campaign.Members == null)
            {
                throw new ArgumentException("Note campaign is missing members");
            }

            if (userId == resource.UserId || (resource.PublicEdit && resource.Campaign.Members.Any(m => m.UserId == userId)))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public class NoteViewableHandler : AuthorizationHandler<NoteViewerRequirement, Note>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, NoteViewerRequirement requirement, Note resource)
        {
            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (resource.Campaign == null)
            {
                throw new ArgumentException("Note is missing campaign");
            }
            else if (resource.Campaign.Members == null)
            {
                throw new ArgumentException("Note campaign is missing members");
            }

            if (userId == resource.UserId || (resource.PublicView && resource.Campaign.Members.Any(m => m.UserId == userId)))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public class NoteEditorRequirement : IAuthorizationRequirement { }
    public class NoteViewerRequirement : IAuthorizationRequirement { }
}
