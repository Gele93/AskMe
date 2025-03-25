using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AskMe.Data.Entities;

namespace AskMe.Data.Context
{
    public class AskMeContext(DbContextOptions<AskMeContext> options) : IdentityDbContext<User, IdentityRole, string>(options)
    {

        public DbSet<Set> Sets { get; set; }
        public DbSet<Theme> Themes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }

        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Set>()
                .HasOne(s => s.User)
                .WithMany(u => u.Sets)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Theme>()
                .HasOne(t => t.Set)
                .WithMany(s => s.Themes)
                .HasForeignKey(t => t.SetId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Question>()
                .HasOne(q => q.Theme)
                .WithMany(t => t.Questions)
                .HasForeignKey(q => q.ThemeId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Answer>()
                .HasOne(a => a.Question)
                .WithMany(q => q.Answers)
                .HasForeignKey(q => q.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
