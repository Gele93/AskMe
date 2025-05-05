namespace AskMe.Data.Models.PasswordTokens
{
    public record PasswordTokenDto(
        string UserId,
        string Token,
        DateTime ExpirationDate,
        bool IsUsed
        );
}
