using DLGP_SVDK.Repository.Repositories;

namespace DLGP_SVDK.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            Projects = new ProjectRepository(_context);
            Tickets = new TicketRepository(_context);
            LookupValues = new LookupValueRepository(_context);
            Categories = new CategoryRepository(_context);
            ConfigurationItems = new ConfigurationItemRepository(_context);
        }

        public IProjectRepository Projects { get; private set; }
        public ITicketRepository Tickets { get; private set; }
        public ILookupValueRepository LookupValues { get; private set; }
        public ICategoryRepository Categories { get; private set; }
        public IConfigurationItemRepository ConfigurationItems { get; private set; }

        public int Commit()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
