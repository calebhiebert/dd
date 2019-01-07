using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class DDQuery : ObjectGraphType
    {
        public readonly Context Context;

        public DDQuery(Context context)
        {
            this.Context = context;

            Field<StringGraphType>(
                name: "test",
                resolve: ctx => "ing"
                );

            Field<ListGraphType<UserType>>("user", resolve: ctx => Context.Users.ToList());

        }
    }
}
