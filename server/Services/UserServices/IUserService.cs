using Microsoft.AspNetCore.Identity;
using AskMe.Data.Models.AuthModels;
using AskMe.Data.Models.UserModels;
using AskMe.Data.Models.ForgotPwRequests;

namespace AskMe.Services.UserServices
{
    public interface IUserService
    {
        Task<AuthResult> RegisterAsync(CreateUserDto userDto);
        Task<AuthResult> LoginAsync(string email, string password);
        Task<UserDto> GetUser(string userId);
        Task<bool> ForgotPassword(string email);
        Task<bool> UpdatePassword(string email, string token, string newPassword);
        Task<bool> ValidateNewpwRoute(string token, string email);
    }
}
