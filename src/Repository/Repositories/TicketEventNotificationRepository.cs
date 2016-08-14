using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Repository.Persistence;
using Microsoft.Data.Entity;
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

        public IEnumerable<TicketEventNotification> GetAllNotificationsByUserId(string id)
        {
            return ApplicationContext.TicketEventNotifications
                .Where(c => c.SubscriberId == id)
                .OrderByDescending(c => c.TicketEvent.EventDate)
                .ToList(); 
        }

        public TicketEventNotification MarkNotificationAsRead(string userId, int ticketId)
        {
            return ApplicationContext.TicketEventNotifications
                .Where(c => c.SubscriberId == userId && c.TicketId == ticketId).FirstOrDefault();
        }

        public IEnumerable<TicketEventNotification> AllNotificationsByUser(string userId)
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
