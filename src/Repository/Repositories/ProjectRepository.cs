using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Repository.Persistence;
using DLGP_SVDK.Model.Extensions;

namespace DLGP_SVDK.Repository.Repositories
{
    public class ProjectRepository : Repository<Project>, IProjectRepository
    {
        public ProjectRepository(ApplicationDbContext context) : base(context)
        {
        }

        public Project GetProjectWithTickets(int id)
        {
            //todo: fix this.
            return AppContext.Projects.Find(id);
        }

        public ApplicationDbContext AppContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
