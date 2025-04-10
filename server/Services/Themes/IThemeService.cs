using AskMe.Data.Entities;
using AskMe.Data.Models.Themes;

namespace AskMe.Services.Themes
{
    public interface IThemeService
    {
        Task<List<ThemeDto>> GetAllBySet(int setId);
        Task<ThemeDto> GetById(int themeId);
        Task<ThemeDto> Create(ThemeDto theme);
        Task<bool> Update(ThemeDto theme);
        Task<bool> Delete(int id);
    }
}
