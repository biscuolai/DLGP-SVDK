using System.Collections.Generic;
using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Model.Repositories;

namespace DLGP_SVDK.Repository
{
    public interface IDashboardRepository : IRepository<Dashboard>
    {
        Dashboard GetDashboardData();
    }
}
