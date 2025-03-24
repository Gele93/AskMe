using AskMe.Data.Context;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;

namespace AskMe.Data.Factory
{
    public class AskMeContextFactory : IDesignTimeDbContextFactory<AskMeContext>
    {
        public AskMeContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AskMeContext>();
            optionsBuilder.UseSqlServer("server=localhost,1433;Database=AskMe;User Id=sa;Password=MyStr0ng(!)P4SSw0rd;Encrypt=false;");

            return new AskMeContext(optionsBuilder.Options);
        }
    }

}
