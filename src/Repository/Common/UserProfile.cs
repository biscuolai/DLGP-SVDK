using DLGP_SVDK.Model.Domain.Common;
using Microsoft.AspNet.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace DLGP_SVDK.Repository.Common
{
    public class UserProfile
    {
        public UserProfile(IServiceProvider services)
        {
            UserManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        }

        public UserManager<ApplicationUser> UserManager { get; set; }

        public async Task<string> DisplayName(string username)
        {
            ApplicationUser result = await UserManager.FindByNameAsync(username);
            return result.DisplayName;
        }

        public async Task<string> DisplayNameById(string id)
        {
            ApplicationUser result = await UserManager.FindByIdAsync(id);
            return result.DisplayName;
        }
    }
}
