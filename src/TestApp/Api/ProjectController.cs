using Microsoft.AspNet.Mvc;
using DLGP_SVDK.Repository;
using DLGP_SVDK.Model.Domain.Entities;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DLGP_SVDK.Web.Api
{
    [Route("api/projects")]
    public class ProjectController : Controller
    {
        [HttpGet("")]
        public JsonResult GetAll()
        {
            using (var unitOfWork = new UnitOfWork(new ApplicationDbContext()))
            {
                // Return all projects
                var projects = unitOfWork.Projects.GetProjectList();

                // serialize to string            
                //string json2 = JsonConvert.SerializeObject(projects, Formatting.Indented);

                return new JsonResult(new { data = projects, success = true });
            }
        }

        // GET: api/projects
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            using (var unitOfWork = new UnitOfWork(new ApplicationDbContext()))
            {
                // Get a particular project
                var project = unitOfWork.Projects.Get(id);
                return new JsonResult(new { data = project, success = true });
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
