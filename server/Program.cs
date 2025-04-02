
using AskMe.Data.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AskMe.Data.Entities;
using AskMe.Data.Seeders;
using Microsoft.AspNetCore.Builder;
using AskMe.Services.UserServices;
using AskMe.Services.Formaters;
using AskMe.Services.Readers;
using AskMe.Services.Sets;
using AskMe.Repositories.Sets;

namespace AskMe
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var configurations = builder.Configuration;
            var connectionString = Environment.GetEnvironmentVariable("DbConnectionString");

            if (String.IsNullOrEmpty(connectionString))
            {
                connectionString = configurations["ConnectionString"];
            }

            builder.Services.AddControllers()
                            .AddJsonOptions(options =>
                                 {
                                     options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
                                     options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;

                                 });

            AddServices(builder);
            AddDatabase(builder, connectionString);
            AddAuthentication(builder, configurations);
            AddIdentity(builder);

            var app = builder.Build();

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
            builder.Services.AddScoped<AuthSeeder>();
            builder.Services.AddScoped<ITokenService, TokenService>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<ITxtFormater, TxtFormater>();
            builder.Services.AddScoped<ITxtReader, TxtReader>();
            builder.Services.AddScoped<ISetService, SetService>();
            builder.Services.AddScoped<ISetRepository, SetRepository>();
            builder.Services.AddScoped<UserManager<User>>();
            builder.Services.AddScoped<RoleManager<IdentityRole>>();

        }


        static async Task SeedRolesAndAdminAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, WebApplication app, IConfiguration config)
        {
            var adminRole = config["Roles:Admin"];
            if (!await roleManager.RoleExistsAsync(adminRole))
            {
                using var scope = app.Services.CreateScope();
                var authenticationSeeder = scope.ServiceProvider.GetRequiredService<AuthSeeder>();
                await authenticationSeeder.AddRoles();
            }
            var adminUser = await userManager.FindByEmailAsync(config["Users:Admin:Email"]);
            if (adminUser == null)
            {
                using var scope = app.Services.CreateScope();
                var authenticationSeeder = scope.ServiceProvider.GetRequiredService<AuthSeeder>();
                await authenticationSeeder.CreateAdminIfNotExists();
            }
        }

        static void AddDatabase(WebApplicationBuilder builder, string connectionString)
        {
            builder.Services.AddDbContext<AskMeContext>(options =>
            {
                options.UseSqlServer(
                    connectionString,
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
