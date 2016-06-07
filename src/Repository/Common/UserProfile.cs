using DLGP_SVDK.Model.Domain.Entities.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DLGP_SVDK.Repository.Common
{
    public class UserProfile
    {
        private UserManager<ApplicationUser> _userManager;
        private RoleManager<IdentityRole> _roleManager;

        public async Task<string> DisplayName(string username)
        {
            ApplicationUser result = await _userManager.FindByNameAsync(username);
            return result.DisplayName;
        }

        public async Task<string> DisplayNameById(string id)
        {
            ApplicationUser result = await _userManager.FindByIdAsync(id);
            return result.DisplayName;
        }

        public IQueryable<IdentityUser> GetUsersInRole(ApplicationDbContext db, string roleName)
        {
            if (db != null && roleName != null)
            {
                var roles = db.Roles.Where(r => r.Name == roleName);
                if (roles.Any())
                {
                    var roleId = roles.First().Id;
                    return from user in db.Users
                           where user.Roles.Any(r => r.RoleId == roleId)
                           select user;
                }
            }
            return null;
        }
    }
}
