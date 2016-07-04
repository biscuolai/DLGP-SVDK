using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Repository.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DLGP_SVDK.Repository.Repositories
{
    public class TicketEventNotificationRepository : Repository<TicketEventNotification>, ITicketEventNotificationRepository
    {
        public TicketEventNotificationRepository(ApplicationDbContext context) : base(context)
        {
        }

        public IEnumerable<Ticket> GetAllNotificationsByUserId(string id)
        {
            //// save IsNew status as false for all notifications for that user
            //var notifications = ApplicationContext.TicketEventNotifications
            //    .Where(c => c.SubscriberId == id && c.IsRead == false && c.IsNew == true);

            //foreach (var item in notifications)
            //{
            //    item.IsNew = false;
            //}

            //ApplicationContext.SaveChanges();

            return ApplicationContext.TicketEventNotifications
                .Where(c => c.SubscriberId == id && c.IsRead == false && c.IsNew == true)
                .OrderByDescending(c => c.TicketEvent.EventDate)
                .Select(g => g.TicketEvent.Ticket)
                .ToList(); 
        }

        public TicketEventNotification MarkNotificationAsRead(string userId, int ticketId)
        {
            return ApplicationContext.TicketEventNotifications
                .Where(c => c.SubscriberId == userId && c.TicketId == ticketId).FirstOrDefault();
        }

        public IEnumerable<TicketEventNotification> ClearNotifications(string userId)
        {
            return ApplicationContext.TicketEventNotifications
                .Where(c => c.SubscriberId == userId).ToList();
        }

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
