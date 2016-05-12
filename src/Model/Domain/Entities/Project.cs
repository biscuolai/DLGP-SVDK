using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DLGP_SVDK.Model.Domain.Entities
{
    public class Project 
    {
        [Key]
        public int ProjectId { get; set; }

        [StringLength(10, ErrorMessageResourceName = "FieldMaximumLength")]
        [Required(ErrorMessageResourceName = "FieldRequired")]
        [Display(Name = "ProjectCode", ResourceType = typeof(String))]
        public string ProjectCode { get; set; }

        [StringLength(100, ErrorMessageResourceName = "FieldMaximumLength")]
        [Required(ErrorMessageResourceName = "FieldRequired")]
        [Display(Name = "ProjectName", ResourceType = typeof(String))]
        public string ProjectName { get; set; }

        [StringLength(500, ErrorMessageResourceName = "FieldMaximumLength")]
        [Display(Name = "ProjectDescription", ResourceType = typeof(String))]
        public string ProjectDescription { get; set; }

        [MaxLength(8)]
        [Timestamp]
        public byte[] Version { get; set; }

        public virtual ICollection<Ticket> Tickets { get; set; } 
    }
}
