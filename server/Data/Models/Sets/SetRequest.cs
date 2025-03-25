namespace AskMe.Data.Models.Sets
{
    public record SetRequest
    (
        string Name,
        string Description,
        IFormFile file
    );
}
