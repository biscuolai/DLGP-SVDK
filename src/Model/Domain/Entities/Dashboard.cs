using System.Collections.Generic;

namespace DLGP_SVDK.Model.Domain.Entities
{
    public class TotalMonthly
    {
        public List<string> month { get; set; }
        public List<int> total { get; set; }
    }

    public class Dashboard
    {
        private TotalMonthly _totalMonthly = null;

        public int New { get; set; }
        public int Open { get; set; }
        public int Pending { get; set; }
        public int Closed { get; set; }

        public TotalMonthly TotalMonthly
        {
            get { return _totalMonthly; }
            set
            {
                _totalMonthly = value;
            }
        }

        public Dashboard()
        {
            _totalMonthly = new TotalMonthly();
        }
    }
}
