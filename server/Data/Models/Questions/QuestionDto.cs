using AskMe.Data.Entities;
using AskMe.Data.Models.Answers;

namespace AskMe.Data.Models.Questions
{
    public class QuestionDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int ThemeId { get; set; }
        public List<AnswerDto> Answers { get; set; } = new();
    }
}
