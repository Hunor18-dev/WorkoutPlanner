using AuthService.Models;

public interface IRefreshTokenRepository
{
    Task AddAsync(RefreshToken token, CancellationToken ct);
    Task<RefreshToken?> GetActiveAsync(string token, CancellationToken ct);
    Task RevokeAsync(RefreshToken token, CancellationToken ct);
}