using AskMe.Repositories.Sets;
using AskMe.Repositories.Themes;

namespace AskMe.Services.Authenticators
{
    public class Authenticator : IAuthenticator
    {
        private readonly ILogger<Authenticator> _logger;
        private readonly ISetRepository _setRepository;
        private readonly IThemeRepository _themeRepository;
        public Authenticator(ILogger<Authenticator> logger, ISetRepository setRepository, IThemeRepository themeRepository)
        {
            _logger = logger;
            _setRepository = setRepository;
            _themeRepository = themeRepository;
        }

        public async Task<bool> AuthenticateUserToSet(string userId, int setId)
        {
            try
            {
                var set = await _setRepository.GetById(setId);
                if (set.UserId == userId) return true;

                _logger.LogError("User is not authorized to access this set");
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while authenticating user: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> AuthenticateUserToTheme(string userId, int themeId)
        {
            try
            {
                var theme = await _themeRepository.GetById(themeId);
                var set = await _setRepository.GetById(theme.SetId);

                if (set.UserId == userId) return true;

                _logger.LogError("User is not authorized to access this set");
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while authenticating user: {ex.Message}");
                return false;
            }
        }
    }
}
