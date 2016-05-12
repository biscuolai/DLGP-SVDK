using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Repository.Persistence;
using Microsoft.Data.Entity;
using System.Collections.Generic;
using System.Linq;

namespace DLGP_SVDK.Repository.Repositories
{
    public class TicketRepository : Repository<Ticket>, ITicketRepository
    {
        public TicketRepository(ApplicationDbContext context) : base(context)
        {
        }
        public IEnumerable<Ticket> GetTopUrgentTickets(int count)
        {
            return ApplicationContext.Tickets.OrderByDescending(c => c.Priority).Take(count).ToList();
        }

        public IEnumerable<Ticket> GetAllAssignedTickets(int pageIndex, int pageSize = 10)
        {
            return ApplicationContext.Tickets
                .Include(c => c.Project)
                .OrderBy(c => c.AssignedTo)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
