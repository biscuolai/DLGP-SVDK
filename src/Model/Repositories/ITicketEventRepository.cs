using DLGP_SVDK.Model.Repositories;
using DLGP_SVDK.Model.Domain.Entities;
using System.Collections.Generic;

namespace DLGP_SVDK.Repository
{
    public interface ITicketEventRepository : IRepository<TicketEvent>
    {
        IEnumerable<TicketEvent> GetAllEventsByTicketId(int id);
        TicketEvent CreateActivityEvent(int ticketId, string eventByUserId, TicketActivity activity, string comment, string newPriority, string userName, string newStatus);
        void CreateSubscriberEventNotifications(TicketEvent ticketEvent);
        int GetId(TicketEvent ticketEvent);
        TicketEvent Reload(int id);
    }
}
