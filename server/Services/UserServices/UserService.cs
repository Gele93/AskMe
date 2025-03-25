using AskMe.Data.Entities;
using AskMe.Data.Models.AuthModels;
using AskMe.Data.Models.UserModels;
using Microsoft.AspNetCore.Identity;

namespace AskMe.Services.UserServices
{
    public class UserService(UserManager<User> userManager, ITokenService tokenService) : IUserService
    {
        private UserManager<User> _userManager = userManager;
        private ITokenService _tokenService;


        public async Task<AuthResult> RegisterAsync(UserDto userDto)
        {
            var user = new User
            {
                UserName = userDto.Username,
                Email = userDto.Email,
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                SubscriptionLevel = userDto.SubscriptionLevel
            };
            var result = await _userManager.CreateAsync(user
                , userDto.Password);

            if (!result.Succeeded)
                return FailedRegistration(result, userDto.Email, userDto.Username);

            await _userManager.AddToRoleAsync(user, userDto.Role);

            return new AuthResult(true, userDto.Email, userDto.Username, "", user.Id);
        }
        public async Task<AuthResult> LoginAsync(string email, string password)
        {
            var managedUser = await userManager.FindByEmailAsync(email);

            if (managedUser == null)
                return InvalidEmail(email);

            var isPasswordValid = await userManager.CheckPasswordAsync(managedUser, password);

            if (!isPasswordValid)
                return InvalidPassword(email, managedUser.UserName);

            var roles = await userManager.GetRolesAsync(managedUser);
            var accessToken = tokenService.CreateToken(managedUser, roles[0]);

            return new AuthResult(true, managedUser.Email, managedUser.UserName, accessToken, managedUser.Id);
        }

        private static AuthResult InvalidEmail(string email)
        {
            var result = new AuthResult(false, email, "", "", "");
            result.ErrorMessages.Add("Bad credentials", "Invalid email");
            return result;
        }
        private static AuthResult InvalidPassword(string email, string userName)
        {
            var result = new AuthResult(false, email, userName, "", "");
            result.ErrorMessages.Add("Bad credentials", "Invalid password");
            return result;
        }
        private static AuthResult FailedRegistration(IdentityResult result, string email, string username)
        {
            var authResult = new AuthResult(false, email, username, "", "");

            foreach (var error in result.Errors)
                authResult.ErrorMessages.Add(error.Code, error.Description);


            return authResult;
        }
    }
}
