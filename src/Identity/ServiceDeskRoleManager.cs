//using System.Collections.Generic;
//using System.Linq;
//using Microsoft.AspNet.Identity;
//using DLGP_SVDK.Identity.Model;

//namespace DLGP_SVDK.Identity
//{
//    public class ServiceDeskRoleManager : RoleManager<ServiceDeskRole>
//    {

//        public ServiceDeskRoleManager(IRoleStore<ServiceDeskRole> roleStore)
//            : base(roleStore)
//        {
//        }
        
//        public IOrderedEnumerable<ServiceDeskUser> GetTdInternalUsers(ServiceDeskUserManager userManager)
//        {
//            return GetUsersInRole(new[] { "TdInternalUsers", "TdHelpDeskUsers", "TdAdministrators" }, userManager);
//        }
//        public IOrderedEnumerable<ServiceDeskUser> GetTdTdAdministrators(ServiceDeskUserManager userManager)
//        {
//            return GetUsersInRole(new[] { "TdAdministrators" }, userManager);
//        }

//        public IOrderedEnumerable<ServiceDeskUser> GetTdHelpDeskUsers(ServiceDeskUserManager userManager)
//        {
//            return GetUsersInRole(new[] { "TdHelpDeskUsers", "TdAdministrators" }, userManager);
//        }
//        public IOrderedEnumerable<ServiceDeskUser> GetTdPendingUsers(ServiceDeskUserManager userManager)
//        {
//            return GetUsersInRole(new[] { "TdPendingUsers" }, userManager);
//        }

//        public IOrderedEnumerable<ServiceDeskUser> GetUsersInRole(string[] roleNames, ServiceDeskUserManager userManager)
//        {
//            var foundUsers = new List<ServiceDeskUser>();

//            foreach (var roleName in roleNames)
//            {
//                foundUsers.AddRange(
//                    this
//                        .FindByName(roleName)
//                        .Users
//                        .GetUsersInRole(userManager)
//                        .Where(u => foundUsers.All(f => f.Id != u.Id))
//                    );
//            }
//            return foundUsers.OrderBy(u => u.DisplayName);
//        }

//        /// <summary>
//        /// Ensures the correct set of TD standard roles exist.
//        /// </summary>
//        public void EnsureDefaultRolesExist()
//        {
//            //var roles = SDIdentityContext.DefaultRoles;
//            foreach (var defaultRole in DefaultRoles)
//            {
//                if (!this.RoleExists(defaultRole.Name))
//                {
//                    this.Create(defaultRole);
//                }
//            }

//        }
        
//        public static IEnumerable<ServiceDeskRole> DefaultRoles
//        {
//            get
//            {
//                return new[]
//                {
//                    new ServiceDeskRole
//                    {
//                        Name = "TdAdministrators",
//                        DisplayName = DefaultRolesDisplayName["TdAdministrators"],
//                        Description = DefaultRolesDescription["TdAdministrators"],
//                    },
//                     new ServiceDeskRole
//                    {
//                        Name = "TdHelpDeskUsers",
//                        DisplayName = DefaultRolesDisplayName["TdHelpDeskUsers"],
//                        Description = DefaultRolesDescription["TdHelpDeskUsers"],

//                     },
//                     new ServiceDeskRole
//                    {
//                        Name = "TdInternalUsers",
//                        DisplayName = DefaultRolesDisplayName["TdInternalUsers"],
//                        Description = DefaultRolesDescription["TdInternalUsers"],
//                     },
//                     new ServiceDeskRole
//                    {
//                        Name = "TdPendingUsers",
//                        DisplayName = DefaultRolesDisplayName["TdPendingUsers"],
//                        Description = DefaultRolesDescription["TdPendingUsers"],
//                     }
//                };
//            }
//        }

//        public static IDictionary<string, string> DefaultRolesDisplayName
//        {
//            get
//            {
//                return new Dictionary<string, string>()
//                {
//                    {
//                        "TdAdministrators",
//                        String.Role_Administrator
//                    },
//                    {
//                        "TdHelpDeskUsers",
//                        String.Role_HelpDesk
//                     },
//                    {
//                        "TdInternalUsers",
//                        String.Role_InternalUser
//                     },
//                    {
//                        "TdPendingUsers",
//                        String.Role_PendingApproval
//                     }
//                };
//            }
//        }

//        public static IDictionary<string, string> DefaultRolesDescription
//        {
//            get
//            {
//                return new Dictionary<string, string>()
//                {
//                    {
//                        "TdAdministrators",
//                        String.Role_Administrator_Description
//                    },
//                    {
//                        "TdHelpDeskUsers",
//                        String.Role_HelpDesk_Description
//                     },
//                    {
//                        "TdInternalUsers",
//                        String.Role_InternalUser_Description
//                     },
//                    {
//                        "TdPendingUsers",
//                        String.Role_PendingApproval_Description
//                     }
//                };
//            }
//        }
//    }
//}