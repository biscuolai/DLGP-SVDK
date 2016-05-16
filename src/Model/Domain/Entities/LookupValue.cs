using System.ComponentModel.DataAnnotations;

namespace DLGP_SVDK.Model.Domain.Entities
{
    public enum LookupValueName {
        ContactType,
        Category,
        ConfigurationItem,
        TicketStatus,
        Priority
    }

    public class LookupValue
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [Display(Name = "Name", ResourceType = typeof(int))]
        public LookupValueName Name { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [StringLength(100, ErrorMessageResourceName = "FieldMaximumLength")]
        [Display(Name = "Value", ResourceType = typeof(string))]
        public string Value { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        public int Order { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        public bool Active { get; set; }
    }
}
