using AuthService.DTOs.Auth;
using AuthService.Managers.Interfaces;
using AuthService.Models;
using AuthService.Services.Interfaces;

public class UserService : IUserService
{
    private readonly IUserRepository _users;
    private readonly ITokenService _tokenService;

    public UserService(IUserRepository users, ITokenService tokenService)
    {
        _users = users;
        _tokenService = tokenService;
    }
    public Task<User?> GetByIdAsync(Guid id)
    {
        return _users.GetByIdAsync(id);
    }

    public Task<User?> GetByEmailAsync(string email)
    {
        return _users.GetByEmailAsync(email);
    }

    public Task<User?> GetByTokenAsync(string token)
    {
        var userId = _tokenService.ValidateAndGetUserId(token);
        if (userId is null) return Task.FromResult<User?>(null);
        return _users.GetByIdAsync(userId.Value);
    }

    /*
            // Extract userId from JWT
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier) 
                              ?? User.FindFirstValue(ClaimTypes.Name);

            if (userIdClaim == null)
                return Unauthorized();

            if (!Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            var user = await _db.Users
                .Where(u => u.Id == userId)
                .Select(u => new
                {
                    u.Id,
                    u.Email,
                    u.UserName,
                    u.CreatedAt
                })
                .FirstOrDefaultAsync();
    */
}
