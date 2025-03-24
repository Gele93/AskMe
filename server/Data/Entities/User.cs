using Microsoft.AspNetCore.Identity;

namespace AskMe.Data.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int SubscriptionLevel { get; set; }

        public List<Set> Sets { get; set; } = new();
    }
}
