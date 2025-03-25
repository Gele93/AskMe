using AskMe.Data.Models.Utils;

namespace AskMe.Services.Readers
{
    public interface ITxtReader
    {
        Task<List<Line>> ReadTxtByLines(IFormFile file);
    }
}
