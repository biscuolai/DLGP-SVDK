//using System;
//using Microsoft.AspNet.Identity.EntityFramework;
//using DLGP_SVDK.Identity.Model;
//using Microsoft.Data.Entity.Migrations;

//namespace DLGP_SVDK.Identity.Migrations
//{
//    public sealed class Configuration : Migration
//    {
//        public Configuration()
//        {
//            AutomaticMigrationsEnabled = true;
//            AutomaticMigrationDataLossAllowed = true;
//            ContextKey = "ServiceDeskIdentity";
//        }

//        /// <summary>
//        /// Seeds the specified context.
//        /// </summary>
//        /// <remarks>
//        /// for whatever reason, the internals for identity call this each time the 
//        /// application starts (initialize with force = true). It is imporatnt that
//        /// this not do anything that might break existing identity data
//        /// </remarks>
//        /// <param name="context">The context.</param>
//        protected override void Seed(SDIdentityContext context)
//        {
//            var demoMode = ConfigurationManager.AppSettings["ServiceDesk:DemoModeEnabled"];
//            if (!string.IsNullOrEmpty(demoMode) && demoMode.Equals("true", StringComparison.InvariantCultureIgnoreCase))
//            {
//                DemoIdentityDataManager.SetupDemoIdentityData(context);
//            }
//            else
//            {
//                InitializeStockRoles(context);
//            }
//        }

//        public static void InitializeStockRoles(SDIdentityContext context)
//        {

//            //create the standard roles and default admin account
//            //var userStore = new UserStore<ServiceDeskUser>(context);
//            var roleStore = new RoleStore<ServiceDeskRole>(context);

//            //var userManager = new ServiceDeskUserManager(userStore);
//            var roleManager = new ServiceDeskRoleManager(roleStore);
//            roleManager.EnsureDefaultRolesExist();


//            //var existingAdminRole = roleManager.FindByName("TdAdministrators");
//            //only create default admin user if no other user exists with the admin role
//            //if (existingAdminRole != null &&
//            //    !userManager.Users.Any(u => u.Roles.Any(r => r.RoleId == existingAdminRole.Id)))
//            //{
//            //    var admin = new ServiceDeskUser
//            //    {
//            //        Id = "64165817-9cb5-472f-8bfb-6a35ca54be6a",
//            //        UserName = "admin@example.com",
//            //        Email = "admin@example.com",
//            //        DisplayName = "Admin User",
//            //    };
//            //    if (userManager.FindById("64165817-9cb5-472f-8bfb-6a35ca54be6a") == null)
//            //    {
//            //        var adminRoles = new[] { "TdAdministrators"};
//            //        userManager.Create(admin, "123456");

//            //        foreach (var rname in adminRoles)
//            //        {
//            //            userManager.AddToRole(admin.Id, rname);
//            //        }
//            //    }
//            //}
//        }
//    }
//}
