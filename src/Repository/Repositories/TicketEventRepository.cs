using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Repository.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DLGP_SVDK.Repository.Repositories
{
    public class TicketEventRepository : Repository<TicketEvent>, ITicketEventRepository
    {
        public TicketEventRepository(ApplicationDbContext context) : base(context)
        {
        }

        public IEnumerable<TicketEvent> GetAllEventsByTicketId(int id)
        {
            return ApplicationContext.TicketEvents
                .Where(c => c.TicketId == id)
                .OrderByDescending(c => c.EventDate)
                .ToList();
        }

        /// <summary>
        /// Creates the activity event.
        /// </summary>
        /// <param name="eventByUserId">The event by user identifier.</param>
        /// <param name="activity">The activity.</param>
        /// <param name="comment">The comment.</param>
        /// <param name="newPriority">The new priority.</param>
        /// <param name="userName">Name of the user.</param>
        /// <returns>TicketEvent.</returns>
        public TicketEvent CreateActivityEvent(
            int ticketId,
            string eventByUserId,
            TicketActivity activity,
            string comment,
            string newPriority,
            string userName,
            string newStatus
            )
        {
            var tc = new TicketEvent
            {
                TicketId = ticketId,
                Comment = comment,
                EventBy = eventByUserId,
                EventDate = DateTime.Now,
                EventType = activity.ToString(),
                EventDescription = GetTicketEventDescription(activity, newPriority, userName, newStatus)
            };
            return tc;
        }

        /// <summary>
        /// Gets the comment event text.
        /// </summary>
        /// <param name="ticketEvent">The ticket event of which to fetch the comment event.</param>
        /// <param name="newPriority">The new priority, leave null if priority change isn't applicable for the activity.</param>
        /// <param name="userName">Name of the user, leave null if a user name isn't applicable for the activity</param>
        /// <returns>System.String.</returns>
        /// <exception cref="System.NullReferenceException"></exception>
        public static string GetTicketEventDescription(TicketActivity ticketEvent, string newPriority, string userName, string newStatus)
        {
            var val = "";

            // TicketActivity enum
            switch (ticketEvent)
            {
                case TicketActivity.AddComment:
                    val = "has added a new comment";
                    break;
                case TicketActivity.SupplyMoreInfo:
                    val = "has provided more information";
                    break;
                case TicketActivity.CancelMoreInfo:
                    val = "has cancelled the request for more information";
                    break;
                case TicketActivity.Cancel:
                    val = "has cancelled the ticket";
                    break;
                case TicketActivity.RequestMoreInfo:
                    val = "has requested more information";
                    break;
                case TicketActivity.TakeOver:
                    val = "has taken over the ticket";
                    break;
                case TicketActivity.Resolve:
                    val = "resolved the ticket";
                    break;
                case TicketActivity.Assign:
                    val = "assigned the ticket to {0}";
                    break;
                case TicketActivity.ReAssign:
                    val = "reassigned the ticket to {0}";
                    break;
                case TicketActivity.Pass:
                    val = "passed the ticket to {0}";
                    break;
                case TicketActivity.Close:
                    val = "closed the ticket";
                    break;
                case TicketActivity.ReOpen:
                    val = "re-opened the ticket";
                    break;
                case TicketActivity.GiveUp:
                    val = "has given up on the ticket";
                    break;
                case TicketActivity.ModifyAttachments:
                    val = "modified ticket attachments";
                    break;
                case TicketActivity.EditTicketInfo:
                    val = "modified ticket";
                    break;
                case TicketActivity.Create:
                    val = "created the ticket";
                    break;
                case TicketActivity.CreateOnBehalfOf:
                    val = "created the ticket on behalf of {0}";
                    break;
                default:
                    break;
            }

            // Ticket Activity Priority
            var pval = " at a priority of {0}";
            // Ticket Activity Status
            var sval = " and at a status of {0}";

            if (string.IsNullOrEmpty(val) || string.IsNullOrEmpty(pval) || string.IsNullOrEmpty(sval))
            {
                throw new NullReferenceException();
            }
            if (!string.IsNullOrEmpty(userName))
            {
                val = string.Format(val, userName);
            }
            if (!string.IsNullOrEmpty(newPriority))
            {
                val += string.Format(pval, newPriority);
            }
            if (!string.IsNullOrEmpty(newStatus))
            {
                val += string.Format(sval, newStatus);
            }
            return val;
        }

        /// <summary>
        /// Creates the event notifications for each ticket subscriber and adds them to the TicketEventNotifications collection.
        /// </summary>
        public void CreateSubscriberEventNotifications(TicketEvent ticketEvent)
        {
            foreach (var subscriber in ticketEvent.Ticket.Subscribers)
            {
                var isSubscriberEvent = ticketEvent.EventBy == subscriber.SubscriberId;

                ApplicationContext.TicketEventNotifications.Add(
                    new TicketEventNotification
                    {
                        EventId = ticketEvent.EventId,
                        TicketId = ticketEvent.TicketId,
                        IsNew = !isSubscriberEvent,
                        IsRead = isSubscriberEvent,
                        SubscriberId = subscriber.SubscriberId,
                    });

            }
        }

        public int GetId(TicketEvent ticketEvent)
        {
            return ApplicationContext.Entry(ticketEvent).Entity.EventId;
        }

        public TicketEvent Reload(int id)
        {
            return ApplicationContext.TicketEvents
                .First(x => x.EventId == id);
        }

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
