using DLGP_SVDK.Model.Domain.Common;
using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Repository.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using DLGP_SVDK.Repository.Common;
using Microsoft.Data.Entity;

namespace DLGP_SVDK.Repository.Repositories
{
    public class TicketEventRepository : Repository<TicketEvent>, ITicketEventRepository
    {
        public TicketEventRepository(ApplicationDbContext context) : base(context)
        {
        }

        public IEnumerable<TicketEvent> GetAllEventsByTicketId(int id)
        {
            return ApplicationContext.TicketEvents
                .Where(c => c.TicketId == id)
                .ToList();
        }

        /// <summary>
        /// Creates the activity event.
        /// </summary>
        /// <param name="eventByUserId">The event by user identifier.</param>
        /// <param name="activity">The activity.</param>
        /// <param name="comment">The comment.</param>
        /// <param name="newPriority">The new priority.</param>
        /// <param name="userName">Name of the user.</param>
        /// <returns>TicketEvent.</returns>
        public TicketEvent CreateActivityEvent(
            int ticketId,
            string eventByUserId,
            TicketActivity activity,
            string comment,
            string newPriority,
            string userName
            )
        {
            var tc = new TicketEvent
            {
                TicketId = ticketId,
                Comment = comment,
                EventBy = eventByUserId,
                EventDate = DateTime.Now,
                EventDescription = TicketTextUtility.GetTicketEventDescription(activity, newPriority, userName)
            };
            return tc;
        }
        
        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
