using AuthService.Models;

namespace AuthService.Services.Interfaces
{
    public interface ITokenService
    {
        string CreateAccessToken(User user, TimeSpan lifetime);
        string CreateRefreshToken(); // random string
        Guid? ValidateAndGetUserId(string jwt); // for /me
    }
}