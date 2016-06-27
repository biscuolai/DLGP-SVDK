using System.Collections.Generic;

namespace DLGP_SVDK.Model.Domain.Entities
{
    public class DashboardMonthly
    {
        public List<string> Status { get; set; }
        public List<string> Month { get; set; }
        public List<int> Value { get; set; }

        public DashboardMonthly()
        {
            Status = new List<string>();
            Month = new List<string>();
            Value = new List<int>();
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
