using AskMe.Data.Context;
using AskMe.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace AskMe.Repositories.Sets
{
    public class SetRepository : ISetRepository
    {
        private readonly AskMeContext _context;

        public SetRepository(AskMeContext context)
        {
            _context = context;
        }
        public async Task<Set> CreateSet(Set set)
        {
            await _context.Sets.AddAsync(set);
            await _context.SaveChangesAsync();
            return set;
        }

        public async Task<List<Set>> GetAll(string userId) => await _context.Sets
            .Where(s => s.UserId == userId)
            .Include(s => s.Themes)
                .ThenInclude(t => t.Questions)
                    .ThenInclude(q => q.Answers)
            .ToListAsync();


    }
}
