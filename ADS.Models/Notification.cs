using System;
using System.Collections.Generic;
using System.Text;

namespace ADS.Models
{
    public class Notification
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
