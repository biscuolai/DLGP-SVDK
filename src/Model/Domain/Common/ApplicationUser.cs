using Microsoft.AspNet.Identity.EntityFramework;

namespace DLGP_SVDK.Model.Domain.Common
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public string DisplayName { get; set; }
    }
}
