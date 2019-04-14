using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Graphql
{
    public class UserType : ObjectGraphType<Models.User>
    {
        public UserType()
        {
            Field(u => u.Id);
            Field(u => u.Username);
            Field(u => u.PictureURL);
            Field(u => u.CreatedAt);
        }
    }
}
