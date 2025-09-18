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
    private readonly TimeSpan _accessLifetime = TimeSpan.FromMinutes(30);
    private readonly TimeSpan _refreshLifetime = TimeSpan.FromDays(10);


    public AuthenticationService(IUserRepository users,
                                IRefreshTokenRepository refreshTokens,
                                ITokenService tokenService,
                                IPasswordHasher hasher,
                                IConfiguration config)
    {
        _users = users;
        _refreshTokens = refreshTokens;
        _tokenService = tokenService;
        _hasher = hasher;
    }

    public async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
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

        try
        {
            await _users.AddAsync(user);
            await _users.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            // add logging for exceptions
            return new RegisterResponse
            {
                Success = false,
                Message = "User registration failed. Please try again later."
            };
        }

        return new RegisterResponse
        {
            Success = true,
            Message = "User registered successfully."
        };
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        var user = await _users.GetByEmailAsync(request.Email);
        if (user is null || !_hasher.Verify(request.Password, user.PasswordHash))
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

        return new LoginResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }


    public async Task<LoginResponse> RefreshTokenAsync(string refreshToken)
    {
        var token = await _refreshTokens.GetActiveAsync(refreshToken, CancellationToken.None);
        if (token is null) throw new UnauthorizedAccessException("Invalid refresh token");

        var user = token.User;
        var access = _tokenService.CreateAccessToken(user, _accessLifetime);
        var newRefresh = _tokenService.CreateRefreshToken();

        // revoke old, add new
        await _refreshTokens.RevokeAsync(token, CancellationToken.None);
        await _refreshTokens.AddAsync(new RefreshToken
        {
            Token = newRefresh,
            UserId = user.Id,
            ExpiresAtUtc = DateTime.UtcNow.Add(_refreshLifetime)
        }, CancellationToken.None);

        return new LoginResponse
        {
            AccessToken = access,
            RefreshToken = newRefresh
        };
    }

    public async Task<LogoutResponse> LogoutAsync(string refreshToken, CancellationToken ct)
    {
        var token = await _refreshTokens.GetActiveAsync(refreshToken, ct);
        if (token is null) return new LogoutResponse { Success = true, Message = "Expired or invalid refresh token" };

        await _refreshTokens.RevokeAsync(token, ct);
        return new LogoutResponse { Success = true, Message = "Logged out successfully" };
    }
}
