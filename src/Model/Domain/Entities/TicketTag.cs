using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DLGP_SVDK.Model.Domain.Entities
{
    public class TicketTag
    {
        public int TicketTagId { get; set; }

        [Required(ErrorMessageResourceName = "FieldRequired")]
        [StringLength(100, ErrorMessageResourceName = "FieldMaximumLength")]
        public string TagName { get; set; }

        public int TicketId { get; set; }

        public virtual Ticket Ticket { get; set; }

        #region utility

        public static string[] GetTagsFromString(string tagString)
        {
            var returnTags = new List<string>();
            if (!string.IsNullOrEmpty(tagString))
            {
                string[] tags = tagString.Split(',');
                foreach (string t in tags)
                {
                    var formattedTag = t.ToLowerInvariant().Trim();
                    if (!string.IsNullOrEmpty(formattedTag) && !returnTags.Contains(formattedTag))
                    {
                        returnTags.Add(formattedTag);
                    }
                }
            }
            return returnTags.ToArray();
        }

        #endregion
    }
}
