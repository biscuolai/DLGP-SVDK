using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Repository.Persistence;
using System.Collections.Generic;
using System.Linq;

namespace DLGP_SVDK.Repository.Repositories
{
    public class ContactTypeRepository : Repository<TicketContactType>, IContactTypeRepository
    {
        public ContactTypeRepository(ApplicationDbContext context) : base(context)
        {
        }
        public IEnumerable<TicketContactType> GetContactTypeList()
        {
            return ApplicationContext.TicketContactTypes.OrderBy(c => c.Order).ToList();
        }

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
