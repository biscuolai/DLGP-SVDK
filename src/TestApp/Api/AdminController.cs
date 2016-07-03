using Microsoft.AspNet.Mvc;
using System.Linq;
using Microsoft.AspNet.Authorization;
using DLGP_SVDK.Repository.Common;
using DLGP_SVDK.Repository;
using System.Security.Claims;
using DLGP_SVDK.Model.Domain.Entities.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System;
using System.Net;


// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DLGP_SVDK.Web.Api
{
    [Route("api/admin")]
    public class AdminController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AdminController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        // GET: api/admin/users
        [HttpGet("users")]
        public JsonResult GetUsers()
        {
            List<IdentityUser> allUsers = new List<IdentityUser>();

            try
            {
                var users = new UserProfile(_userManager, _roleManager);
                var roles = users.GeAllRoles();

                foreach (var role in roles)
                {
                    allUsers.Add(users.GetUsersInRole(new ApplicationDbContext(), role.Name).FirstOrDefault());
                }
            }
            catch (System.Exception ex)
            {
                throw;
            }

            return new JsonResult(new { data = allUsers, success = true });
        }

        // GET: api/admin/roles
        [HttpGet("roles")]
        public JsonResult GetRoles()
        {
            var roles = new UserProfile(_userManager, _roleManager);
            var list = roles.GeAllRoles();

            return new JsonResult(new { data = list, success = true });
        }

        [HttpGet("issignedin")]
        public JsonResult IsUserSignedIn()
        {
            // returns true or false whether the user is logged in or not
            return new JsonResult(new { data = User.IsSignedIn(), success = true });
        }

        [HttpGet("{id}/notifications")]
        public JsonResult GetNotifications(string id)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork(new ApplicationDbContext()))
                {
                    // Get the list of all notifications by user id
                    var notifications = unitOfWork.TicketEventNotifications.GetAllNotificationsByUserId(id);

                    return new JsonResult(new { data = notifications, success = true });
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }
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
