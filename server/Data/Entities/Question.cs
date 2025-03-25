namespace AskMe.Data.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public string? Text { get; set; }
        public int ThemeId { get; set; }
        public Theme Theme { get; set; }
        public List<Answer> Answers { get; set; } = new();
    }
}
