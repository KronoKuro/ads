using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ADS.Infrastructure.Abstract;
using ADS.Infrastructure.Custom;
using ADS.Models;
using AspNet.Security.OpenIdConnect.Extensions;
using AspNet.Security.OpenIdConnect.Primitives;
using AspNet.Security.OpenIdConnect.Server;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace ADS.Aplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorizeController : Controller
    {
        private readonly IOptions<IdentityOptions> _identityOptions;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public AuthorizeController(IOptions<IdentityOptions> identityOptions, SignInManager<User> signInManager,
            UserManager<User> userManager,
            IUnitOfWork unitOfWork)
        {
            _identityOptions = identityOptions;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("token")]
        [Produces("application/json")]
        public async Task<IActionResult> Login(OpenIdConnectRequest request)
        {
            if (request.IsPasswordGrantType())
            {
                var user = await _userManager.FindByEmailAsync(request.Username) ?? await _userManager.FindByNameAsync(request.Username);
                
                if (user == null)
                {
                    return BadRequest("Пользователь с таким логином не найден");
                }

                if (!await _signInManager.CanSignInAsync(user))
                {
                    return BadRequest("Пользователь заблокирован");
                }

                if (_userManager.SupportsUserLockout && await _userManager.IsLockedOutAsync(user))
                {
                    return BadRequest("Данный пользователь уже совершил вход");
                }

                // Ensure the user is enabled.
                if (user.IsArchived)
                {
                    return BadRequest("Пользователь удален или заблокирован");
                }

                if (!await _userManager.CheckPasswordAsync(user, request.Password))
                {
                    if (_userManager.SupportsUserLockout)
                    {
                        await _userManager.AccessFailedAsync(user);
                    }

                    return BadRequest("Проверьте логин и пароль");
                }

                if (_userManager.SupportsUserLockout)
                {
                    await _userManager.ResetAccessFailedCountAsync(user);
                }

                var ticket = await CreateTicketAsync(request, user);

                return SignIn(ticket.Principal, ticket.Properties, ticket.AuthenticationScheme);
            }
            else if (request.IsRefreshTokenGrantType())
            {
                var info = await HttpContext.AuthenticateAsync(
                    OpenIdConnectServerDefaults.AuthenticationScheme);

                
                var user = await _userManager.GetUserAsync(info.Principal);
                if (user == null)
                {
                    return BadRequest("Токен не обновлен");
                }

                if (!await _signInManager.CanSignInAsync(user))
                {
                    return BadRequest("Данный пользователь уже совершил вход");
                }

                // Create a new authentication ticket, but reuse the properties stored
                // in the refresh token, including the scopes originally granted.
                var ticket = await CreateTicketAsync(request, user, info.Properties);

                return SignIn(ticket.Principal, ticket.Properties, ticket.AuthenticationScheme);
            }
            return BadRequest("Тип авторизации не поддерживается");
        }

        private async Task<AuthenticationTicket> CreateTicketAsync(OpenIdConnectRequest request, User user, AuthenticationProperties properties = null)
        {
            var principal = await _signInManager.CreateUserPrincipalAsync(user);

            var ticket = new AuthenticationTicket(principal, new AuthenticationProperties(), OpenIdConnectServerDefaults.AuthenticationScheme);

            ticket.SetScopes(new[]
            {
                    OpenIdConnectConstants.Scopes.OpenId,
                    OpenIdConnectConstants.Scopes.Email,
                    OpenIdConnectConstants.Scopes.Profile,
                    OpenIdConnectConstants.Scopes.OfflineAccess,
            }.Intersect(request.GetScopes()));

            foreach (var claim in ticket.Principal.Claims)
            {
                if (claim.Type == _identityOptions.Value.ClaimsIdentity.SecurityStampClaimType)
                    continue;

                claim.SetDestinations(OpenIdConnectConstants.Destinations.AccessToken, OpenIdConnectConstants.Destinations.IdentityToken);
            }

            var identity = principal.Identity as ClaimsIdentity;

            
            
            if (!string.IsNullOrWhiteSpace(user.Email))
                identity.AddClaim(CustomClaimTypes.Login, user.Email, OpenIdConnectConstants.Destinations.IdentityToken);
            
            var role = _userManager.GetRolesAsync(user).Result.FirstOrDefault();

            if (!string.IsNullOrWhiteSpace(role))
                identity.AddClaim(CustomClaimTypes.Role, role, OpenIdConnectConstants.Destinations.IdentityToken);


            return ticket;
        }
    }
}