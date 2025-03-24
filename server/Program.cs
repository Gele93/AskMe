
using AskMe.Data.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AskMe.Data.Entities;

namespace AskMe
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var configurations = builder.Configuration;

            var app = builder.Build();

            AddDatabase(builder, configurations);
            AddAuthentication(builder, configurations);
            AddIdentity(builder);

            using (var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<AskMeContext>();
                dbContext.Database.Migrate();
            }



            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var userManager = services.GetRequiredService<UserManager<User>>();
                var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

                await SeedRolesAndAdminAsync(userManager, roleManager, app, configurations);
            }


            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }

        static void AddServices(WebApplicationBuilder builder)
        {
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
        }


        //ADD AUTH SEED CALLS
        static async Task SeedRolesAndAdminAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, WebApplication app, IConfiguration config)
        {
            if (!await roleManager.RoleExistsAsync(config["Roles:Admin"]))
            {
                using var scope = app.Services.CreateScope();

                //CALL AUTH SEEDER
                /*
                var authenticationSeeder = scope.ServiceProvider.GetRequiredService<AuthenticationSeeder>();
                authenticationSeeder.AddRoles();
            */
            }
            var adminUser = await userManager.FindByEmailAsync(config["Users:Admin:Email"]);
            if (adminUser == null)
            {
                using var scope = app.Services.CreateScope();
                // CALL AUTH SEEDER
                /*
                var authenticationSeeder = scope.ServiceProvider.GetRequiredService<AuthenticationSeeder>();
                authenticationSeeder.CreateAdminIfNotExists();
            */
            }
        }

        static void AddDatabase(WebApplicationBuilder builder, IConfiguration config)
        {
            builder.Services.AddDbContext<AskMeContext>(options =>
            {
                options.UseSqlServer(
                    config["ConnectionString"],
                    sqlOptions => sqlOptions.EnableRetryOnFailure(
                        maxRetryCount: 5,
                        maxRetryDelay: TimeSpan.FromSeconds(10),
                        errorNumbersToAdd: null
                    ));
            });
        }
        static void AddAuthentication(WebApplicationBuilder builder, IConfiguration config)
        {
            builder.Services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var token = context.Request.Cookies["AuthToken"];
                            if (!string.IsNullOrEmpty(token))
                                context.Token = token;

                            return Task.CompletedTask;
                        }
                    };

                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ClockSkew = TimeSpan.Zero,
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = config["Token:Issuer"],
                        ValidAudience = config["Token:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(config["Token:Key"])
                        ),
                    };
                });
        }

        static void AddIdentity(WebApplicationBuilder webApplicationBuilder1)
        {
            webApplicationBuilder1.Services
                .AddIdentityCore<User>(options =>
                {
                    options.SignIn.RequireConfirmedAccount = false;
                    options.User.RequireUniqueEmail = true;
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 6;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireLowercase = false;
                })
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<AskMeContext>();
        }

        static void AddCookiePolicy(WebApplicationBuilder builder)
        {
            builder.Services.Configure<CookiePolicyOptions>(options =>
            {
                options.HttpOnly = HttpOnlyPolicy.Always;
                options.Secure = CookieSecurePolicy.Always;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
        }
    }
}
