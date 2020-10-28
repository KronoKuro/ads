using Microsoft.AspNetCore.Identity;
using System;

namespace ADS.Models
{
    public class User : IdentityUser<Guid>
    {
        public bool IsArchived { get; set; }
    }
}
