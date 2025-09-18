using AuthService.Data;
using AuthService.Models;
using Microsoft.EntityFrameworkCore;

public class UserRepository : IUserRepository
{
    private readonly AuthDbContext _context;
    public UserRepository(AuthDbContext context) => _context = context;

    public Task<User?> GetByEmailAsync(string email) =>
        _context.Users.FirstOrDefaultAsync(u => u.Email == email);

    public Task<User?> GetByIdAsync(Guid id) =>
        _context.Users.FindAsync(id).AsTask();

    public Task<User?> GetByEmailAsync(string email, CancellationToken ct)
        => _context.Users.SingleOrDefaultAsync(x => x.Email == email, ct);

    public Task<User?> GetByIdAsync(Guid id, CancellationToken ct)
        => _context.Users.FindAsync([id], ct).AsTask();

    public async Task AddAsync(User user, CancellationToken ct)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync(ct);
    }
}
