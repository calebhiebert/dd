using GraphQL.Types;
using Microsoft.EntityFrameworkCore;
using net_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Graphql
{
    public class DDQuery : ObjectGraphType
    {
        public DDQuery(Context context)
        {
            Field<ListGraphType<CampaignType>>("campaigns", resolve: ctx =>
            {
                var campaigns = context.Campaigns.ToList();
                return campaigns;
            });

            Field<CampaignType>("campaign", arguments: new QueryArguments(new List<QueryArgument>
            {
                new QueryArgument<IdGraphType>
                {
                    Name = "id"
                }
            }), resolve: ctx =>
            {
                var query = context.Campaigns.AsQueryable();

                var id = ctx.GetArgument<Guid>("id");

                var campaign = query.Where(c => c.Id == id).FirstOrDefault();

                return campaign;
            });
        }
    }
}
