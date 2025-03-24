namespace AskMe.Data.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int ThemeId { get; set; }
        public Theme Theme { get; set; }
        public int AnswerId { get; set; }
        public Answer Answer { get; set; }
    }
}
