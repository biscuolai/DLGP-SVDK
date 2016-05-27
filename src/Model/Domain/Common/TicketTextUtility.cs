using DLGP_SVDK.Model.Domain.Entities;
using System;

namespace DLGP_SVDK.Model.Domain.Common
{
    public static class TicketTextUtility
    {
        /// <summary>
        /// Gets the comment event text.
        /// </summary>
        /// <param name="ticketEvent">The ticket event of which to fetch the comment event.</param>
        /// <param name="newPriority">The new priority, leave null if priority change isn't applicable for the activity.</param>
        /// <param name="userName">Name of the user, leave null if a user name isn't applicable for the actiity</param>
        /// <returns>System.String.</returns>
        /// <exception cref="System.NullReferenceException"></exception>
        public static string GetTicketEventDescription(TicketActivity ticketEvent, string newPriority, string userName)
        {
            var activity = "Event: " + Enum.GetName(typeof(TicketActivity), ticketEvent);
            //var pval = "";
            //var val = Strings.ResourceManager.GetString("TicketActivity" + n);
            //var pval = Strings.ResourceManager.GetString("TicketActivityPriority");
            //if (string.IsNullOrEmpty(val) || string.IsNullOrEmpty(pval))
            //{
            //    throw new NullReferenceException();
            //}
            if (!string.IsNullOrEmpty(userName))
            {
                activity += " - User: " + userName;
            }
            if (!string.IsNullOrEmpty(newPriority))
            {
                activity += " - Priority: " + newPriority;
            }
            return activity;
        }
    }
}
