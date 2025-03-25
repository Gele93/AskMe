using AskMe.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace AskMe.Services.UserServices
{
    public interface ITokenService
    {
        public string CreateToken(User user, string role);
    }
}
 