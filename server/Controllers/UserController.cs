using AskMe.Data.Models.AuthModels;
using AskMe.Data.Models.UserModels;
using AskMe.Services.UserServices;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AskMe.Controllers
{
    [ApiController]
    [Route("[controller]")]
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

        [Authorize]
        [HttpPost("authorize")]
        public async Task<IActionResult> Authorize()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId is null) return Unauthorized();

            return Ok("Valid user authorized.");
        }

        private void AddErrors(AuthResult result)
        {
            foreach (var error in result.ErrorMessages)
                ModelState.AddModelError(error.Key, error.Value);
        }
    }
}
