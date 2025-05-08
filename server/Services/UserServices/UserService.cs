using AskMe.Data.Entities;
using AskMe.Data.Models.AuthModels;
using AskMe.Data.Models.PasswordTokens;
using AskMe.Data.Models.UserModels;
using AskMe.Repositories.User;
using AskMe.Services.Emails;
using Microsoft.AspNetCore.Identity;

namespace AskMe.Services.UserServices
{
    public class UserService(UserManager<User> userManager, ITokenService tokenService, IUserRepository userRepository, SendGridEmailService emailService, ILogger<UserService> logger) : IUserService
    {
        private UserManager<User> _userManager = userManager;
        private ITokenService _tokenService;
        private IUserRepository _userRepository = userRepository;
        private SendGridEmailService _emailService = emailService;
        private ILogger<UserService> _logger = logger;

        public async Task<AuthResult> RegisterAsync(CreateUserDto userDto)
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
            var managedUser = await _userManager.FindByEmailAsync(email);

            if (managedUser == null)
                return InvalidEmail(email);

            var isPasswordValid = await _userManager.CheckPasswordAsync(managedUser, password);

            if (!isPasswordValid)
                return InvalidPassword(email, managedUser.UserName);

            var roles = await userManager.GetRolesAsync(managedUser);
            var accessToken = tokenService.CreateToken(managedUser, roles[0]);

            return new AuthResult(true, managedUser.Email, managedUser.UserName, accessToken, managedUser.Id);
        }

        public async Task<UserDto> GetUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                throw new Exception("User not found");

            return new UserDto(user.FirstName, user.LastName, user.SubscriptionLevel, user.Email, user.UserName);
        }
        public async Task<bool> ForgotPassword(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return false;

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var expDate = DateTime.UtcNow.AddMinutes(20);
            var pwToken = new PasswordToken
            {
                UserId = user.Id,
                Token = token,
                ExpirationDate = expDate,
                IsUsed = false
            };

            var createdToken = await _userRepository.CreatePasswordToken(pwToken);
            var callbackUrl = $"http://localhost:5173/reset-password?token={createdToken.Token}&email={email}";
            await _emailService.SendEmailAsync(email, "Reset Password", EmailTemplates.ResetPassword(token, email));
            return true;
        }

        public async Task<bool> UpdatePassword(string email, string token, string newPassword)
        {
            var user = await GetUserOfValidToken(token);

            if (user is null)
                return false;

            var pwToken = await _userRepository.GetPasswordToken(token);

            var resetResult = await _userManager.ResetPasswordAsync(user, token, newPassword);

            if (!resetResult.Succeeded)
            {
                _logger.LogError("reset pw failed");
                return false;
            }

            await _userRepository.UseToken(pwToken);

            return true;
        }

        public async Task<bool> ValidateNewpwRoute(string token, string email)
        {
            var user = await GetUserOfValidToken(token);

            if (user is null)
                return false;

            if (user.Email != email)
                return false;

            return true;
        }

        public async Task<AuthResult> LoginGoogleAsync(string email, string name)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user is null)
            {
                var userToAdd = new CreateUserDto
                    (
                        name.Split(' ')[0] ?? "FirstName",
                        name.Split(' ')[1] ?? "LastName",
                        0,
                        email,
                        Utilities.Normalizer.RemoveAccents(name.Split(' ')[0]) ?? email,
                        Guid.NewGuid().ToString(),
                        "User"
                    );

                _logger.LogInformation(email + " user not found, creating new user with name: " + name + " and email: " + email + " and password: " + userToAdd.Password + " and role: " + userToAdd.Role);

                var regResult = await RegisterAsync(userToAdd);


                if (!regResult.Success)
                {
                    _logger.LogError("registration failed");
                    if (regResult.ErrorMessages != null)
                    {
                        foreach (var error in regResult.ErrorMessages)
                        {
                            _logger.LogError($"Registration error: {error}");
                        }
                    }
                    return new AuthResult(false, email, "", "", "");
                }
            }

            var managedUser = await _userManager.FindByEmailAsync(email);
            var roles = await userManager.GetRolesAsync(managedUser);
            var accessToken = tokenService.CreateToken(managedUser, roles[0]);

            return new AuthResult(true, managedUser.Email, managedUser.UserName, accessToken, managedUser.Id);
        }



        private async Task<bool> ValidateToken(string token)
        {
            var pwToken = await _userRepository.GetPasswordToken(token);

            if (pwToken == null || pwToken.IsUsed || pwToken.ExpirationDate < DateTime.UtcNow)
                return false;

            var user = await _userManager.FindByIdAsync(pwToken.UserId);

            if (user == null)
            {
                _logger.LogError("user not found");
                return false;
            }

            return true;
        }

        private async Task<User?> GetUserOfValidToken(string token)
        {
            if (!await ValidateToken(token))
                return null;

            var pwToken = await _userRepository.GetPasswordToken(token);
            _logger.LogInformation(token + " token is valid, userId: " + pwToken.UserId + " expiration date: " + pwToken.ExpirationDate + " is used: " + pwToken.IsUsed);
            var user = await _userManager.FindByIdAsync(pwToken.UserId);
            _logger.LogInformation(user.Id + " user found, email: " + user.Email + " username: " + user.UserName + " subscription level: " + user.SubscriptionLevel + " is used: " + pwToken.IsUsed);
            return user;
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
