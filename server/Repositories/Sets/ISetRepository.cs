using AskMe.Data.Entities;

namespace AskMe.Repositories.Sets
{
    public interface ISetRepository
    {
        Task<Set> CreateSet(Set set);
    }
}
