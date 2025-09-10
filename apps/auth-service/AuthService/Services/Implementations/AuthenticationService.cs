using AuthService.DTOs.Auth;
using AuthService.Managers.Interfaces;
using AuthService.Models;
using AuthService.Services.Interfaces;

public class AuthenticationService : IAuthenticationService
{
    private readonly IUserRepository _users;
    private readonly IRefreshTokenRepository _refreshTokens;
    private readonly ITokenService _tokenService;
    private readonly IPasswordHasher _hasher;
    private readonly IConfiguration _cfg;

    private readonly TimeSpan _accessLifetime = TimeSpan.FromMinutes(15);
    private readonly TimeSpan _refreshLifetime = TimeSpan.FromDays(7);


    public AuthenticationService(IUserRepository users,
                                IRefreshTokenRepository refreshTokens,
                                ITokenService tokenService,
                                IPasswordHasher hasher,
                                IConfiguration cfg)
    {
        _users = users;
        _refreshTokens = refreshTokens;
        _tokenService = tokenService;
        _hasher = hasher;
        _cfg = cfg;
    }

    public async Task RegisterAsync(RegisterRequest request)
    {
        if (await _users.GetByEmailAsync(request.Email) != null)
            throw new InvalidOperationException("Email already registered");

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = request.Email,
            UserName = request.UserName,
            PasswordHash = _hasher.Hash(request.Password)
        };

        await _users.AddAsync(user);
        await _users.SaveChangesAsync();
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        var user = await _users.GetByEmailAsync(request.Email);
        if (user == null || !_hasher.Verify(request.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid credentials");

        var accessToken = _tokenService.CreateAccessToken(user, _accessLifetime);
        var refreshToken = _tokenService.CreateRefreshToken();

        var refreshTokenEntity = new RefreshToken
        {
            Token = refreshToken,
            UserId = user.Id,
            ExpiresAtUtc = DateTime.UtcNow.Add(_refreshLifetime),
            Revoked = false
        };

        await _refreshTokens.AddAsync(refreshTokenEntity, CancellationToken.None);

        return new LoginResponse { AccessToken = accessToken, RefreshToken = refreshTokenEntity.Token };
    }


    public async Task<string> RefreshTokenAsync(string refreshToken)
    {
        var token = await _refreshTokens.GetActiveAsync(refreshToken, CancellationToken.None);
        if (token == null) throw new UnauthorizedAccessException("Invalid refresh token");

        return _tokenService.CreateAccessToken(token.User, _accessLifetime);
    }
    public async Task<(User, string, string)> RegisterAsync(string email, string userName, string password, CancellationToken ct)
    {
        var existing = await _users.GetByEmailAsync(email);
        if (existing is not null) throw new InvalidOperationException("Email already registered.");

        var user = new User
        {
            Email = email,
            UserName = userName,
            PasswordHash = _hasher.Hash(password)
        };
        await _users.AddAsync(user);

        var access = _tokenService.CreateAccessToken(user, _accessLifetime);
        var refresh = _tokenService.CreateRefreshToken();

        await _refreshTokens.AddAsync(new RefreshToken
        {
            Token = refresh,
            UserId = user.Id,
            ExpiresAtUtc = DateTime.UtcNow.Add(_refreshLifetime)
        }, ct);

        return (user, access, refresh);
    }

    public async Task<(User, string, string)> LoginAsync(string email, string password, CancellationToken ct)
    {
        var user = await _users.GetByEmailAsync(email);
        if (user is null) throw new UnauthorizedAccessException("Invalid credentials.");

        if (!_hasher.Verify(user.PasswordHash, password))
            throw new UnauthorizedAccessException("Invalid credentials.");

        var access = _tokenService.CreateAccessToken(user, _accessLifetime);
        var refresh = _tokenService.CreateRefreshToken();

        await _refreshTokens.AddAsync(new RefreshToken
        {
            Token = refresh,
            UserId = user.Id,
            ExpiresAtUtc = DateTime.UtcNow.Add(_refreshLifetime)
        }, ct);

        return (user, access, refresh);
    }

    public async Task<(string, string)> RefreshAsync(string refreshToken, CancellationToken ct)
    {
        var rt = await _refreshTokens.GetActiveAsync(refreshToken, ct);
        if (rt is null) throw new UnauthorizedAccessException("Invalid refresh token.");

        var user = rt.User;
        var access = _tokenService.CreateAccessToken(user, _accessLifetime);
        var newRefresh = _tokenService.CreateRefreshToken();

        // revoke old, add new
        await _refreshTokens.RevokeAsync(rt, ct);
        await _refreshTokens.AddAsync(new RefreshToken
        {
            Token = newRefresh,
            UserId = user.Id,
            ExpiresAtUtc = DateTime.UtcNow.Add(_refreshLifetime)
        }, ct);

        return (access, newRefresh);
    }

    public async Task LogoutAsync(string refreshToken, CancellationToken ct)
    {
        var rt = await _refreshTokens.GetActiveAsync(refreshToken, ct);
        if (rt is null) return;
        await _refreshTokens.RevokeAsync(rt, ct);
    }

    public Task<User?> MeAsync(Guid userId, CancellationToken ct) => _users.GetByIdAsync(userId);
}
