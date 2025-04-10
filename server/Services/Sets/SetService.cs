using AskMe.Data.Entities;
using AskMe.Data.Models.Answers;
using AskMe.Data.Models.Questions;
using AskMe.Data.Models.Sets;
using AskMe.Data.Models.Themes;
using AskMe.Data.Models.Utils;
using AskMe.Repositories.Sets;
using AskMe.Services.Formaters;
using AskMe.Services.Readers;
using AskMe.Services.Utilities;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace AskMe.Services.Sets
{
    public class SetService : ISetService
    {
        private readonly ILogger<SetService> _logger;
        private readonly ITxtReader _txtReader;
        private readonly ITxtFormater _txtFormater;
        private readonly ISetRepository _setRepository;
        public SetService(ITxtReader txtReader, ITxtFormater txtFormater, ISetRepository setRepository, ILogger<SetService> logger)
        {
            _txtReader = txtReader;
            _txtFormater = txtFormater;
            _setRepository = setRepository;
            _logger = logger;
        }


        public async Task<SetDto> CreateFormatedSetPreview(SetRequest setReq, string userId)
        {
            var lines = await _txtReader.ReadTxtByLines(setReq.file);

            Set set = new()
            {
                Name = setReq.Name,
                Description = setReq.Description,
                UserId = userId
            };
            await FillSetFromLines(set, lines);

            return DataConverter.SetToDto(set);
        }
        public async Task<SetDto> CreateUnFormatedSetPreview(SetRequest setReq, string userId)
        {
            var text = await _txtReader.ReadTxtAsString(setReq.file);
            _logger.LogInformation($"Read text: {text}");
            var formatedText = await _txtFormater.GeneralizeText(text);
            _logger.LogInformation($"Formated text: {formatedText}");
            var lines = await _txtReader.ReadStringByLines(formatedText);
            _logger.LogInformation(formatedText);

            Set set = new()
            {
                Name = setReq.Name,
                Description = setReq.Description,
                UserId = userId
            };
            await FillSetFromLines(set, lines);

            return DataConverter.SetToDto(set);
        }

        public async Task CreateSet(SetDto setData, string userId)
        {
            var set = new Set
            {
                Name = setData.Name,
                Description = setData.Description,
                UserId = userId
            };

            await FillSetFromDto(setData, set);
            await _setRepository.CreateSet(set);

        }

        public async Task<List<SetDto>> GetAll(string userId)
        {
            var sets = await _setRepository.GetAll(userId);

            List<SetDto> setDtos = new();

            foreach (var set in sets)
            {
                setDtos.Add(DataConverter.SetToDto(set));
            }

            return setDtos;
        }

        public async Task DeleteById(int setId)
        {
            try
            {
                await _setRepository.DeleteById(setId);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while deleting set {setId}: {ex.Message}");
                throw;
            }
        }

        private async Task FillSetFromLines(Set set, List<Line> lines)
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
        private async Task FillSetFromDto(SetDto setData, Set set)
        {
            foreach (var theme in setData.Themes)
            {
                var newTheme = new Theme { Name = theme.Name };
                foreach (var question in theme.Questions)
                {
                    var newQuestion = new Question { Text = question.Text };
                    foreach (var answer in question.Answers)
                    {
                        var newAnswer = new Answer { Text = answer.Text };
                        newQuestion.Answers.Add(newAnswer);
                    }
                    newTheme.Questions.Add(newQuestion);
                }
                set.Themes.Add(newTheme);
            }
        }
    }
}
