using Microsoft.AspNetCore.Identity;

namespace AskMe.Data.Entities
{
    public class Set
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public List<Theme> Themes { get; set; } = new();
    }
}
