using AutoMapper;
using DLGP_SVDK.Repository;
using DLGP_SVDK.Repository.Repositories;
using Microsoft.AspNet.Mvc;
using System.Collections.Generic;
using DLGP_SVDK.Model.Domain.Entities;
using System.Net;
using System;
using DLGP_SVDK.Api.ViewModels;

namespace DLGP_SVDK.Web.Api
{
    [Route("api/tickets")]
    public class TicketController: Controller
    {
        private ITicketRepository _repository;

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
            
            var result = Mapper.Map<Ticket>(_repository.GetTopUrgentTickets(10));
            return new JsonResult(new { data = result, success = true });
            
            //return Json("null");
        }

        [HttpPost("")]
        public JsonResult Post([FromBody] TicketViewModel value)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newTicket = Mapper.Map<TicketViewModel>(value);

                    // Save to the database
                    using (var unitOfWork = new UnitOfWork(new ApplicationDbContext()))
                    {
                        unitOfWork.Tickets.Add(Mapper.Map<Ticket>(newTicket));
                        unitOfWork.Commit();

                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<TicketViewModel>(newTicket));
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
    }
}