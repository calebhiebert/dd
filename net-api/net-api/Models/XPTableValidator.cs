using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class XPTableAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var xpTable = ((Campaign)validationContext.ObjectInstance).ExperienceTable;

            long start = 0;

            foreach(var lvl in xpTable)
            {
                if (lvl > start)
                {
                    start = lvl;
                } else
                {
                    return new ValidationResult("An experience level cannot be lower than the one that came before it");
                }
            }

            return ValidationResult.Success;
        }
    }
}
