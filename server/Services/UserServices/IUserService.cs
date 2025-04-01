using Microsoft.AspNetCore.Identity;
using AskMe.Data.Models.AuthModels;
using AskMe.Data.Models.UserModels;

namespace AskMe.Services.UserServices
{
    public interface IUserService
    {
        Task<AuthResult> RegisterAsync(CreateUserDto userDto);
        Task<AuthResult> LoginAsync(string email, string password);
        Task<UserDto> GetUser(string userId);
    }
}
