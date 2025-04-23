using AskMe.Data.Entities;
using AskMe.Data.Models.Themes;
using AskMe.Repositories.Themes;
using AskMe.Services.Sets;
using AskMe.Services.Utilities;

namespace AskMe.Services.Themes
{
    public class ThemeService : IThemeService
    {
        private readonly ILogger<ThemeService> _logger;
        private readonly ISetService _setService;
        private readonly IThemeRepository _themeRepository;

        public ThemeService(ILogger<ThemeService> logger, ISetService setService, IThemeRepository themeRepository)
        {
            _logger = logger;
            _setService = setService;
            _themeRepository = themeRepository;
        }

        public async Task<List<ThemeDto>> GetAllBySet(int setId)
        {
            try
            {
                var themes = await _themeRepository.GetAllBySet(setId);
                return themes
                    .Select(t => DataConverter.ThemeToDto(t))
                    .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while getting all themes by set {ex.Message}");
                throw;
            }
        }
        public async Task<ThemeDto> GetById(int themeId)
        {
            try
            {
                var theme = await _themeRepository.GetById(themeId);
                return DataConverter.ThemeToDto(theme);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while getting all themes by set {ex.Message}");
                throw;
            }
        }
        public async Task<ThemeDto> Create(ThemeDto themeDto)
        {
            try
            {
                var theme = DataConverter.DtoToTheme(themeDto);
                var createdTheme = await _themeRepository.Create(theme);
                return DataConverter.ThemeToDto(createdTheme);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while getting all themes by set {ex.Message}");
                throw;
            }
        }
        public async Task<bool> Update(ThemeDto theme)
        {
            try
            {
                var themeToUpdate = await _themeRepository.GetById(theme.Id);

                if (themeToUpdate is null) return false;

                themeToUpdate.Name = theme.Name;
                themeToUpdate.Description = theme.Description;
                themeToUpdate.SetId = theme.SetId;
                themeToUpdate.Questions = theme.Questions
                    .Select(q => DataConverter.DtoToQuestion(q))
                    .ToList();

                var isSuccess = await _themeRepository.Update(themeToUpdate);
                return isSuccess;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while getting all themes by set {ex.Message}");
                throw;
            }
        }
        public async Task<bool> Delete(int id)
        {
            try
            {
                var isSuccess = await _themeRepository.Delete(id);
                return isSuccess;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while getting all themes by set {ex.Message}");
                throw;
            }
        }

    }
}
