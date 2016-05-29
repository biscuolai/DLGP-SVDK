using Microsoft.AspNet.Identity.EntityFramework;

namespace DLGP_SVDK.Identity.Model
{
    public class ServiceDeskUserRole : IdentityUserRole<int> { }
    public class ServiceDeskUserClaim : IdentityUserClaim<int> { }
    public class ServiceDeskUserLogin : IdentityUserLogin<int> { }
    public class CustomIdentity 
    {
    }
}
