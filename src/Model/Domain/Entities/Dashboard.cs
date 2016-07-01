using System.Collections.Generic;

namespace DLGP_SVDK.Model.Domain.Entities
{
    public class DashboardTicket
    {
        public string Name { get; set; }
        public List<string> Months { get; set; }
        public List<string> Values { get; set; }

        public DashboardTicket()
        {
            Months = new List<string>();
            Values = new List<string>();
        }
    }

    public class DashboardMonthly
    {
        public List<DashboardTicket> TicketSummary { get; set; }

        public DashboardMonthly()
        {
            TicketSummary = new List<DashboardTicket>();
        }
    }

    public class Dashboard
    {
        public int New { get; set; }
        public int Open { get; set; }
        public int OnHold { get; set; }
        public int Pending { get; set; }
        public int Resolved { get; set; }
        public int Cancelled { get; set; }
        public int Closed { get; set; }
        public DashboardMonthly DashboardMonthlyData { get; set; }
        public Dashboard()
        {
            DashboardMonthlyData = new DashboardMonthly();
        }
    }
}
