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
        //private RoleManager<IdentityRole> _roleManager;

        public UserProfile(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            //_roleManager = roleManager;
        }

        public async Task<ApplicationUser> GetUserByUserName(string username)
        {
            ApplicationUser result = await _userManager.FindByNameAsync(username);
            return result;
        }

        public async Task<ApplicationUser> GetUserById(string id)
        {
            ApplicationUser result = await _userManager.FindByIdAsync(id);
            return result;
        }
        public async Task<ApplicationUser> GetUserByEmail(string email)
        {
            ApplicationUser result = await _userManager.FindByEmailAsync(email);
            return result;
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
