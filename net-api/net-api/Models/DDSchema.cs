using GraphQL;
using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class DDSchema : Schema
    {
        public DDSchema(IDependencyResolver resolver): base(resolver)
        {
            Query = resolver.Resolve<DDQuery>();
        }
    }
}
