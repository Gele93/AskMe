namespace AskMe.Services.Authenticators
{
    public interface IAuthenticator
    {
        Task<bool> AuthenticateUserToSet(string userId, int setId);
        Task<bool> AuthenticateUserToTheme(string userId, int themeId);
    }
}
