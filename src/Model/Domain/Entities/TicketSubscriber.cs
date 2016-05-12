using System.ComponentModel.DataAnnotations;

namespace DLGP_SVDK.Model.Domain.Entities
{
    public class TicketSubscriber
    {
        public int TicketId { get; set; }

        [Key]
        [StringLength(256, ErrorMessageResourceName = "FieldMaximumLength")]
        public string SubscriberId { get; set; }

        
        public virtual Ticket Ticket { get; set; }

    }
}
