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
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            await _authService.RegisterAsync(request);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest dto)
        {
            LoginResponse response = await _authService.LoginAsync(dto);
            if (response == null) return Unauthorized("Invalid credentials.");

            return Ok(new LoginResponse { AccessToken = response.AccessToken, RefreshToken = response.RefreshToken });
        }
    }
}
