using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class MapShape
    {
        [Required]
        public MapShapeType Type { get; set; }

        public double? Lat { get; set; }
        public double? Lng { get; set; }
        public double? Radius { get; set; }
        public double[][] Points { get; set; }
    }

    public enum MapShapeType {
        Polyline, Circle, Marker, Polygon, Rectangle
    }
}
