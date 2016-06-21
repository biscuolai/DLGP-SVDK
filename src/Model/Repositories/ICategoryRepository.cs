using DLGP_SVDK.Model.Repositories;
using DLGP_SVDK.Model.Domain.Entities;
using System.Collections.Generic;

namespace DLGP_SVDK.Repository
{
    public interface ICategoryRepository : IRepository<TicketCategory>
    {
        IEnumerable<TicketCategory> GetCategoryList();
        string GetNameById(int id);
    }
}
