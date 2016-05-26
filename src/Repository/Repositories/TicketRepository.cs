using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Repository.Persistence;
using Microsoft.Data.Entity;
using System;
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
            return ApplicationContext.Tickets.Include(c => c.Project)
                .Include(c => c.ConfigurationItem)
                .Include(c => c.Status)
                .Include(c => c.ContactType)
                .Include(c => c.Priority)
                .Include(c => c.Category).ToList();
                //.OrderByDescending(c => c.Priority).Take(count)
                //.Include(l => l.LookupValues.Where(x => x.Id == l.CategoryId && x.Active == true && x.LookupType == LookupValueType.Category)
                //.ToList());
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
