using AuthService.DTOs.Auth;
using AuthService.Managers.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthenticationService _authService;

        public AuthController(IAuthenticationService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request, CancellationToken ct)
        {
            await _authService.RegisterAsync(request, ct);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest dto, CancellationToken ct)
        {
            LoginResponse response = await _authService.LoginAsync(dto, ct);
            if (response == null) return Unauthorized("Invalid credentials.");

            return Ok(new LoginResponse { AccessToken = response.AccessToken, RefreshToken = response.RefreshToken });
        }
    }
}
