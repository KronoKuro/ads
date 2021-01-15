using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace ADS.Domain.Core
{
    public enum GrandTypes
    {
        [EnumMember(Value = "password")]
        Password,
        [EnumMember(Value = "refresh_token")]
        RefreshToken

    }
}
