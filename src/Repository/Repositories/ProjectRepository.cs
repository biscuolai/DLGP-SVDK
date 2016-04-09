using TestApp.Model.Domain.Entities;
using TestApp.Repository.Persistence;
using System.Linq;

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
            //return ApplicationContext.Projects.Where(x => x.ProjectId == this.id);
        }

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
