using DLGP_SVDK.Model.Domain.Common;
using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Repository.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using DLGP_SVDK.Repository.Common;

namespace DLGP_SVDK.Repository.Repositories
{
    public class TicketEventRepository : Repository<TicketEvent>, ITicketEventRepository
    {
        public TicketEventRepository(ApplicationDbContext context) : base(context)
        {
        }

        public string GetUserInfo(TicketEvent ticketEvent)
        {
            //var userManager = DependencyResolver.Current.GetService<TicketDeskUserManager>();
            //return userManager.GetUserInfo(ticketEvent.EventBy);
            //var userManager = DependencyResolver.Current.GetService<TicketDeskUserManager>();
            //var user = new UserProfile();
            //return await user.DisplayNameById(ticketEvent.EventBy);
            //return await DisplayNameById(ticketEvent.EventBy);
            return null;
        }

        public IEnumerable<TicketEvent> GetTicketEventList()
        {
            return ApplicationContext.TicketEvents.OrderBy(c => c.EventDate).ToList();
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
