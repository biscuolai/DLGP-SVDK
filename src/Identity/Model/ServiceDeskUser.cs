using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.ComponentModel.DataAnnotations;
using System;

namespace DLGP_SVDK.Identity.Model
{
    public class ServiceDeskUser : IdentityUser
    {
        [Required(ErrorMessageResourceName = "FieldRequired")]
        [StringLength(100, ErrorMessageResourceName = "FieldMaximumLength")]
        [Display(Name = "DisplayName", ResourceType = typeof(String))]
        public string DisplayName { get; set; }

        //public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ServiceDeskUser> manager)
        public async Task<IdentityResult> GenerateUserIdentityAsync(UserManager<ServiceDeskUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            //var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            //userIdentity.AddClaim(new Claim(ClaimTypes.GivenName, DisplayName));

            var userIdentity = await manager.AddClaimAsync(this, new Claim(ClaimTypes.GivenName, DisplayName));

            return userIdentity;
        }

    }
}