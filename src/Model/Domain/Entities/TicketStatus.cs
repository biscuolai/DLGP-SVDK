using System;
using System.ComponentModel.DataAnnotations;

namespace DLGP_SVDK.Model.Domain.Entities
{
    public enum TicketStatus
    {
        [Display(Name = "TicketStatusActive", ResourceType = typeof(String))]
        Active,
        [Display(Name = "TicketStatusMoreInfo", ResourceType = typeof(String))]
        MoreInfo,
        [Display(Name = "TicketStatusResolved", ResourceType = typeof(String))]
        Resolved,
        [Display(Name = "TicketStatusClosed", ResourceType = typeof(String))]
        Closed
    }
}
