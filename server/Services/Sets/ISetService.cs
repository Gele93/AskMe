using AskMe.Data.Models.Sets;

namespace AskMe.Services.Sets
{
    public interface ISetService
    {
        Task<SetDto> CreateFormatedSet(SetRequest file);
        Task<SetDto> CreateUnFormatedSet(SetRequest file);
    }
}
