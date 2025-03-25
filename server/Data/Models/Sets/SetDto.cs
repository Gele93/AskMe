using AskMe.Data.Entities;

namespace AskMe.Data.Models.Sets
{
    public class SetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Theme> Themes { get; set; }
    }
}
