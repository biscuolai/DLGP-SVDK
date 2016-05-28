using System.Collections.Generic;
using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Model.Repositories;

namespace DLGP_SVDK.Repository
{
    public interface ITicketRepository : IRepository<Ticket>
    {
        IEnumerable<Ticket> GetTopUrgentTickets(int count);
        IEnumerable<Ticket> GetAllAssignedTickets(int pageIndex, int pageSize);
        int GetId(Ticket ticket);
        Ticket Reload(int id);
    }
}
