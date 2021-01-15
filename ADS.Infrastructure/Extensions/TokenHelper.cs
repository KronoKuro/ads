using ADS.Infrastructure.Settings;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ADS.Infrastructure.Extensions
{
    public static class TokenHelper
    {

        public static string GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var now = DateTime.UtcNow;
            var jwtToken = new JwtSecurityToken(
                issuer: TokenSettings.ISSUER,
                audience: TokenSettings.AUDIENCE,
                claims: claims,
                notBefore: now,
                expires: now.Add(TimeSpan.FromMinutes(TokenSettings.LIFETIME)),
                signingCredentials: new SigningCredentials(TokenSettings.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            try
            {
                return new JwtSecurityTokenHandler().WriteToken(jwtToken);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public static ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {

            var tokenValidationparameters = new TokenValidationParameters
            {
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = TokenSettings.GetSymmetricSecurityKey(),
                ValidateLifetime = true
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationparameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;
        }
    }
}
