using AuthService.DTOs.Auth;
using AuthService.Models;

namespace AuthService.Managers.Interfaces
{
    public interface IAuthenticationService
    {
        Task<LoginResponse> LoginAsync(LoginRequest request);
        Task RegisterAsync(RegisterRequest request);
        Task<string> RefreshTokenAsync(string refreshToken);
        Task<(User user, string accessToken, string refreshToken)> RegisterAsync(string email, string userName, string password, CancellationToken ct);
        Task<(User user, string accessToken, string refreshToken)> LoginAsync(string email, string password, CancellationToken ct);
        Task<(string accessToken, string refreshToken)> RefreshAsync(string refreshToken, CancellationToken ct);
        Task LogoutAsync(string refreshToken, CancellationToken ct);
        Task<User?> MeAsync(Guid userId, CancellationToken ct);
    }
}
