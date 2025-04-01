using AskMe.Data.Models.Utils;

namespace AskMe.Services.Readers
{
    public interface ITxtReader
    {
        Task<List<Line>> ReadTxtByLines(IFormFile file);
        Task<List<Line>> ReadStringByLines(string content);
        Task<string> ReadTxtAsString(IFormFile file);

    }
}
