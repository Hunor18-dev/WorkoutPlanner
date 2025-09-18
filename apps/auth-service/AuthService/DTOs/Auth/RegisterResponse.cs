using System.ComponentModel.DataAnnotations;
using AuthService.Models;

namespace AuthService.DTOs.Auth
{
    public class RegisterResponse
    {
        public bool Success { get; set; } = true;
        public string Message { get; set; } = "User registered successfully.";

    }
}
