using System;

namespace DLGP_SVDK.Api.ViewModels
{
    public class TicketViewModel
    {
        public int ProjectId { get; set; }
        public int ContactTypeId { get; set; }
        public int CategoryId { get; set; }
        public int ConfigurationItemId { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public string TagList { get; set; }
        public string CreatedBy { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public string Owner { get; set; }
        public string AssignedTo { get; set; }
        public int TicketStatusId { get; set; }
        public DateTimeOffset CurrentStatusDate { get; set; }
        public string CurrentStatusSetBy { get; set; }
        public string LastUpdateBy { get; set; }
        public DateTimeOffset LastUpdateDate { get; set; }
        public int PriorityId { get; set; }
    }
}
