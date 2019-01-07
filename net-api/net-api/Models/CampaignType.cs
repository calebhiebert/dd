using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class CampaignType : ObjectGraphType<Campaign>
    {
        public CampaignType()
        {
            Name = "Campaign";

            Field(c => c.Id);
            Field(c => c.Name);
            Field(c => c.Description);
            Field(c => c.ExperienceTable);
        }
    }
}
