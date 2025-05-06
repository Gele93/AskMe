using AskMe.Data.Context;
using AskMe.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace AskMe.Repositories.User
{
    public class UserRepository : IUserRepository
    {
        private readonly AskMeContext _context;
        public UserRepository(AskMeContext context)
        {
            _context = context;
        }
        public async Task<PasswordToken> CreatePasswordToken(PasswordToken passwordToken)
        {
            await _context.PasswordTokens.AddAsync(passwordToken);
            await _context.SaveChangesAsync();
            return passwordToken;
        }

        public async Task<PasswordToken> GetPasswordToken(string token) => await _context.PasswordTokens
            .FirstOrDefaultAsync(x => x.Token == token);

        public async Task UseToken(PasswordToken passwordToken)
        {
            passwordToken.IsUsed = true;
            passwordToken.ExpirationDate = DateTime.UtcNow;
            _context.PasswordTokens.Update(passwordToken);
            await _context.SaveChangesAsync();
        }


    }
}
