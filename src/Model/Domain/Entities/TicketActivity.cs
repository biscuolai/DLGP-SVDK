using System;
using System.ComponentModel.DataAnnotations;

namespace DLGP_SVDK.Model.Domain.Entities
{

    [Flags]
    public enum TicketActivity
    {
        None = 0,
        
        [Display(Name = "TicketActivity_Comment", ResourceType = typeof(String))]
        AddComment = 1,
        
        [Display(Name = "TicketActivity_ProvideInfo", ResourceType = typeof(String))]
        SupplyMoreInfo = 2,

        [Display(Name = "TicketActivity_CancelMoreInfo", ResourceType = typeof(String))]
        CancelMoreInfo = 4,
        
        [Display(Name = "TicketActivity_RequestMoreInfo", ResourceType = typeof(String))]
        RequestMoreInfo = 8,

        [Display(Name = "TicketActivity_TakeOver", ResourceType = typeof(String))]
        TakeOver = 16,
        
        [Display(Name = "TicketActivity_Resolve", ResourceType = typeof(String))]
        Resolve = 32,

        [Display(Name = "TicketActivity_Assign", ResourceType = typeof(String))]
        Assign = 64,

        [Display(Name = "TicketActivity_ReAssign", ResourceType = typeof(String))]
        ReAssign = 128,

        [Display(Name = "TicketActivity_Pass", ResourceType = typeof(String))]
        Pass = 256,

        [Display(Name = "TicketActivity_Close", ResourceType = typeof(String))]
        Close = 512,
        
        [Display(Name = "TicketActivity_ReOpen", ResourceType = typeof(String))]
        ReOpen = 1024,

        [Display(Name = "TicketActivity_GiveUp", ResourceType = typeof(String))]
        GiveUp = 2048,
        
        [Display(Name = "TicketActivity_ForceClose", ResourceType = typeof(String))]
        ForceClose = 4096,

        [Display(Name = "TicketActivity_EditAttachments", ResourceType = typeof(String))]
        ModifyAttachments = 8192,

        [Display(Name = "TicketActivity_Edit", ResourceType = typeof(String))]
        EditTicketInfo = 16384,

        [Display(Name = "TicketActivity_Create", ResourceType = typeof(String))]
        Create = 32768,

        [Display(Name = "TicketActivity_CreateOnBehalfOf", ResourceType = typeof(String))]
        CreateOnBehalfOf = 65536
    }


}
