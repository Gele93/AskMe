using AskMe.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace AskMe.Data.Seeders
{
    public class AuthSeeder
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;

        public AuthSeeder(RoleManager<IdentityRole> roleManager, UserManager<User> userManager, IConfiguration config)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _config = config;
        }
        public async Task AddRoles()
        {
            await CreateAdminRole(_roleManager);
            await CreateUserRole(_roleManager);
        }
        public async Task CreateAdminIfNotExists()
        {
            var email = _config["Users:Admin:Email"];
            var username = _config["Users:Admin:Username"];
            var password = _config["Users:Admin:Password"];

            var adminInDb = await _userManager.FindByEmailAsync(email);
            if (adminInDb == null)
            {
                var admin = new User { UserName = username, Email = email, FirstName = "Admin", LastName = "Admin", SubscriptionLevel = 100 };
                IdentityResult adminCreated = null;

                try
                {
                    adminCreated = await _userManager.CreateAsync(admin, password);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Exception occurred while creating admin: {ex.Message}");
                }

                if (adminCreated != null && adminCreated.Succeeded)
                {
                    await _userManager.AddToRoleAsync(admin, _config["Roles:Admin"]);
                }
            }
        }


        private async Task CreateAdminRole(RoleManager<IdentityRole> manager) =>
            await manager.CreateAsync(new IdentityRole(_config["Roles:Admin"]));

        private async Task CreateUserRole(RoleManager<IdentityRole> manager) =>
            await manager.CreateAsync(new IdentityRole(_config["Roles:User"]));


    }
}
