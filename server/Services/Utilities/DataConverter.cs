using AskMe.Data.Entities;
using AskMe.Data.Models.Answers;
using AskMe.Data.Models.Questions;
using AskMe.Data.Models.Sets;
using AskMe.Data.Models.Themes;

namespace AskMe.Services.Utilities
{
    public static class DataConverter
    {
        public static SetDto SetToDto(Set set) => new SetDto
        {
            Id = set.Id,
            Name = set.Name,
            Description = set.Description,
            Themes = set.Themes
             .Select(ThemeToDto)
             .ToList()
        };
        public static ThemeDto ThemeToDto(Theme theme) => new ThemeDto
        {
            Id = theme.Id,
            Name = theme.Name,
            Description = theme.Description,
            SetId = theme.SetId,
            Questions = theme.Questions
            .Select(QuestionToDto)
            .ToList()
        };
        public static QuestionDto QuestionToDto(Question question) => new QuestionDto
        {
            Id = question.Id,
            Text = question.Text,
            ThemeId = question.ThemeId,
            Answers = question.Answers
            .Select(AnswerToDto)
            .ToList()
        };
        public static AnswerDto AnswerToDto(Answer answer) => new AnswerDto
        {
            Id = answer.Id,
            Text = answer.Text,
            QuestionId = answer.QuestionId
        };

        public static Theme DtoToTheme(ThemeDto themeDto) => new Theme
        {
            Name = themeDto.Name,
            Description = themeDto.Description,
            SetId = themeDto.SetId,
            Questions = themeDto.Questions
            .Select(DtoToQuestion)
            .ToList()
        };

        public static Question DtoToQuestion(QuestionDto questionDto) => new Question
        {
            Id = questionDto.Id,
            Text = questionDto.Text,
            ThemeId = questionDto.ThemeId,
            Answers = questionDto.Answers
            .Select(DtoToAnswer)
            .ToList()
        };

        public static Answer DtoToAnswer (AnswerDto answerDto) => new Answer
        {
            Id = answerDto.Id,
            Text = answerDto.Text,
            QuestionId = answerDto.QuestionId
        };

    }
}
