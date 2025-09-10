using AuthService.Data;
using AuthService.Models;
using Microsoft.EntityFrameworkCore;

public class RefreshTokenRepository(AuthDbContext db) : IRefreshTokenRepository
{
    public async Task AddAsync(RefreshToken token, CancellationToken ct)
    {
        db.RefreshTokens.Add(token);
        await db.SaveChangesAsync(ct);
    }

    public Task<RefreshToken?> GetActiveAsync(string token, CancellationToken ct)
        => db.RefreshTokens.Include(x => x.User)
                           .SingleOrDefaultAsync(x => x.Token == token && !x.Revoked && x.ExpiresAtUtc > DateTime.UtcNow, ct);

    public async Task RevokeAsync(RefreshToken token, CancellationToken ct)
    {
        token.Revoked = true;
        await db.SaveChangesAsync(ct);
    }
}