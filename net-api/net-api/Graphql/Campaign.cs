using GraphQL.Types;
using net_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Graphql
{
    public class CampaignType : ObjectGraphType<Campaign>
    {
        public CampaignType(Context context)
        {
            Field(c => c.Id, type: typeof(IdGraphType));
            Field(c => c.Name);
            Field(c => c.ImageId);
            Field(c => c.ExperienceTable);
            Field(c => c.TrackCoins);
            Field(c => c.CreatedAt);

            Field<UserType>(nameof(Campaign.User), resolve: ctx =>
            {
                var user = context.Users
                    .Where(u => u.Id == ctx.Source.UserId)
                    .FirstOrDefault();

                return user;
            });

            Field<ListGraphType<MemberType>>(nameof(Campaign.Members), resolve: ctx =>
            {
                var members = context.CampaignUsers
                    .Where(cu => cu.CampaignId == ctx.Source.Id)
                    .ToList();

                return members;
            });
        }
    }
}
