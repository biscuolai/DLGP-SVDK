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

        public int GetId(Ticket ticket)
        {
            return ApplicationContext.Entry(ticket).Entity.TicketId;
        }

        public Ticket Reload(int id)
        {
            return ApplicationContext.Tickets
                .Include(c => c.Project)
                .Include(c => c.ConfigurationItem)
                .Include(c => c.Status)
                .Include(c => c.ContactType)
                .Include(c => c.Priority)
                .Include(c => c.Category)
                .First(x => x.TicketId == id);
        }

        public IEnumerable<Ticket> GetTopUrgentTickets(int count)
        {
            return ApplicationContext.Tickets.Include(c => c.Project)
                .Include(c => c.ConfigurationItem)
                .Include(c => c.Status)
                .Include(c => c.ContactType)
                .Include(c => c.Priority)
                .Include(c => c.Category)
                .OrderByDescending(c => c.Priority).Take(count)
                .ToList();
        }

        public IEnumerable<Ticket> GetAllTickets()
        {
            return ApplicationContext.Tickets.Include(c => c.Project)
                .Include(c => c.ConfigurationItem)
                .Include(c => c.Status)
                .Include(c => c.ContactType)
                .Include(c => c.Priority)
                .Include(c => c.Category)
                .Include(c => c.Events)
                //.OrderByDescending(c => c.Priority)
                .ToList();
        }

        public IEnumerable<Ticket> GetTicket(int id)
        {
            return ApplicationContext.Tickets.Include(c => c.Project)
                .Include(c => c.ConfigurationItem)
                .Include(c => c.Status)
                .Include(c => c.ContactType)
                .Include(c => c.Priority)
                .Include(c => c.Category)
                .Include(c => c.Events)
                //.OrderByDescending(c => c.Priority)
                .Where(c => c.TicketId == id)
                .ToList();
        }

        public IEnumerable<Ticket> GetAllTicketsLimitedByPage(int pageIndex, int pageSize = 10)
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
