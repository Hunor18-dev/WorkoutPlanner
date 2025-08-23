namespace AuthService.DTOs
{
    public record RegisterDto(string Email, string UserName, string Password);
    public record LoginDto(string Email, string Password);
}
