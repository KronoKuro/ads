using ADS.Domain.Core;
using ADS.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ADS.Domain.ViewModels
{
    public class CityViewModel : EntityBase
    {
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if(Name.Length > 100 || Name.Length < 5)
                yield return new ValidationResult("Названия полей должны быть больше 100 или меньше 5");
        }

        public bool IsValidateName(string name)
        {
            if (Name.Length > 100 || Name.Length < 5)
                return false;
            return true;
        }
    }
}
