using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Repository.Persistence;
using Microsoft.Data.Entity;
using System;
using System.Linq;

namespace DLGP_SVDK.Repository.Repositories
{
    public class DashboardRepository : Repository<Dashboard>, IDashboardRepository
    {
        public DashboardRepository(ApplicationDbContext context) : base(context)
        {
        }
        public Dashboard GetDashboardData()
        {
            var summary = new Dashboard();

            System.Globalization.DateTimeFormatInfo mfi = new System.Globalization.DateTimeFormatInfo();

            // Group by ticket status
            var groupStatus = ApplicationContext.Tickets
                .Include(c => c.Status).ToList()
                .GroupBy(x => x.TicketStatusId)
                .Select(g => new { g.Key, Count = g.Count(), g.First().Status.Name });

            // Group by month - created tickets - status equals to New - last 6 months data
            var groupNewTickets = ApplicationContext.Tickets
                .Where(c => c.CreatedDate > DateTime.Now.AddMonths(-6))
                .GroupBy(x => x.CreatedDate.Month)
                .Select(g => new { g.Key, Count = g.Count(), g.First().CreatedDate.Year });

            // loop to get the total for all new, open, pending and closed tickets
            foreach (var item in groupStatus)
            {
                if (item.Name == "New")
                {
                    summary.New = item.Count;
                }
                else if (item.Name == "Open")
                {
                    summary.Open = item.Count;
                }
                else if (item.Name == "Pending - On Hold")
                {
                    summary.OnHold = item.Count;
                }
                else if (item.Name.Contains("Pending"))
                {
                    summary.Pending = item.Count;
                }
                else if (item.Name == "Closed")
                {
                    summary.Closed = item.Count;
                }
            }

            // loop to get the lotal for the last 6 months grouping by ticket status
            foreach (var item in groupNewTickets)
            {
                summary.DashboardMonthlyData.Month.Add(mfi.GetMonthName(item.Key).ToString() + @"/" + item.Year.ToString());
                summary.DashboardMonthlyData.Value.Add(item.Count);
            }

            return summary;
        }

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
