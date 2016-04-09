using TestApp.Model.Domain.Entities;
using TestApp.Repository.Persistence;

namespace TestApp.Repository.Repositories
{
    public class ProjectRepository : Repository<Project>, IProjectRepository
    {
        public ProjectRepository(ApplicationDbContext context) : base(context)
        {
        }

        public Project GetProjectWithTickets(int id)
        {
            return null;
            //todo: fix this.
            //return ServiceDeskContext.Projects.Find(id);
        }

        public ApplicationDbContext ServiceDeskContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
