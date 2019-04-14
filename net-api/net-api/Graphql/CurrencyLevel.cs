using GraphQL.Types;
using net_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Graphql
{
    public class CurrencyLevelType : ObjectGraphType<CurrencyLevel>
    {
        public CurrencyLevelType()
        {
            Field(cl => cl.Name);
            Field(cl => cl.Value);
            Field(cl => cl.UseInConversions);
        }
    }
}
