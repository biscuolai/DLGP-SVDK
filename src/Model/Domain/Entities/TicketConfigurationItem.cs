using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DLGP_SVDK.Model.Domain.Entities
{
    public class TicketConfigurationItem
    {
        [Key]
        public int ConfigurationItemId { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Display(ResourceType = typeof(String), Name = "ConfigurationItemProject", ShortName = "ConfigurationItemProjectShort")]
        public int ProjectId { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [StringLength(100, ErrorMessageResourceName = "FieldMaximumLength")]
        [Display(Name = "Name", ResourceType = typeof(string))]
        public string Name { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        public int Order { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        public bool Active { get; set; }
    }
}
