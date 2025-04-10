using AskMe.Data.Entities;

namespace AskMe.Repositories.Themes
{
    public interface IThemeRepository
    {
        Task<List<Theme>> GetAllBySet(int setId);
        Task<Theme> GetById(int themeId);
        Task<Theme> Create(Theme theme);
        Task<bool> Update(Theme theme);
        Task<bool> Delete(int id);
    }
}
