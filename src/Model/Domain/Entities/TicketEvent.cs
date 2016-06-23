using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DLGP_SVDK.Model.Domain.Entities
{
    public class TicketEvent
    {
        public TicketEvent()
        {
            TicketEventNotifications = new HashSet<TicketEventNotification>();
        }

        public int TicketId { get; set; }

        [Key]
        public int EventId { get; set; }

        [StringLength(500, ErrorMessageResourceName = "FieldMaximumLength")]
        public string EventDescription { get; set; }


        public string Comment { get; set; }

        public string EventType { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [StringLength(256, ErrorMessageResourceName = "FieldMaximumLength")]
        public string EventBy { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        public DateTimeOffset EventDate { get; set; }

        [Column(TypeName = "timestamp")]
        [MaxLength(8)]
        [Timestamp]
        public byte[] Version { get; set; }

        public virtual ICollection<TicketEventNotification> TicketEventNotifications { get; set; }

        public virtual Ticket Ticket { get; set; }

        /// <summary>
        /// Creates the event notifications for each ticket subscriber and adds them to the TicketEventNotifications collection.
        /// </summary>
        public void CreateSubscriberEventNotifications()
        {
            foreach (var subscriber in Ticket.Subscribers)
            {
                var isSubscriberEvent = EventBy == subscriber.SubscriberId;

                TicketEventNotifications.Add(
                    new TicketEventNotification
                    {
                        IsNew = !isSubscriberEvent,
                        IsRead = isSubscriberEvent,
                        SubscriberId = subscriber.SubscriberId,
                    });

            }
        }
    }
}
