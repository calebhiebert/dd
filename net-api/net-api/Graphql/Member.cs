using GraphQL.Types;
using net_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Graphql
{
    public class MemberType : ObjectGraphType<CampaignUser>
    {
        public MemberType(Context context)
        {
            Field<UserType>(nameof(CampaignUser.User), resolve: ctx =>
            {
                var user = context.Users
                    .Where(u => u.Id == ctx.Source.UserId)
                    .FirstOrDefault();

                return user;
            });
        }
    }
}
