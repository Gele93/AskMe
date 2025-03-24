namespace AskMe.Data.Entities
{
    public class Theme
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int SetId { get; set; }
        public Set Set { get; set; }
        public List<Question> Questions { get; set; } = new();
    }
}
