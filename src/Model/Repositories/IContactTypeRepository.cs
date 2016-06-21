using DLGP_SVDK.Model.Repositories;
using DLGP_SVDK.Model.Domain.Entities;
using System.Collections.Generic;

namespace DLGP_SVDK.Repository
{
    public interface IContactTypeRepository : IRepository<TicketContactType>
    {
        IEnumerable<TicketContactType> GetContactTypeList();
        string GetNameById(int id);
    }
}
