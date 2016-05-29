//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Security.Claims;
//using System.Security.Principal;
//using Microsoft.AspNet.Identity;
//using DLGP_SVDK.Identity.Model;
//using Microsoft.AspNet.Identity.EntityFramework;

//namespace DLGP_SVDK.Identity
//{
//    public static class SDIdentityExtensions
//    {
//        public static IEnumerable<ServiceDeskUser> GetUsersInRole(this ICollection<ServiceDeskUserRole> roleUsers, UserManager<ServiceDeskUser> userManager)
//        {
//            var ids = roleUsers.Select(u => u.UserId);
//            return userManager.Users.Where(u => ids);
//        }

//        public static string GetUserDisplayName(this IIdentity identity)
//        {
//            if (identity == null)
//            {
//                throw new ArgumentNullException("identity");
//            }
//            var ci = identity as ClaimsIdentity;
//            if (ci != null)
//            {
//                return ci.FindFirstValue(ClaimTypes.GivenName);
//            }
//            return null;
//        }
//    }
//}