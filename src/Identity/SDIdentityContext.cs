//using Microsoft.AspNet.Identity.EntityFramework;
//using DLGP_SVDK.Identity.Model;

//namespace DLGP_SVDK.Identity
//{
//    public class SDIdentityContext : IdentityDbContext<ServiceDeskUser>
//    {
//        public SDIdentityContext()
//            : base("ServiceDesk", true)
//        {
//        }

//        protected override void OnModelCreating(DbModelBuilder modelBuilder)
//        {
//            //we have to call the base modelbuilder first, or the new names get overridden by the base
//            base.OnModelCreating(modelBuilder);

//            modelBuilder.Entity<ServiceDeskUser>().ToTable("IdentityUsers");
//            modelBuilder.Entity<ServiceDeskRole>().ToTable("IdentityRoles");
//            modelBuilder.Entity<IdentityRole>().ToTable("IdentityRoles");
//            modelBuilder.Entity<ServiceDeskUserRole>().ToTable("IdentityUserRoles");
//            modelBuilder.Entity<ServiceDeskUserLogin>().ToTable("IdentityUserLogins");
//            modelBuilder.Entity<ServiceDeskUserClaim>().ToTable("IdentityUserClaims");

//        }
//    }
//}