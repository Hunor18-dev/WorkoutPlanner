using AuthService.Models;

namespace AuthService.Services.Interfaces
{
    public interface IUserService
    {
        Task<User?> GetByIdAsync(Guid id);
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByTokenAsync(string token);
        //, CancellationToken ct
    }
}