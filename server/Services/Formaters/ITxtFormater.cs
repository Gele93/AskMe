namespace AskMe.Services.Formaters
{
    public interface ITxtFormater
    {
        Task<string> GeneralizeText(string fileContent);
    }
}
