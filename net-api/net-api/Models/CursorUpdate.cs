using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class CursorUpdate
    {
        public CursorRange Range { get; set; }
    }

    public class CursorRange
    {
        public int Index { get; set; }
        public int Length { get; set; }
    }
}
