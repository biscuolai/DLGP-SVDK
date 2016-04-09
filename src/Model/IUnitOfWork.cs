using System;

namespace TestApp.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        IProjectRepository Projects { get; }
        ITicketRepository Tickets { get; }

        /// <summary>
        /// Saves all pending changes
        /// </summary>
        /// <returns>The number of objects in an Added, Modified, or Deleted state</returns>
        int Commit();
    }
}
