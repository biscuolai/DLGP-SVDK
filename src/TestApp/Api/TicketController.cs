using AutoMapper;
using DLGP_SVDK.Repository;
using Microsoft.AspNet.Mvc;
using DLGP_SVDK.Model.Domain.Entities;
using System.Net;
using System;
using DLGP_SVDK.Api.ViewModels;
using System.Linq;
using Newtonsoft.Json;

namespace DLGP_SVDK.Web.Api
{
    [Route("api/tickets")]
    public class TicketController: Controller
    {
        //private ITicketRepository _repository;

        [HttpGet("")]
        public JsonResult GetAll()
        {
            try
            {
                using (var unitOfWork = new UnitOfWork(new ApplicationDbContext()))
                {
                    // Example1
                    //var course = unitOfWork.Courses.Get(1);

                    // Example2
                    var tickets = unitOfWork.Tickets.GetTopUrgentTickets(10);


                    // serialize to string            
                    //string json2 = JsonConvert.SerializeObject(tickets, Formatting.Indented);

                    return new JsonResult(new { data = tickets, success = true });

                    // Example3
                    //var author = unitOfWork.Authors.GetAuthorWithCourses(1);
                    //unitOfWork.Tickets.RemoveRange(author.Courses);
                    //unitOfWork.Authors.Remove(author);
                    //unitOfWork.Complete();
                }


                //var results = Mapper.Map<IEnumerable<TicketViewModel>>(_repository.GetTopUrgentTickets(10));
                //return new JsonResult(new { data = results, success = true });

                //return Json("null");
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            using (var unitOfWork = new UnitOfWork(new ApplicationDbContext()))
            {
                // Get a particular ticket
                var ticket = unitOfWork.Tickets.Get(id);
                return new JsonResult(new { data = ticket, success = true });
            }
        }

        [HttpPost("")]
        public JsonResult Post([FromBody] TicketViewModel value)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newTicket = Mapper.Map<Ticket>(value);

                    // Create a new ticket and save to the database
                    using (var unitOfWork = new UnitOfWork(new ApplicationDbContext()))
                    {
                        unitOfWork.Tickets.Add(newTicket);

                        unitOfWork.Commit();

                        var ticketReload = unitOfWork.Tickets.Reload(unitOfWork.Tickets.GetId(newTicket));

                        unitOfWork.TicketEvents.Add(unitOfWork.TicketEvents.CreateActivityEvent(ticketReload.TicketId, ticketReload.AssignedTo, TicketActivity.Create, ticketReload.Details, ticketReload.Priority.Name, ticketReload.AssignedTo));

                        unitOfWork.Commit();

                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<TicketViewModel>(newTicket));
                    }
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message, ModelState = ModelState });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed to create a new ticket", ModelState = ModelState });
        }

        [HttpPut("{id}")]
        public JsonResult Put(int id, [FromBody] TicketViewModel value)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    // Update ticket and save to the database
                    using (var unitOfWork = new UnitOfWork(new ApplicationDbContext()))
                    {
                        // updating values from existing ticket
                        var existingTicket = unitOfWork.Tickets.Get(id);
                        existingTicket.Title = value.Title;
                        existingTicket.ContactTypeId = value.ContactTypeId;
                        existingTicket.CategoryId = value.CategoryId;
                        existingTicket.ConfigurationItemId = value.ConfigurationItemId;
                        existingTicket.Details = value.Details;
                        existingTicket.TagList = value.TagList;
                        existingTicket.AssignedTo = value.AssignedTo;
                        existingTicket.TicketStatusId = value.TicketStatusId;
                        existingTicket.CurrentStatusDate = value.CurrentStatusDate;
                        existingTicket.CurrentStatusSetBy = value.CurrentStatusSetBy;
                        existingTicket.LastUpdateBy = value.LastUpdateBy;
                        existingTicket.LastUpdateDate = value.LastUpdateDate;
                        existingTicket.PriorityId = value.PriorityId;

                        // saving data into db
                        unitOfWork.Tickets.Update(existingTicket);

                        unitOfWork.Commit();

                        var ticketReload = unitOfWork.Tickets.Reload(id);

                        unitOfWork.TicketEvents.Add(unitOfWork.TicketEvents.CreateActivityEvent(ticketReload.TicketId, ticketReload.AssignedTo, TicketActivity.EditTicketInfo, ticketReload.Details, ticketReload.Priority.Name, ticketReload.AssignedTo));

                        unitOfWork.Commit();

                        Response.StatusCode = (int)HttpStatusCode.Accepted;
                        return Json(Mapper.Map<TicketViewModel>(existingTicket));
                    }
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message, ModelState = ModelState });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed to edit ticket", ModelState = ModelState });
        }
    }
}









//namespace TicketDesk.Web.Client.Controllers
//{
//    [RoutePrefix("ticket-activity")]
//    [Route("{action}")]
//    [TdAuthorize(Roles = "TdInternalUsers,TdHelpDeskUsers,TdAdministrators")]
//    [ValidateInput(false)]
//    public class TicketActivityController : Controller
//    {
//        private TdDomainContext Context { get; set; }
//        public TicketActivityController(TdDomainContext context)
//        {
//            Context = context;
//        }

//        [Route("load-activity")]
//        public async Task<ActionResult> LoadActivity(TicketActivity activity, int ticketId, Guid? tempId)
//        {
//            var ticket = await Context.Tickets.FindAsync(ticketId);
//            Context.TicketActions.IsTicketActivityValid(ticket, activity);
//            ViewBag.CommentRequired = activity.IsCommentRequired();
//            ViewBag.Activity = activity;
//            ViewBag.TempId = tempId ?? Guid.NewGuid();
//            ViewBag.IsEditorDefaultHtml = Context.TicketDeskSettings.ClientSettings.GetDefaultTextEditorType() == "summernote";
//            if (activity == TicketActivity.EditTicketInfo)
//            {
//                await SetProjectInfoForModelAsync(ticket);
//            }
//            return PartialView("_ActivityForm", ticket);
//        }

//        private async Task SetProjectInfoForModelAsync(Ticket ticket)
//        {
//            var projectCount = await Context.Projects.CountAsync();
//            var isMulti = (projectCount > 1);
//            ViewBag.IsMultiProject = isMulti;
//        }

//        [Route("activity-buttons")]
//        public ActionResult ActivityButtons(int ticketId)
//        {
//            //WARNING! This is also used as a child action and cannot be made async in MVC 5
//            var ticket = Context.Tickets.Find(ticketId);
//            var activities = Context.TicketActions.GetValidTicketActivities(ticket);
//            return PartialView("_ActivityButtons", activities);
//        }

//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        [Route("add-comment")]
//        public async Task<ActionResult> AddComment(int ticketId, [ModelBinder(typeof(SummernoteModelBinder))] string comment)
//        {
//            var activityFn = Context.TicketActions.AddComment(comment);
//            return await PerformTicketAction(ticketId, activityFn, TicketActivity.AddComment);
//        }

//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        [Route("assign")]
//        public async Task<ActionResult> Assign(int ticketId, [ModelBinder(typeof(SummernoteModelBinder))] string comment, string assignedTo, string priority)
//        {
//            var activityFn = Context.TicketActions.Assign(comment, assignedTo, priority);
//            return await PerformTicketAction(ticketId, activityFn, TicketActivity.Assign);
//        }

//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        [Route("cancel-more-info")]
//        public async Task<ActionResult> CancelMoreInfo(int ticketId, [ModelBinder(typeof(SummernoteModelBinder))] string comment)
//        {
//            var activityFn = Context.TicketActions.CancelMoreInfo(comment);
//            return await PerformTicketAction(ticketId, activityFn, TicketActivity.CancelMoreInfo);
//        }

//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        [Route("close")]
//        public async Task<ActionResult> Close(int ticketId, [ModelBinder(typeof(SummernoteModelBinder))] string comment)
//        {
//            var activityFn = Context.TicketActions.Close(comment);
//            return await PerformTicketAction(ticketId, activityFn, TicketActivity.Close);
//        }

//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        [Route("edit-ticket-info")]
//        public async Task<ActionResult> EditTicketInfo(
//            int ticketId,
//            int projectId,
//            [ModelBinder(typeof(SummernoteModelBinder))] string comment,
//            string title,
//            string details,
//            string priority,
//            string ticketType,
//            string category,
//            string owner,
//            string tagList)
//        {
//            details = details.StripHtmlWhenEmpty();
//            var projectName = await Context.Projects.Where(p => p.ProjectId == projectId).Select(s => s.ProjectName).FirstOrDefaultAsync();
//            var activityFn = Context.TicketActions.EditTicketInfo(comment, projectId, projectName, title, details, priority, ticketType, category, owner, tagList, Context.TicketDeskSettings);
//            return await PerformTicketAction(ticketId, activityFn, TicketActivity.EditTicketInfo);
//        }

//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        [Route("force-close")]
//        public async Task<ActionResult> ForceClose(int ticketId, [ModelBinder(typeof(SummernoteModelBinder))] string comment)
//        {
//            var activityFn = Context.TicketActions.ForceClose(comment);
//            return await PerformTicketAction(ticketId, activityFn, TicketActivity.ForceClose);
//        }

//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        [Route("give-up")]
//        public async Task<ActionResult> GiveUp(int ticketId, [ModelBinder(typeof(SummernoteModelBinder))] string comment)
//        {
//            var activityFn = Context.TicketActions.GiveUp(comment);
//            return await PerformTicketAction(ticketId, activityFn, TicketActivity.GiveUp);
//        }

//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        [Route("modify-attachments")]
//        public async Task<ActionResult> ModifyAttachments(int ticketId, [ModelBinder(typeof(SummernoteModelBinder))] string comment, Guid tempId, string deleteFiles)
//        {
//            var demoMode = (ConfigurationManager.AppSettings["ticketdesk:DemoModeEnabled"] ?? "false").Equals("true", StringComparison.InvariantCultureIgnoreCase);
//            if (demoMode)
//            {
//                return new EmptyResult();
//            }
//            //most of this action is performed directly against the storage provider, outside the business domain's control. 
//            //  All the business domain has to do is record the activity log and comments
//            Action<Ticket> activityFn = ticket =>
//            {
//                //TODO: it might make sense to move the string building part of this over to the TicketDeskFileStore too?
//                var sb = new StringBuilder(comment);
//                if (!string.IsNullOrEmpty(deleteFiles))
//                {
//                    sb.AppendLine();
//                    sb.AppendLine("<dl><dt>");
//                    sb.AppendLine(Strings.RemovedFiles);
//                    sb.AppendLine("</dt>");


//                    var files = deleteFiles.Split(',');
//                    foreach (var file in files)
//                    {
//                        TicketDeskFileStore.DeleteAttachment(file, ticketId.ToString(CultureInfo.InvariantCulture), false);
//                        sb.AppendLine(string.Format("<dd>    {0}</dd>", file));
//                    }
//                    sb.AppendLine("</dl>");
//                }
//                var filesAdded = ticket.CommitPendingAttachments(tempId).ToArray();
//                if (filesAdded.Any())
//                {
//                    sb.AppendLine();
//                    sb.AppendLine("<dl><dt>");
//                    sb.AppendLine(Strings.NewFiles);
//                    sb.AppendLine("</dt>");

//                    foreach (var file in filesAdded)
//                    {
//                        sb.AppendLine(string.Format("<dd>    {0}</dd>", file));
//                    }
//                    sb.AppendLine("</dl>");
//                }
//                comment = sb.ToString();

//                //perform the simple business domain functions
//                var domainActivityFn = Context.TicketActions.ModifyAttachments(comment);
//                domainActivityFn(ticket);
//            };

//            return await PerformTicketAction(ticketId, activityFn, TicketActivity.ModifyAttachments);
//        }

//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        [Route("pass")]
//        public async Task<ActionResult> Pass(int ticketId, [ModelBinder(typeof(SummernoteModelBinder))] string comment, string assignedTo, string priority)
//        {
//            var activityFn = Context.TicketActions.Pass(comment, assignedTo, priority);
//            return await PerformTicketAction(ticketId, activityFn, TicketActivity.Pass);
//        }

//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        [Route("reassign")]
//        public async Task<ActionResult> ReAssign(int ticketId, [ModelBinder(typeof(SummernoteModelBinder))] string comment, string assignedTo, string priority)
//        {
//            var activityFn = Context.TicketActions.ReAssign(comment, assignedTo, priority);
//            return await PerformTicketAction(ticketId, activityFn, TicketActivity.ReAssign);
//        }

//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        [Route("request-more-info")]
//        public async Task<ActionResult> RequestMoreInfo(int ticketId, [ModelBinder(typeof(SummernoteModelBinder))] string comment)
//        {
//            var activityFn = Context.TicketActions.RequestMoreInfo(comment);
//            return await PerformTicketAction(ticketId, activityFn, TicketActivity.RequestMoreInfo);
//        }

//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        [Route("reopen")]
//        public async Task<ActionResult> ReOpen(int ticketId, [ModelBinder(typeof(SummernoteModelBinder))] string comment, bool assignToMe = false)
//        {
//            var activityFn = Context.TicketActions.ReOpen(comment, assignToMe);
//            return await PerformTicketAction(ticketId, activityFn, TicketActivity.ReOpen);
//        }

//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        [Route("resolve")]
//        public async Task<ActionResult> Resolve(int ticketId, [ModelBinder(typeof(SummernoteModelBinder))] string comment)
//        {
//            var activityFn = Context.TicketActions.Resolve(comment);
//            return await PerformTicketAction(ticketId, activityFn, TicketActivity.ReOpen);
//        }

//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        [Route("supply-more-info")]
//        public async Task<ActionResult> SupplyMoreInfo(int ticketId, [ModelBinder(typeof(SummernoteModelBinder))] string comment, bool reactivate = false)
//        {
//            var activityFn = Context.TicketActions.SupplyMoreInfo(comment, reactivate);
//            return await PerformTicketAction(ticketId, activityFn, TicketActivity.SupplyMoreInfo);
//        }

//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        [Route("take-over")]
//        public async Task<ActionResult> TakeOver(
//            int ticketId,
//            [ModelBinder(typeof(SummernoteModelBinder))] string comment,
//            string priority)
//        {
//            var activityFn = Context.TicketActions.TakeOver(comment, priority);
//            return await PerformTicketAction(ticketId, activityFn, TicketActivity.TakeOver);
//        }


//        private async Task<ActionResult> PerformTicketAction(int ticketId, Action<Ticket> activityFn, TicketActivity activity)
//        {
//            var ticket = await Context.Tickets.FindAsync(ticketId);
//            TryValidateModel(ticket);
//            if (ModelState.IsValid)
//            {
//                try
//                {
//                    ticket.PerformAction(activityFn);
//                }
//                catch (SecurityException ex)
//                {
//                    ModelState.AddModelError("Security", ex);
//                }
//                var result = await Context.SaveChangesAsync(); //save changes catches lastupdatedby and date automatically
//                if (result > 0)
//                {
//                    return new EmptyResult();//standard success case
//                }
//            }
//            //fail case, return the view and let the client/view sort out the errors
//            ViewBag.CommentRequired = activity.IsCommentRequired();
//            ViewBag.Activity = activity;
//            ViewBag.IsEditorDefaultHtml = Context.TicketDeskSettings.ClientSettings.GetDefaultTextEditorType() == "summernote";
//            return PartialView("_ActivityForm", ticket);
//        }
//    }
//}