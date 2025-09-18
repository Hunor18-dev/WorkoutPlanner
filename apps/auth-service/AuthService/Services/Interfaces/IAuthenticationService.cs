using AuthService.DTOs.Auth;
using AuthService.Models;

namespace AuthService.Managers.Interfaces
{
    public interface IAuthenticationService
    {
        // to do - add cancellation tokens
        Task<LoginResponse> LoginAsync(LoginRequest request);
        Task<RegisterResponse> RegisterAsync(RegisterRequest request);
        Task<LoginResponse> RefreshTokenAsync(string refreshToken);
        Task<LogoutResponse> LogoutAsync(string refreshToken, CancellationToken ct);
    }
}
