using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;

namespace ADS.Infrastructure.Settings
{
    public class TokenSettings
    {
        public const string ISSUER = "AdressThisApplication"; // издатель токена
        public const string AUDIENCE = "AdressUseTokenApplication"; // потребитель токена
        const string KEY = "adsApplicationToken";   // ключ для шифрации
        public const int LIFETIME = 1; // время жизни токена - 1 минута
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
