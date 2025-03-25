using AskMe.Data.Context;
using AskMe.Data.Entities;

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
    }
}
