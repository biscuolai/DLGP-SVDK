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

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [StringLength(256, ErrorMessageResourceName = "FieldMaximumLength")]
        public string EventBy { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTimeOffset EventDate { get; set; }

        [Column(TypeName = "timestamp")]
        [MaxLength(8)]
        [Timestamp]
        public byte[] Version { get; set; }

        public virtual Ticket Ticket { get; set; }

        public virtual ICollection<TicketEventNotification> TicketEventNotifications { get; set; }


        /// <summary>
        /// Creates the activity event.
        /// </summary>
        /// <param name="eventByUserId">The event by user identifier.</param>
        /// <param name="activity">The activity.</param>
        /// <param name="comment">The comment.</param>
        /// <param name="newPriority">The new priority.</param>
        /// <param name="userName">Name of the user.</param>
        /// <returns>TicketEvent.</returns>
        public static TicketEvent CreateActivityEvent(
        string eventByUserId,
        TicketActivity activity,
        string comment,
        string newPriority,
        string userName)
        {
            var tc = new TicketEvent
            {
                Comment = comment,
                EventBy = eventByUserId,
                EventDate = DateTime.Now,
                EventDescription = ""
            };
            return tc;
        }

        /// <summary>
        /// Creates the event notifications for each ticket subscriber and adds them to the TicketEventNotifications collection.
        /// </summary>
        public void CreateSubscriberEventNotifications()
        {
            foreach (var subscriber in Ticket.TicketSubscribers)
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
