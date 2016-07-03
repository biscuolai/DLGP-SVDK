using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using Microsoft.Data.Entity.Metadata.Internal;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;
using DLGP_SVDK.Model.Domain.Entities.Identity;

namespace DLGP_SVDK.Model.Domain.Entities
{
    [Table("Ticket")]
    public class Ticket
    {
        public Ticket()
        {
            // ReSharper disable DoNotCallOverridableMethodsInConstructor
            Events = new HashSet<TicketEvent>();
            //Subscribers = new HashSet<TicketSubscriber>();
            Tags = new HashSet<TicketTag>();
            // ReSharper restore DoNotCallOverridableMethodsInConstructor
        }
        [Key]
        [Display(ResourceType = typeof(String), Name = "TicketId", ShortName = "TicketIdShort")]
        public int TicketId { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Display(ResourceType = typeof(String), Name = "TicketProject", ShortName = "TicketProjectShort")]
        public int ProjectId { get; set; }


        [Required(ErrorMessageResourceName = "FieldRequired")]
        [Display(ResourceType = typeof(int), Name = "TicketContactTypeId", ShortName = "TicketContactTypeShort")]
        public int ContactTypeId { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [Display(ResourceType = typeof(int), Name = "TicketCategoryId", ShortName = "TicketCategoryShort")]
        public int CategoryId { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [Display(ResourceType = typeof(int), Name = "ConfigurationItemId", ShortName = "ConfigurationItemShort")]
        public int ConfigurationItemId { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [Display(ResourceType = typeof(int), Name = "TicketPriorityId", ShortName = "TicketPriorityShort")]
        public int PriorityId { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [Display(ResourceType = typeof(String), Name = "TicketStatus", ShortName = "TicketStatusShort")]
        public int TicketStatusId { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [StringLength(500, ErrorMessageResourceName = "FieldMaximumLength")]
        [Display(ResourceType = typeof(String), Name = "TicketTitle", ShortName = "TicketTitleShort")]
        public string Title { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [Display(ResourceType = typeof(String), Name = "TicketDetails", ShortName = "TicketDetailsShort")]
        public string Details { get; set; }

        [StringLength(100, ErrorMessageResourceName = "FieldMaximumLength")]
        [Display(ResourceType = typeof(String), Name = "TicketTagList", ShortName = "TicketTagListShort")]
        public string TagList { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [StringLength(256, ErrorMessageResourceName = "FieldMaximumLength")]
        [Display(ResourceType = typeof(String), Name = "TicketCreatedBy", ShortName = "TicketCreatedByShort")]
        public string CreatedBy { get; set; }

        [Display(ResourceType = typeof(String), Name = "TicketCreatedDate", ShortName = "TicketCreatedDateShort")]
        public DateTimeOffset CreatedDate { get; set; }

        private string _owner;


        [Required(ErrorMessageResourceName = "FieldRequired")]
        [StringLength(256, ErrorMessageResourceName = "FieldMaximumLength")]
        [Display(ResourceType = typeof(String), Name = "TicketOwner", ShortName = "TicketOwnerShort")]
        public string Owner
        {
            get
            {
                return _owner;
            }
            set
            {
                PreviousOwner = _owner;
                _owner = value;
            }
        }

        private string _assignedTo;

        [StringLength(256, ErrorMessageResourceName = "FieldMaximumLength")]
        [Display(ResourceType = typeof(String), Name = "TicketAssignedTo", ShortName = "TicketAssignedToShort")]
        public string AssignedTo
        {
            get
            {
                return _assignedTo;
            }
            set
            {
                PreviousAssignedUser = _assignedTo;
                _assignedTo = value;
            }
        }

        [Display(ResourceType = typeof(String), Name = "TicketCurrentStatusDate", ShortName = "TicketCurrentStatusDateShort")]
        public DateTimeOffset CurrentStatusDate { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [StringLength(256, ErrorMessageResourceName = "FieldMaximumLength")]
        [Display(ResourceType = typeof(String), Name = "TicketCurrentStatusSetBy", ShortName = "TicketCurrentStatusSetByShort")]
        public string CurrentStatusSetBy { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [StringLength(256, ErrorMessageResourceName = "FieldMaximumLength")]
        [Display(ResourceType = typeof(String), Name = "TicketLastUpdateBy", ShortName = "TicketLastUpdateByShort")]
        public string LastUpdateBy { get; set; }

        [Display(ResourceType = typeof(String), Name = "TicketLastUpdateDate", ShortName = "TicketLastUpdateDateShort")]
        public DateTimeOffset LastUpdateDate { get; set; }

        [Column(TypeName = "timestamp")]
        [MaxLength(8)]
        [Timestamp]
        public byte[] Version { get; set; }

        public virtual Project Project { get; set; }

        public virtual TicketConfigurationItem ConfigurationItem { get; set; }

        public virtual TicketCategory Category { get; set; }

        public virtual TicketPriority Priority { get; set; }

        public virtual TicketStatus Status { get; set; }

        public virtual TicketContactType ContactType { get; set; }

        public virtual ICollection<TicketEvent> Events { get; set; }

        public virtual ICollection<TicketTag> Tags { get; set; }

        //public virtual ICollection<TicketSubscriber> Subscribers { get; set; }

        [NotMapped]
        public string PreviousOwner { get; set; }

        [NotMapped]
        public string PreviousAssignedUser { get; set; }

        /// <summary>
        /// Performs an activity function on the ticket.
        /// </summary>
        /// <param name="ticketAction">The ticket action to perform.</param>
        public void PerformAction(Action<Ticket> ticketAction)
        {
            ticketAction(this);
        }
    }
}
