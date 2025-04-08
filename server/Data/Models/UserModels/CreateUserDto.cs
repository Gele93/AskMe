namespace AskMe.Data.Models.UserModels
{
    public record CreateUserDto(
        string FirstName,
        string LastName,
        int SubscriptionLevel,
        string Email,
        string Username,
        string Password,
        string Role
        );
}
