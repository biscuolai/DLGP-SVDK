using AutoMapper;
using DLGP_SVDK.Repository;
using Microsoft.AspNet.Mvc;
using DLGP_SVDK.Model.Domain.Entities;
using System.Net;
using System;
using DLGP_SVDK.Api.ViewModels;
using System.Linq;

namespace DLGP_SVDK.Web.Api
{
    [Route("api/tickets")]
    public class TicketController: Controller
    {
        //private ITicketRepository _repository;

        [HttpGet("")]
        public JsonResult GetAll()
        {
            using (var unitOfWork = new UnitOfWork(new ApplicationDbContext()))
            {
                // Example1
                //var course = unitOfWork.Courses.Get(1);

                // Example2
                var tickets = unitOfWork.Tickets.GetTopUrgentTickets(10);
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
                    var newTicket = Mapper.Map<TicketViewModel>(value);

                    // Create a new ticket and save to the database
                    using (var unitOfWork = new UnitOfWork(new ApplicationDbContext()))
                    {
                        unitOfWork.Tickets.Add(Mapper.Map<Ticket>(newTicket));
                        unitOfWork.Commit();

                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(newTicket);
                    }
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState});

            //return Json("null");
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
                        existingTicket.TicketStatus = (TicketStatus)value.TicketStatus;
                        existingTicket.CurrentStatusDate = value.CurrentStatusDate;
                        existingTicket.CurrentStatusSetBy = value.CurrentStatusSetBy;
                        existingTicket.LastUpdateBy = value.LastUpdateBy;
                        existingTicket.LastUpdateDate = value.LastUpdateDate;
                        existingTicket.Priority = value.Priority;

                        // saving data into db
                        unitOfWork.Tickets.Update(existingTicket);
                        unitOfWork.Commit();

                        Response.StatusCode = (int)HttpStatusCode.Accepted;
                        return Json(Mapper.Map<TicketViewModel>(existingTicket));
                    }
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });
        }
    }
}