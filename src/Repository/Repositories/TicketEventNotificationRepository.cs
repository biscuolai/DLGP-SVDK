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
            return ApplicationContext.TicketEventNotifications
                .Where(c => c.SubscriberId == id && c.IsRead == false && c.IsNew == true)
                .OrderByDescending(c => c.TicketEvent.EventDate)
                .Select(g => g.TicketEvent.Ticket)
                .ToList(); 
        }

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
