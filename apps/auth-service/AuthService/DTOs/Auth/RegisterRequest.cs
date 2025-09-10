using System.ComponentModel.DataAnnotations;
using AuthService.Models;

namespace AuthService.DTOs.Auth
{
    public class RegisterRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string UserName { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public double? Weight { get; set; }
        public double? Height { get; set; }
        public Gender Gender { get; set; } = Gender.Unknown;
    }
}
