using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DLGP_SVDK.Model.Domain.Entities
{
    public class TicketEventNotification
    {
        public TicketEventNotification()
        {
            _isNew = true;
            _isRead = false;
        }

        [Key]
        public int Id { get; set; }

        public int TicketId { get; set; }

        public int EventId { get; set; }

        [StringLength(256, ErrorMessageResourceName = "FieldMaximumLength")]
        public string SubscriberId { get; set; }

        private bool _isNew;
        /// <summary>
        /// Gets or sets a value indicating whether this notification is new.
        /// </summary>
        /// <remarks>
        /// Typically, this would be used to alert a user that chages have happened, and once alerted 
        /// this would be toggled to false to prevent alerting them again.
        /// </remarks>
        /// <value><c>true</c> if this instance is new; otherwise, <c>false</c>.</value>
        public bool IsNew
        {
            get { return _isNew; }
            set
            {
                //when marking as new, read flag implicitly changed to false
                if (value)
                {
                    _isRead = false;
                }
                _isNew = value;
            }
        }

        private bool _isRead;
        /// <summary>
        /// Gets or sets a value indicating whether this notification has been read.
        /// </summary>
        /// <remarks>
        /// Typcially, this would be used to highlight uread items. Once viewed it would be 
        /// toggled to false to prevent it from being highlighted in the future.
        /// </remarks>
        /// <value><c>true</c> if this instance is read; otherwise, <c>false</c>.</value>
        public bool IsRead
        {
            get { return _isRead; }
            set
            {
                //when marking as read, new flag is implicitly chaged to false;
                if (value)
                {
                    IsNew = false;
                }
                _isRead = value;
            }
        }

        [Column(TypeName = "timestamp")]
        [MaxLength(8)]
        [Timestamp]
        public byte[] Version { get; set; }

        public virtual TicketEvent TicketEvent { get; set; }

        //public virtual TicketSubscriber TicketSubscriber { get; set; }
    }
}
