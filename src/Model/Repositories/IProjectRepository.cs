using TestApp.Model.Repositories;
using TestApp.Model.Domain.Entities;

namespace TestApp.Repository
{
    public interface IProjectRepository : IRepository<Project>
    {
        Project GetProjectWithTickets(int id);
    }
}
