using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Repository.Persistence;
using System.Collections.Generic;
using System.Linq;

namespace DLGP_SVDK.Repository.Repositories
{
    public class CategoryRepository : Repository<TicketCategory>, ICategoryRepository
    {
        public CategoryRepository(ApplicationDbContext context) : base(context)
        {
        }
        public IEnumerable<TicketCategory> GetCategoryList()
        {
            return ApplicationContext.Categories.OrderBy(c => c.Order).ToList();
        }

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
