using System.Collections.Generic;
using TestApp.Model.Domain.Entities;
using TestApp.Model.Repositories;

namespace TestApp.Repository
{
    public interface ITicketRepository : IRepository<Ticket>
    {
        IEnumerable<Ticket> GetTopUrgentTickets(int count);
        IEnumerable<Ticket> GetAllAssignedTickets(int pageIndex, int pageSize);
    }
}
