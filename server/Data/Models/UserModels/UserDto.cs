namespace AskMe.Data.Models.UserModels
{
    public record UserDto(
        string FirstName,
        string LastName,
        int SubscriptionLevel,
        string Email,
        string Username,
        string Password,
        string Role
        );
}
