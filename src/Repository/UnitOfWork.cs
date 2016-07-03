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
            Categories = new CategoryRepository(_context);
            ConfigurationItems = new ConfigurationItemRepository(_context);
            Priorities = new PriorityRepository(_context);
            ContactTypes = new ContactTypeRepository(_context);
            TicketStatuses = new TicketStatusRepository(_context);
            TicketEvents = new TicketEventRepository(_context);
            TicketEventNotifications = new TicketEventNotificationRepository(_context);
            DashboardSummary = new DashboardRepository(_context);
        }

        public IProjectRepository Projects { get; private set; }
        public ITicketRepository Tickets { get; private set; }
        public ICategoryRepository Categories { get; private set; }
        public IConfigurationItemRepository ConfigurationItems { get; private set; }
        public IPriorityRepository Priorities { get; private set; }
        public IContactTypeRepository ContactTypes { get; private set; }
        public ITicketStatusRepository TicketStatuses { get; private set; }
        public IDashboardRepository Dashboard { get; private set; }
        public ITicketEventRepository TicketEvents { get; private set; }
        public ITicketEventNotificationRepository TicketEventNotifications { get; private set; }
        public IDashboardRepository DashboardSummary { get; private set; }

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
