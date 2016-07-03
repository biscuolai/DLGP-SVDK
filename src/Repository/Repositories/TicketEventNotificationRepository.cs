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

        public IEnumerable<TicketEventNotification> GetAllNotificationsByUserId(string id)
        {
            return ApplicationContext.TicketEventNotifications
                .Where(c => c.SubscriberId == id)
                .OrderByDescending(c => c.TicketEvent.EventDate)
                .ToList();
        }

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
