using AskMe.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace AskMe.Data.Seeders
{
    public class AuthSeeder(RoleManager<IdentityRole> roleManager, UserManager<User> userManager, IConfiguration config)
    {
        private RoleManager<IdentityRole> _roleManager = roleManager;
        private UserManager<User> _userManager = userManager;
        private IConfiguration _config = config;

        public void AddRoles()
        {
            var tAdmin = CreateAdminRole(roleManager);
            tAdmin.Wait();

            var tUser = CreateUserRole(roleManager);
            tUser.Wait();
        }
        public async Task CreateAdminIfNotExists()
        {
            var email = _config["Users:Admin:Email"];
            var username = _config["Users:Admin:Username"];
            var password = _config["Users:Admin:Password"];

            var adminInDb = await userManager.FindByEmailAsync(email);
            if (adminInDb == null)
            {
                var admin = new User { UserName = username, Email = email };
                var adminCreated = await userManager.CreateAsync(admin, password);

                if (adminCreated.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, _config["Roles:Admin"]);
                }
            }
        }

        private async Task CreateAdminRole(RoleManager<IdentityRole> manager) =>
            await manager.CreateAsync(new IdentityRole(_config["Roles:Admin"]));

        private async Task CreateUserRole(RoleManager<IdentityRole> manager) =>
            await manager.CreateAsync(new IdentityRole(_config["Roles:User"]));


    }
}
