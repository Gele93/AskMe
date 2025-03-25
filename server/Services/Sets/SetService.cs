using AskMe.Data.Entities;
using AskMe.Data.Models.Answers;
using AskMe.Data.Models.Questions;
using AskMe.Data.Models.Sets;
using AskMe.Data.Models.Themes;
using AskMe.Data.Models.Utils;
using AskMe.Repositories.Sets;
using AskMe.Services.Formaters;
using AskMe.Services.Readers;
using System.Runtime.InteropServices;

namespace AskMe.Services.Sets
{
    public class SetService : ISetService
    {
        private readonly ITxtReader _txtReader;
        private readonly ITxtFormater _txtFormater;
        private readonly ISetRepository _setRepository;
        public SetService(ITxtReader txtReader, ITxtFormater txtFormater, ISetRepository setRepository)
        {
            _txtReader = txtReader;
            _txtFormater = txtFormater;
            _setRepository = setRepository;
        }


        public async Task<SetDto> CreateFormatedSet(SetRequest setReq, string userId)
        {
            var lines = await _txtReader.ReadTxtByLines(setReq.file);

            Set set = new() { Name = setReq.Name, Description = setReq.Description, UserId = userId };
            await FillSet(set, lines);

            var createdSet = await _setRepository.CreateSet(set);

            return ConvertSetToDto(createdSet);
        }
        public async Task<SetDto> CreateUnFormatedSet(SetRequest setReq, string userId)
        {
            throw new NotImplementedException();
        }

        private async Task FillSet(Set set, List<Line> lines)
        {
            set.Themes.Add(new Theme { Name = "Default" });

            foreach (var line in lines)
            {
                if (line.IsTheme)
                {
                    var theme = new Theme { Name = line.Content };
                    set.Themes.Add(theme);
                }
                else if (line.IsQuestion)
                {
                    var question = new Question { Text = line.Content };
                    set.Themes.Last()
                        .Questions.Add(question);
                }
                else
                {
                    var question = set.Themes.Last().Questions.LastOrDefault();
                    if (question is null) continue;

                    var answer = new Answer { Text = line.Content };
                    question.Answers.Add(answer);
                }
            }

        }
        private SetDto ConvertSetToDto(Set set) => new SetDto
        {
            Id = set.Id,
            Name = set.Name,
            Description = set.Description,
            Themes = set.Themes
            .Select(ConvertThemeToDto)
            .ToList()
        };

        private ThemeDto ConvertThemeToDto(Theme theme) => new ThemeDto
        {
            Id = theme.Id,
            Name = theme.Name,
            Description = theme.Description,
            SetId = theme.SetId,
            Questions = theme.Questions
            .Select(ConvertQuestionToDto)
            .ToList()
        };

        private QuestionDto ConvertQuestionToDto(Question question) => new QuestionDto
        {
            Id = question.Id,
            Text = question.Text,
            ThemeId = question.ThemeId,
            Answers = question.Answers
            .Select(ConvertAnswerToDto)
            .ToList()
        };

        private AnswerDto ConvertAnswerToDto(Answer answer) => new AnswerDto
        {
            Id = answer.Id,
            Text = answer.Text,
            QuestionId = answer.QuestionId
        };
    }
}
