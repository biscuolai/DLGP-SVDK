using Microsoft.AspNet.Mvc;
using System.Linq;
using Microsoft.AspNet.Authorization;
using DLGP_SVDK.Repository.Common;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DLGP_SVDK.Web.Api
{
    [Authorize]
    [Route("api/admin")]
    public class AdminController : Controller
    {
        // GET: api/admin/users
        [HttpGet("users")]
        public JsonResult Get()
        {
            var users = new UserProfile();
            var displayName = users.DisplayNameById("");

            return new JsonResult(new { data = displayName, success = true });
        }

        //[HttpGet("user")]
        //public JsonResult GetUser()
        //{
        //    if (User.Identity.IsAuthenticated)
        //    {
        //        var user = User.Identity;
        //        ViewBag.Name = user.Name;
        //        ApplicationDbContext context = new ApplicationDbContext();
        //        var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
        //        var s = UserManager.GetRoles(user.GetUserId());
        //        string RoleName = s[0].ToString();
        //        ViewBag.displayMenu = "No";
        //        ViewBag.UserRole = RoleName;
        //        if (RoleName == "Admin")
        //        {
        //            ViewBag.displayMenu = "Yes";
        //        }

        //        return new JsonResult(RoleName);
        //    }
        //    else
        //    {
        //        return RedirectToAction("Index", "Home");
        //    }
        //}
    }
}
