using System.ComponentModel.DataAnnotations;
using AuthService.Models;

namespace AuthService.DTOs.Auth
{
    public class LogoutResponse
    {
        public bool Success { get; set; } = true;
        public string Message { get; set; } = "Goodbye.";

    }
}
