using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class UserType : ObjectGraphType<User>
    {
        public UserType(Context context)
        {
            Name = "User";

            Field(u => u.Id).Description("The Id of the user");
            Field(u => u.Username).Description("The username of the user");
            Field(u => u.PictureURL).Description("The URL for the picture of this user");
            Field(u => u.CreatedAt).Description("When this user was created");
            Field<ListGraphType<CampaignType>>("campaigns", resolve: ctx => {
                context.Entry(ctx.Source).Collection(e => e.Campaigns).Load();
                return ctx.Source.Campaigns;
            });
        }
    }
}
