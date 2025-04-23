using AskMe.Data.Entities;

namespace AskMe.Repositories.Sets
{
    public interface ISetRepository
    {
        Task<Set> CreateSet(Set set);
        Task<List<Set>> GetAll(string userId);
        Task<Set> GetById(int id);
        Task DeleteById(int id);

    }
}
