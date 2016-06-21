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
            return ApplicationContext.TicketConfigurationItems.OrderBy(c => c.Order).ToList();
        }

        public string GetNameById(int id)
        {
            return ApplicationContext.TicketConfigurationItems.Where(c => c.ConfigurationItemId == id).First().Name;
        }

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
