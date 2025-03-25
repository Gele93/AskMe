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

                if (lineContent != null)
                {
                    bool isTheme = lineContent.StartsWith("##");
                    bool isQuestion = lineContent.StartsWith("#");

                    lines.Add(new(isTheme, isQuestion, lineContent));
                }
            }
            return lines;
        }

    }
}
