using AskMe.Data.Entities;
using AskMe.Data.Models.Sets;
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


        public async Task<SetDto> CreateFormatedSet(SetRequest setReq)
        {
            var lines = await _txtReader.ReadTxtByLines(setReq.file);

            Set set = new() { Name = setReq.Name, Description = setReq.Description };
            FillSet(set, lines);

            var createdSet = await _setRepository.CreateSet(set);

            return ConvertSetToDto(createdSet);
        }
        public async Task<SetDto> CreateUnFormatedSet(SetRequest setReq)
        {
            throw new NotImplementedException();
        }

        private void FillSet(Set set, List<Line> lines)
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
        };
    }
}
