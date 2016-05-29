//using System.Collections.Generic;
//using System.Linq;
//using Microsoft.AspNet.Identity.EntityFramework;
//using DLGP_SVDK.Identity.Model;

//namespace DLGP_SVDK.Identity.Migrations
//{
//    public static class DemoIdentityDataManager
//    {
//        public static void RemoveAllIdentity(SDIdentityContext context)
//        {
//            foreach (var user in context.Users)
//            {
//                context.Users.Remove(user);
//            }
//            foreach (var role in context.Roles)
//            {
//                context.Roles.Remove(role);
//            }
//            context.SaveChanges();

//            //Configuration.InitializeStockRoles(context);
//            context.SaveChanges();
//        }

//        public static void SetupDemoIdentityData(SDIdentityContext context)
//        {
//            var userStore = new UserStore<ServiceDeskUser>(context);
//            var roleStore = new RoleStore<ServiceDeskRole>(context);
//            var userManager = new ServiceDeskUserManager(userStore);
//            var roleManager = new ServiceDeskRoleManager(roleStore);

//            roleManager.EnsureDefaultRolesExist();

//            var admin = new ServiceDeskUser { Id = "64165817-9cb5-472f-8bfb-6a35ca54be6a", UserName = "admin@example.com", Email = "admin@example.com", DisplayName = "Admin User" };
//            var staff = new ServiceDeskUser { Id = "72bdddfb-805a-4883-94b9-aa494f5f52dc", UserName = "staff@example.com", Email = "staff@example.com", DisplayName = "HelpDesk User" };
//            var reguser = new ServiceDeskUser { Id = "17f78f38-fa68-445f-90de-38896140db28", UserName = "user@example.com", Email = "user@example.com", DisplayName = "Regular User" };
//            var users = new[] { admin, staff, reguser };
//            var rolesNames = new Dictionary<string, string[]>
//            {
//                {"admin@example.com", new[] {"TdAdministrators"}},
//                {"staff@example.com", new[] {"TdHelpDeskUsers"}},
//                {"user@example.com", new[] {"TdInternalUsers"}}
//            };
//            foreach (var tdUser in users)
//            {

//                var user = userManager.FindById(tdUser.Id);
//                if (user != null)
//                {
//                    userManager.Delete(user);
//                }
//                user = tdUser;
//                userManager.Create(user, "123456");

//                var rnames = rolesNames[user.UserName];
//                var rolesForUser = userManager.GetRoles(user.Id);
//                foreach (var rname in rnames.Where(rname => !rolesForUser.Contains(rname)))
//                {
//                    userManager.AddToRole(user.Id, rname);
//                }
//            }
//        }
//    }
//}
