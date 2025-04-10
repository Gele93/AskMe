using AskMe.Data.Context;
using AskMe.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace AskMe.Repositories.Themes
{
    public class ThemeRepository : IThemeRepository
    {
        private readonly AskMeContext _context;
        public ThemeRepository(AskMeContext context)
        {
            _context = context;
        }
        public async Task<List<Theme>> GetAllBySet(int setId)
        {
            return await _context.Themes
                .Where(t => t.SetId == setId)
                .Include(t => t.Questions)
                    .ThenInclude(q => q.Answers)
                .ToListAsync();
        }

        public async Task<Theme> GetById(int themeId)
        {
            return await _context.Themes
                .Include(t => t.Questions)
                    .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(t => t.Id == themeId);
        }

        public async Task<Theme> Create(Theme theme)
        {
            _context.Themes.Add(theme);
            await _context.SaveChangesAsync();
            return theme;
        }

        public async Task<bool> Update(Theme theme)
        {
            _context.Themes.Update(theme);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(int id)
        {
            var theme = await _context.Themes
                .Include(t => t.Questions)
                    .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(t => t.Id == id);
            if (theme == null)
            {
                return false;
            }

            _context.Themes.Remove(theme);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
