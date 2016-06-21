using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Repository.Persistence;
using System.Collections.Generic;
using System.Linq;

namespace DLGP_SVDK.Repository.Repositories
{
    public class PriorityRepository : Repository<TicketPriority>, IPriorityRepository
    {
        public PriorityRepository(ApplicationDbContext context) : base(context)
        {
        }
        public IEnumerable<TicketPriority> GetPriorityList()
        {
            return ApplicationContext.TicketPriorities.OrderBy(c => c.Order).ToList();
        }

        public string GetNameById(int id)
        {
            return ApplicationContext.TicketPriorities.Where(c => c.PriorityId == id).First().Name;
        }

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
