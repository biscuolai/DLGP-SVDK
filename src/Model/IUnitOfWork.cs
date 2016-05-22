using System;

namespace DLGP_SVDK.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        IProjectRepository Projects { get; }
        ITicketRepository Tickets { get; }
        ILookupValueRepository LookupValues { get; }
        ICategoryRepository Categories { get; }
        IConfigurationItemRepository ConfigurationItems { get; }
        IContactTypeRepository ContactTypes { get; }
        IPriorityRepository Priorities { get; }
        ITicketStatusRepository TicketStatuses { get; }

        /// <summary>
        /// Saves all pending changes
        /// </summary>
        /// <returns>The number of objects in an Added, Modified, or Deleted state</returns>
        int Commit();
    }
}
