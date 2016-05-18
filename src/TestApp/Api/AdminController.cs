using Microsoft.AspNet.Mvc;
using DLGP_SVDK.Models;
using Microsoft.AspNet.Identity;
using System.Security.Claims;
using System.Linq;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DLGP_SVDK.Web.Api
{
    [Route("api/admin")]
    public class AdminController : Controller
    {
        // GET: api/admin/users
        [HttpGet("users")]
        public JsonResult Get(int id)
        {
            var context = new ApplicationDbContext();
            var users = context.Users.Where(x => x.Roles.Select(y => y.RoleId).Contains("1")).ToList();

            return new JsonResult(new { data = users, success = true });
        }
    }
}
