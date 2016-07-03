using System.Collections.Generic;
using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Model.Repositories;
using System.Linq;

namespace DLGP_SVDK.Repository
{
    public interface ITicketRepository : IRepository<Ticket>
    {
        IEnumerable<Ticket> GetTopUrgentTickets(int count);
        IEnumerable<Ticket> GetAllTickets();
        Ticket GetTicket(int id);
        IEnumerable<Ticket> GetAllTicketsLimitedByPage(int pageIndex, int pageSize = 10);
        int GetId(Ticket ticket);
        Ticket Reload(int id);
        //void EnsureSubscribers(Ticket ticket);
        //void EnsureSubscriber(int id, string user);
    }
}
