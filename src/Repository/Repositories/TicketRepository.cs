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
                .Include(c => c.Subscribers)
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

        public IOrderedEnumerable<Ticket> GetAllTickets()
        {
            //var users = from user in ApplicationContext.Users
            //            where user.EmailConfirmed == true
            //            select user.UserName;

            var allTickets = ApplicationContext.Tickets.Include(c => c.Project)
                .Include(c => c.ConfigurationItem)
                .Include(c => c.Status)
                .Include(c => c.ContactType)
                .Include(c => c.Priority)
                .Include(c => c.Category)
                //.Include(c => c.AssignedUser).Where(x => x.AssignedTo == x.AssignedUser.Id)
                //.OrderByDescending(c => c.Priority)
                .ToList();

            return allTickets.OrderByDescending(c => c.Priority);
        }

        public Ticket GetTicket(int id)
        {
            return ApplicationContext.Tickets.Include(c => c.Project)
                .Include(c => c.ConfigurationItem)
                .Include(c => c.Status)
                .Include(c => c.ContactType)
                .Include(c => c.Priority)
                .Include(c => c.Category)
                //.OrderByDescending(c => c.Priority)
                .Where(c => c.TicketId == id).FirstOrDefault();
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

        public void EnsureSubscribers(Ticket ticket)
        {
            EnsureSubscriber(ticket.TicketId, ticket.Owner);
            EnsureSubscriber(ticket.TicketId, ticket.AssignedTo);
            EnsureSubscriber(ticket.TicketId, ticket.PreviousOwner);
            EnsureSubscriber(ticket.TicketId, ticket.PreviousAssignedUser);
        }

        public void EnsureSubscriber(int id, string user)
        {
            if (user != null && !ApplicationContext.TicketSubscribers.Any(s => s.SubscriberId == user && s.TicketId == id))
            {
                ApplicationContext.TicketSubscribers.Add(new TicketSubscriber() { SubscriberId = user, TicketId = id });
            }
        }

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
