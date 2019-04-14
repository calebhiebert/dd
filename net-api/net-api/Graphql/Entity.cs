using GraphQL.Types;
using net_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Graphql
{
    public class EntityType : ObjectGraphType<Entity>
    {
        public EntityType()
        {
            Field(e => e.Name);
            Field(e => e.ImageId);
            Field(e => e.Spawnable);
            Field(e => e.HealthJson, nullable: true);
            Field(e => e.FieldsJson, nullable: true);
            Field(e => e.XP, nullable: true);
            Field(e => e.Lat, nullable: true);
            Field(e => e.Lng, nullable: true);
        }
    }
}
