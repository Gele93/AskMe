using AskMe.Data.Entities;
using AskMe.Data.Models.Questions;

namespace AskMe.Data.Models.Themes
{
    public class ThemeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int SetId { get; set; }
        public List<QuestionDto> Questions { get; set; } = new();
    }
}
