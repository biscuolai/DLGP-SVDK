using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Repository.Persistence;
using System.Collections.Generic;
using System.Linq;

namespace DLGP_SVDK.Repository.Repositories
{
    public class LookupValueRepository : Repository<LookupValue>, ILookupValueRepository
    {
        public LookupValueRepository(ApplicationDbContext context) : base(context)
        {
        }
        public IEnumerable<LookupValue> GetLookupValueList(LookupValueType id)
        {
            return ApplicationContext.LookupValues.OrderBy(c => c.Order).Where(x => x.LookupType == id).ToList();
        }

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
