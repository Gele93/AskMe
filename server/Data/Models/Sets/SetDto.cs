using AskMe.Data.Entities;
using AskMe.Data.Models.Themes;

namespace AskMe.Data.Models.Sets
{
    public class SetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<ThemeDto> Themes { get; set; } = new();
    }
}
