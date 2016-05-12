using DLGP_SVDK.Model.Repositories;
using DLGP_SVDK.Model.Domain.Entities;

namespace DLGP_SVDK.Repository
{
    public interface IProjectRepository : IRepository<Project>
    {
        Project GetProjectWithTickets(int id);
    }
}
