using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using Microsoft.Data.Entity.Metadata.Internal;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;

namespace DLGP_SVDK.Model.Domain.Entities
{
    [Table("Ticket")]
    public class Ticket
    {
        public Ticket()
        {
            // ReSharper disable DoNotCallOverridableMethodsInConstructor
            Events = new HashSet<TicketEvent>();
            Subscribers = new HashSet<TicketSubscriber>();
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

        public virtual ICollection<TicketSubscriber> Subscribers { get; set; }

        [NotMapped]
        internal string PreviousOwner { get; set; }

        [NotMapped]
        internal string PreviousAssignedUser { get; set; }


        [NotMapped]
        public bool IsAssigned
        {
            get { return !string.IsNullOrEmpty(AssignedTo); }
        }

        [NotMapped]
        public bool IsOpen
        {
            get { return ((Status != null) && (Status.Name != "Resolved") && (Status.Name != "Closed")); }
        }

        public void EnsureSubscribers()
        {
            EnsureSubscriber(Owner);
            EnsureSubscriber(AssignedTo);
            EnsureSubscriber(PreviousOwner);
            EnsureSubscriber(PreviousAssignedUser);
        }

        private void EnsureSubscriber(string user)
        {
            if (user != null && Subscribers.All(s => s.SubscriberId != user))
            {
                Subscribers.Add(new TicketSubscriber() { SubscriberId = user });
            }
        }

        public TicketActivity GetAvailableActivites(string userId)
        {
            var isOwnedByMe = (Owner == userId);
            var isMoreInfo = (Status.Name == "Pending - Request For Information");
            var isAssignedToMe = (!string.IsNullOrEmpty(AssignedTo) && AssignedTo == userId);
            var isResolved = Status.Name == "Resolved";

            var validActivities = TicketActivity.None;

            if (TicketId == default(int))
            {
                validActivities |= TicketActivity.Create | TicketActivity.CreateOnBehalfOf;
            }

            if (IsOpen)
            {
                validActivities |= TicketActivity.ModifyAttachments;
            }

            if (IsOpen)
            {
                if (isOwnedByMe || isAssignedToMe)
                {
                    validActivities |= TicketActivity.EditTicketInfo;
                }
                if (isMoreInfo)
                {
                    validActivities |= TicketActivity.SupplyMoreInfo;
                    if (isAssignedToMe)
                    {
                        validActivities |= TicketActivity.CancelMoreInfo;
                    }
                }
                else //!moreInfo
                {
                    validActivities |= TicketActivity.AddComment;
                    if (isAssignedToMe)
                    {
                        validActivities |= TicketActivity.Resolve | TicketActivity.RequestMoreInfo;
                    }
                }
            }
            else //not open (resolved or closed)
            {
                validActivities |= TicketActivity.ReOpen;
            }
            if (isResolved)
            {
                if (isOwnedByMe)
                {
                    validActivities |= TicketActivity.Close;
                }
            }
            if (IsOpen || isResolved)
            {
                if (IsAssigned)
                {
                    if (!isAssignedToMe)
                    {
                        validActivities |= TicketActivity.ReAssign;
                    }
                }
                else//!assigned
                {
                    validActivities |= TicketActivity.Assign;
                }

                if (isAssignedToMe)
                {
                    validActivities |= TicketActivity.Pass | TicketActivity.GiveUp;
                }
                else//!isAssignedToMe
                {
                    validActivities |= TicketActivity.TakeOver;
                }
            }
            return validActivities;
        }

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
