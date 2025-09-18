using AuthService.DTOs.Auth;
using AuthService.Models;

namespace AuthService.Managers.Interfaces
{
    public interface IAuthenticationService
    {
        // to do - add cancellation tokens
        Task<LoginResponse> LoginAsync(LoginRequest request, CancellationToken ct);
        Task<RegisterResponse> RegisterAsync(RegisterRequest request, CancellationToken ct);
        Task<LoginResponse> RefreshTokenAsync(string refreshToken, CancellationToken ct);
        Task<LogoutResponse> LogoutAsync(string refreshToken, CancellationToken ct);
    }
}
