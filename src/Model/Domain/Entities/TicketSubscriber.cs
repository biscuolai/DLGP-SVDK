using System.ComponentModel.DataAnnotations;

namespace DLGP_SVDK.Model.Domain.Entities
{
    public class TicketSubscriber
    {
        [Key]
        public int Id { get; set; }

        public int TicketId { get; set; }

        [StringLength(256, ErrorMessageResourceName = "FieldMaximumLength")]
        public string SubscriberId { get; set; }

        public virtual Ticket Ticket { get; set; }
    }
}
