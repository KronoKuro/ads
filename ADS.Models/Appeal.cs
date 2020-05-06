using System;
using System.Collections.Generic;
using System.Text;

namespace ADS.Models
{
    public class Appeal
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public DateTime DateStart { get; set; }

        public DateTime DateEnd { get; set; }

        public AppealStatus Status { get; set; }

        public Guid ApparmentId { get; set; }

        public virtual Apartment Apartment { get; set; }
    }
}
