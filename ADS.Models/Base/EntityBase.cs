using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ADS.Models
{
    public abstract class EntityBase
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
    }
}
