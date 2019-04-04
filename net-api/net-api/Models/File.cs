using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class File
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public long Size { get; set; }

        [Required]
        public string Mime { get; set; }
    }
}
