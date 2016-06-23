using Microsoft.AspNet.Mvc;
using DLGP_SVDK.Repository;
using Microsoft.AspNet.Authorization;
using System;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DLGP_SVDK.Web.Api
{
    [Authorize]
    [Route("api/values")]
    public class ValuesController : Controller
    {
        // GET: api/values
        [HttpGet("category")]
        public JsonResult GetCategory()
        {
            using (var unitOfWork = new UnitOfWork(new ApplicationDbContext()))
            {
                // Get all options for Priority field
                var list = unitOfWork.Categories.GetCategoryList();
                return new JsonResult(new { data = list, success = true });
            }
        }

        // GET: api/values
        [HttpGet("priority")]
        public JsonResult GetPriority()
        {
            using (var unitOfWork = new UnitOfWork(new ApplicationDbContext()))
            {
                // Get all options for Priority field
                var list = unitOfWork.Priorities.GetPriorityList();
                return new JsonResult(new { data = list, success = true });
            }
        }

        // GET: api/values
        [HttpGet("contacttype")]
        public JsonResult GetContactType()
        {
            using (var unitOfWork = new UnitOfWork(new ApplicationDbContext()))
            {
                // Get all options for Priority field
                var list = unitOfWork.ContactTypes.GetContactTypeList();
                return new JsonResult(new { data = list, success = true });
            }
        }

        // GET: api/values
        [HttpGet("ticketstatus/{id}")]
        public JsonResult GetTicketStatus(string id)
        {
            using (var unitOfWork = new UnitOfWork(new ApplicationDbContext()))
            {
                // Get all options for Priority field
                var statuses = unitOfWork.TicketStatuses.GetTicketStatusList();
                int count = statuses.Count;

                // whether it is not a new ticket [null = new ticket]
                if (id != null && id != "null")
                {
                    var ticket = unitOfWork.Tickets.Reload(Convert.ToInt32(id));

                    // New Ticket
                    if (ticket.Status.Name == "New")
                    {
                        for (int i = 0; i < count; i++)
                        {
                            statuses.Remove(statuses.Find(c => c.Name != "New" && c.Name != "Cancelled"));
                        }
                    }

                    // Open Ticket
                    if (ticket.Status.Name == "Open")
                    {
                        for (int i = 0; i < count; i++)
                        {
                            statuses.Remove(statuses.Find(c => !c.Name.Contains("Pending") && c.Name != "Resolved" && c.Name != "Open" && c.Name != "Cancelled"));
                        }
                    }

                    // Pending - Request For Information / On Hold
                    if (ticket.Status.Name.Contains("Pending"))
                    {
                        for (int i = 0; i < count; i++)
                        {
                            statuses.Remove(statuses.Find(c => !c.Name.Contains("Pending") && c.Name != "Open" && c.Name != "Cancelled"));
                        }
                    }

                    // Resolved
                    if (ticket.Status.Name == "Resolved")
                    {
                        for (int i = 0; i < count; i++)
                        {
                            statuses.Remove(statuses.Find(c => c.Name != "Resolved" && c.Name != "Cancelled" && c.Name != "Open"));
                        }
                    }

                    // Closed
                    if (ticket.Status.Name == "Closed")
                    {
                        for (int i = 0; i < count; i++)
                        {
                            statuses.Remove(statuses.Find(c => c.Name != "Open"));
                        }
                    }

                    // Cancelled
                    if (ticket.Status.Name == "Cancelled")
                    {
                        for (int i = 0; i < count; i++)
                        {
                            statuses.Remove(statuses.Find(c => c.Name != "Cancelled" && c.Name != "Open"));
                        }
                    }
                }
                else
                {
                    // New Ticket
                    for (int i = 0; i < count; i++)
                    {
                        statuses.Remove(statuses.Find(c => c.Name != "New" && c.Name != "Cancelled"));
                    }
                }

                return new JsonResult(new { data = statuses, success = true });
            }
        }

        // GET: api/values
        [HttpGet("configurationitem")]
        public JsonResult GetConfigItems()
        {
            using (var unitOfWork = new UnitOfWork(new ApplicationDbContext()))
            {
                // Get all options for Priority field
                var list = unitOfWork.ConfigurationItems.GetConfigurationItemList();
                return new JsonResult(new { data = list, success = true });
            }
        }

        //// GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
