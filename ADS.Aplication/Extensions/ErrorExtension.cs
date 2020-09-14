using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ADS.Aplication.Extensions
{
    public static class ErrorExtension
    {
        public static string GetFullErrorMessage(this ModelStateDictionary modelState)
        {
            var messages = modelState
                .SelectMany(entry => entry.Value.Errors)
                .Select(x => x.ErrorMessage);

            return string.Join(" ", messages);
        }
    }
}
