using ADS.Domain.Core;
using ADS.Domain.Extensions;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace ADS.Domain.ViewModels
{
    public class LoginModel
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string Granttype { get; set; }

        public string RefreshToken { get; set; }

        public bool IsPasswordType()
        {
            return GrandTypes.Password.GetAttributeOfType<EnumMemberAttribute>().Value == Granttype;
        }

        public bool IsRefreshTokenType()
        {
            return GrandTypes.RefreshToken.GetAttributeOfType<EnumMemberAttribute>().Value == Granttype;
        }
    }
}
