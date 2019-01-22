using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace net_api.Models
{
    public class HexColorCodeValidator : ValidationAttribute
    {
        private readonly string regex = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var colorCode = (string)value;

            if (Regex.IsMatch(colorCode, this.regex))
            {
                return ValidationResult.Success;
            } else
            {
                return new ValidationResult("Invalid hex color code");
            }
        }
    }
}
