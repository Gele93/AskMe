using AskMe.Data.Models.Utils;

namespace AskMe.Services.Readers
{
    public class TxtReader : ITxtReader
    {
        public async Task<List<Line>> ReadTxtByLines(IFormFile file)
        {
            var lines = new List<Line>();
            using var reader = new StreamReader(file.OpenReadStream());
            while (!reader.EndOfStream)
            {
                var lineContent = await reader.ReadLineAsync();
                lineContent = lineContent?.Trim();

                if (string.IsNullOrEmpty(lineContent)) continue;

                if (lineContent != null)
                {
                    bool isTheme = lineContent.StartsWith("##");
                    bool isQuestion = lineContent.StartsWith("#");

                    lineContent = lineContent.TrimStart('#', ' ', '-', '*');

                    lines.Add(new(isTheme, isQuestion, lineContent));
                }
            }
            return lines;
        }
        public async Task<List<Line>> ReadStringByLines(string content)
        {
            var lines = new List<Line>();
            using var reader = new StringReader(content);
            string lineContent;

            while ((lineContent = await reader.ReadLineAsync()) != null)
            {
                lineContent = lineContent.Trim();

                if (string.IsNullOrEmpty(lineContent)) continue;

                bool isTheme = lineContent.StartsWith("##");
                bool isQuestion = lineContent.StartsWith("#");

                lineContent = lineContent.TrimStart('#', ' ', '-', '*');

                lines.Add(new(isTheme, isQuestion, lineContent));
            }
            return lines;
        }

        public async Task<string> ReadTxtAsString(IFormFile file)
        {
            using var reader = new StreamReader(file.OpenReadStream());
            return await reader.ReadToEndAsync();
        }

    }
}
