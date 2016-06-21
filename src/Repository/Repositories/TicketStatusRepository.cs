using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Repository.Persistence;
using System.Collections.Generic;
using System.Linq;

namespace DLGP_SVDK.Repository.Repositories
{
    public class TicketStatusRepository : Repository<TicketStatus>, ITicketStatusRepository
    {
        public TicketStatusRepository(ApplicationDbContext context) : base(context)
        {
        }
        public List<TicketStatus> GetTicketStatusList()
        {
            return ApplicationContext.TicketStatuses.OrderBy(c => c.Order).ToList();
        }

        public TicketStatus GetStatusByName(string name)
        {
            return ApplicationContext.TicketStatuses.Where(c => c.Name.ToUpper() == name.ToUpper()).First();
        }

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
