using System;
using System.ComponentModel.DataAnnotations;

namespace DLGP_SVDK.Model.Domain.Entities
{
    public enum TicketActivity
    {
        None = 0,

        [Display(Name = "AddComment", ResourceType = typeof(String))]
        AddComment = 1,

        [Display(Name = "SupplyMoreInfo", ResourceType = typeof(String))]
        SupplyMoreInfo = 2,

        [Display(Name = "CancelMoreInfo", ResourceType = typeof(String))]
        CancelMoreInfo = 4,

        [Display(Name = "Cancel", ResourceType = typeof(String))]
        Cancel = 6,

        [Display(Name = "RequestMoreInfo", ResourceType = typeof(String))]
        RequestMoreInfo = 8,

        [Display(Name = "TakeOver", ResourceType = typeof(String))]
        TakeOver = 16,

        [Display(Name = "Resolve", ResourceType = typeof(String))]
        Resolve = 32,

        [Display(Name = "Assign", ResourceType = typeof(String))]
        Assign = 64,

        [Display(Name = "ReAssign", ResourceType = typeof(String))]
        ReAssign = 128,

        [Display(Name = "Pass", ResourceType = typeof(String))]
        Pass = 256,

        [Display(Name = "Close", ResourceType = typeof(String))]
        Close = 512,

        [Display(Name = "ReOpen", ResourceType = typeof(String))]
        ReOpen = 1024,

        [Display(Name = "GiveUp", ResourceType = typeof(String))]
        GiveUp = 2048,

        [Display(Name = "ForceClose", ResourceType = typeof(String))]
        ForceClose = 4096,

        [Display(Name = "EditAttachments", ResourceType = typeof(String))]
        ModifyAttachments = 8192,

        [Display(Name = "Edit", ResourceType = typeof(String))]
        EditTicketInfo = 16384,

        [Display(Name = "Create", ResourceType = typeof(String))]
        Create = 32768,

        [Display(Name = "CreateOnBehalfOf", ResourceType = typeof(String))]
        CreateOnBehalfOf = 65536
    }
}
