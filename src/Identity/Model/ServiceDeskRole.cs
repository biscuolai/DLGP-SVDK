//using System.ComponentModel.DataAnnotations;
//using Microsoft.AspNet.Identity.EntityFramework;
//using System;

//namespace DLGP_SVDK.Identity.Model
//{
//    public class ServiceDeskRole : IdentityRole
//    {
//        private string displayName;
//        private string description;

//        public ServiceDeskRole() : base() { }

//        public ServiceDeskRole(string roleName, string displayName, string description)
//            : base(roleName)
//        {
//            this.displayName = displayName;
//            this.description = description;
//        }

//        [Required(ErrorMessageResourceName = "FieldRequired")]
//        [StringLength(100, ErrorMessageResourceName = "FieldMaximumLength")]
//        [Display(Name = "DisplayName", ResourceType = typeof(String))]
//        public string DisplayName
//        {
//            get
//            {
//                if (ServiceDeskRoleManager.DefaultRolesDisplayName.ContainsKey(this.Name))
//                    return ServiceDeskRoleManager.DefaultRolesDisplayName[this.Name];
//                else
//                    return this.displayName;
//            }
//            set
//            {
//                this.displayName = value;
//            }
//        }


//        [StringLength(500, ErrorMessageResourceName = "FieldMaximumLength")]
//        [Display(Name = "RoleDescription", ResourceType = typeof(String))]
//        public string Description
//        {
//            get
//            {
//                if (ServiceDeskRoleManager.DefaultRolesDescription.ContainsKey(this.Name))
//                    return ServiceDeskRoleManager.DefaultRolesDescription[this.Name];
//                else
//                    return this.displayName;
//            }
//            set
//            {
//                this.description = value;
//            }
//        }
//    }
//}
