using AskMe.Data.Entities;
using AskMe.Data.Models.Sets;

namespace AskMe.Services.Sets
{
    public interface ISetService
    {
        Task<SetDto> CreateFormatedSet(SetRequest file, string userId);
        Task<SetDto> CreateUnFormatedSet(SetRequest file, string userId);
    }
}
