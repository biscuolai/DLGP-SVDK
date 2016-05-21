using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Repository.Persistence;
using System.Collections.Generic;
using System.Linq;

namespace DLGP_SVDK.Repository.Repositories
{
    public class ConfigurationItemRepository : Repository<TicketConfigurationItem>, IConfigurationItemRepository
    {
        public ConfigurationItemRepository(ApplicationDbContext context) : base(context)
        {
        }
        public IEnumerable<TicketConfigurationItem> GetConfigurationItemList()
        {
            return ApplicationContext.ConfigurationItems.OrderBy(c => c.Order).ToList();
        }

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
