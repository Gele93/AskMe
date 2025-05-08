using AskMe.Data.Models.AuthModels;
using AskMe.Data.Models.ForgotPwRequests;
using AskMe.Data.Models.UserModels;
using AskMe.Services.UserServices;
using Azure.Core;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AskMe.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register(CreateUserDto regRequest)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var result = await _userService.RegisterAsync(regRequest);

                if (!result.Success)
                {
                    AddErrors(result);
                    return BadRequest(ModelState);
                }

                return Ok($"{result.UserName} created successfuly");
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occured while creating user: {ex.Message}");
                return StatusCode(500, "Registration failed.");
            }

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthRequest request)
        {
            try
            {

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var result = await _userService.LoginAsync(request.Email, request.Password);

                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.UtcNow.AddHours(1)
                };

                Response.Cookies.Append("AuthToken", result.Token, cookieOptions);

                if (result.Success)
                {
                    var user = await _userService.GetUser(result.UserId);
                    return Ok(user);
                }

                AddErrors(result);
                return BadRequest(ModelState);
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occured while logging in: {ex.Message}");
                return StatusCode(500, "Login failed.");
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            Response.Cookies.Delete("AuthToken");
            return Ok("Logged out successfully");
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("authorize")]
        public async Task<IActionResult> Authorize()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var email = User.FindFirst(ClaimTypes.Email)?.Value;

            _logger.LogInformation("USERID FROM CLAIM NAMEIDENTIFIER -->>>>>>>>>>>>" + userId);
            _logger.LogInformation("EMAIL FROM CLAIM NAMEIDENTIFIER -->>>>>>>>>>>>" + email);


            if (userId is null) return Unauthorized();

            return Ok("Valid user authorized.");
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            try
            {
                var result = await _userService.ForgotPassword(request.Email);

                if (!result)
                    return BadRequest("Email not found");

                return Ok("Password reset link sent to your email.");

            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occured while processing forgot password: {ex.Message}");
                return StatusCode(500, "Forgot password failed.");
            }
        }

        [HttpPost("update-password")]
        public async Task<IActionResult> UpdatePassword([FromBody] UpdatePwRequest request)
        {
            try
            {
                var result = await _userService.UpdatePassword(request.Email, request.Token, request.NewPassword);

                if (!result)
                    return BadRequest("Invalid token or email");

                return Ok("Password updated successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occured while updating password: {ex.Message}");
                return StatusCode(500, "Update password failed.");
            }
        }

        [HttpPost("validate-newpw-route")]
        public async Task<IActionResult> ValidateNewpwRoute([FromBody] NewPwRoute route)
        {
            try
            {
                var result = await _userService.ValidateNewpwRoute(route.Token, route.Email);

                if (!result)
                    return BadRequest("Invalid token");

                return Ok("Token is valid.");
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occured while validating token: {ex.Message}");
                return StatusCode(500, "Validate token failed.");
            }
        }

        [HttpGet("signin-google")]
        public async Task<IActionResult> SignInWithGoogle()
        {
            _logger.LogInformation("SIGN IN WITH GOOGLE >>>>>>>>>>>>>>>>>>");
            //  var redirectUrl = Url.Action("GoogleResponse", "user");
            var properties = new AuthenticationProperties { RedirectUri = "google-response-handle" };

            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("google-response-handle")]
        public async Task<IActionResult> GoogleResponse()
        {
            _logger.LogInformation("RESPONZZZZZZZZZZZZZZZZZZZZZ");
            try
            {
                var googleResult = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

                if (!googleResult.Succeeded)
                {
                    _logger.LogError("Authentication failed.");
                    return Unauthorized("Authentication failed.");
                }

                var claimsIdentity = (ClaimsIdentity)googleResult.Principal.Identity;
                var email = claimsIdentity.FindFirst(ClaimTypes.Email)?.Value;
                var name = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;

                var result = await _userService.LoginGoogleAsync(email, name);

                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.UtcNow.AddHours(1)
                };

                Response.Cookies.Append("AuthToken", result.Token, cookieOptions);

                if (result.Success)
                {
                    return Redirect("http://localhost:5173/dashboard");
                    //var user = await _userService.GetUser(result.UserId);
                    //return Ok(user);
                }

                AddErrors(result);
                return BadRequest(ModelState);

            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in Google response: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("get-user")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId is null) return Unauthorized();

            var user = await _userService.GetUser(userId);

            if (user is null) return NotFound("User not found");

            return Ok(user);
        }

        private void AddErrors(AuthResult result)
        {
            foreach (var error in result.ErrorMessages)
                ModelState.AddModelError(error.Key, error.Value);
        }
    }
}
