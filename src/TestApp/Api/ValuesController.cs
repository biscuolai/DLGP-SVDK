using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using DLGP_SVDK.Repository;
using DLGP_SVDK.Model.Domain.Entities;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DLGP_SVDK.Web.Api
{
    [Route("api/values")]
    public class ValuesController : Controller
    {
        //// GET: api/values
        //[HttpGet("{id}")]
        //public JsonResult Get(int id)
        //{
        //    using (var unitOfWork = new UnitOfWork(new ApplicationDbContext()))
        //    {
        //        // Get all options for Priority field
        //        var priorityList = unitOfWork.LookupValues.GetLookupValueList((LookupValueType)id);
        //        return new JsonResult(new { data = priorityList, success = true });
        //    }
        //}

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
        [HttpGet("ticketstatus")]
        public JsonResult GetTicketStatus()
        {
            using (var unitOfWork = new UnitOfWork(new ApplicationDbContext()))
            {
                // Get all options for Priority field
                var list = unitOfWork.TicketStatuses.GetTicketStatusList();
                return new JsonResult(new { data = list, success = true });
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
