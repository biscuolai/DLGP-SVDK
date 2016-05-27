using DLGP_SVDK.Model.Repositories;
using DLGP_SVDK.Model.Domain.Entities;
using System.Collections.Generic;

namespace DLGP_SVDK.Repository
{
    public interface ITicketEventRepository : IRepository<TicketEvent>
    {
        IEnumerable<TicketEvent> GetTicketEventList();
        TicketEvent CreateActivityEvent(string eventByUserId, TicketActivity activity, string comment, string newPriority, string userName);
    }
}
