using AskMe.Data.Entities;
using AskMe.Data.Models.Sets;

namespace AskMe.Services.Sets
{
    public interface ISetService
    {
        Task<SetDto> CreateFormatedSetPreview(SetRequest file, string userId);
        Task CreateSet(SetDto set, string userId);
        Task<SetDto> CreateUnFormatedSetPreview(SetRequest file, string userId);
        Task<List<SetDto>> GetAll(string userId);
    }
}
