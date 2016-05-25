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

        public IEnumerable<Ticket> GetDashboardData()
        {
            //return null;
            //var totals = ApplicationContext.Tickets.GroupBy(x =>
            //    new { x.TicketStatusId }).Select(y =>
            //          y.Sum(i => i.TicketStatusId == ));

            //var groupsForIterate = data.GroupBy(x =>
            //    new { x.Name, x.City, x.ZipCode });


            var countNew = ApplicationContext.Tickets.Where(x => x.Status.Name == "New").Count();
            //var month = ApplicationContext.Tickets.Where(x => x.CreatedDate); 

            var dashBoardSummary = from b in ApplicationContext.Tickets
                                   group b by b.Status.Name into g
                                   let newTickets = g.Count()
                                   select new
                                   {
                                       Owner = g.Key,
                                       Tickets = newTickets
                                   };


            return null;
        }

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
