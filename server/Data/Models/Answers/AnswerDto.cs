using AskMe.Data.Entities;

namespace AskMe.Data.Models.Answers
{
    public class AnswerDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int QuestionId { get; set; }
    }
}
