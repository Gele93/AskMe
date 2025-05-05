using AskMe.Data.Context;
using AskMe.Data.Entities;

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

    }
}
