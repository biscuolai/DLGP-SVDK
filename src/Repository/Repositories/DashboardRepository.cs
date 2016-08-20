﻿using DLGP_SVDK.Model.Domain.Entities;
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

            // Group by month - created tickets - all statuses - last 6 months data
            var groupAllTickets = ApplicationContext.Tickets
                .Include(c => c.Status).ToList()
                .Where(c => c.CreatedDate > DateTime.Now.AddMonths(-6))
                .GroupBy(x => new { x.Status.Name, x.CreatedDate.Month })
                .Select(g => new {
                    g.Key,
                    Count = g.Count(),
                    Status = g.First().Status.Name,
                    g.First().CreatedDate.Month,
                    g.First().CreatedDate.Year
                });

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
                else if (item.Name == "Pending - Request for Information")
                {
                    summary.Pending = item.Count;
                }
                else if (item.Name == "Resolved")
                {
                    summary.Resolved = item.Count;
                }
                else if (item.Name == "Cancelled")
                {
                    summary.Cancelled = item.Count;
                }
                else if (item.Name == "Closed")
                {
                    summary.Closed = item.Count;
                }
            }

            string[] statuses = { "New", "Open", "Pending", "Resolved", "Cancelled", "Closed" };

            for (int s = 0; s < statuses.Length; s++)
            {
                var dt = new DashboardTicket();
                dt.Name = statuses[s];
                for (int i = -6; i < 0; i++)
                {
                    dt.Months.Add(mfi.GetMonthName(DateTime.Now.AddMonths(i).Month));
                    dt.Values.Add("0");
                }
                summary.DashboardMonthlyData.TicketSummary.Add(dt);
            }

            // loop to get the lotal for the last 6 months grouping by ticket status
            foreach (var item in groupAllTickets)
            {
                foreach (var s in summary.DashboardMonthlyData.TicketSummary)
                {
                    // if there is a match in the status name 
                    if ((item.Status == s.Name) || (item.Status.StartsWith(s.Name))) 
                    {
                        var index = s.Months.IndexOf(mfi.GetMonthName(item.Month));
                        if (index >= 0)
                        {
                            s.Values[index] = item.Count.ToString();
                        }
                    }
                }

                //summary.DashboardMonthlyData.Status.Add(item.Status);
                //summary.DashboardMonthlyData.Month.Add(mfi.GetMonthName(item.Month).ToString() + @"/" + item.Year.ToString());
                //summary.DashboardMonthlyData.Value.Add(item.Count);
            }

            return summary;
        }

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}