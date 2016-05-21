using System.ComponentModel.DataAnnotations;

namespace DLGP_SVDK.Model.Domain.Entities
{
    public class TicketContactType
    {
        [Key]
        public int ContactTypeId { get; set; }

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
