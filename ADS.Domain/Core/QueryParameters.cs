using System;
using System.Collections.Generic;
using System.Text;

namespace ADS.Domain.Core
{
    public class QueryParameters
    {
        private const int MaxPageCount = 50;
        public int Page { get; set; } = 1;

        private int _pageCount = MaxPageCount;
        public int PageCount
        {
            get { return _pageCount; }
            set { _pageCount = (value > MaxPageCount) ? MaxPageCount : value; }
        }

        public string Direction { get; set; }

        public string Active { get; set; } = "Name";
    }
}
