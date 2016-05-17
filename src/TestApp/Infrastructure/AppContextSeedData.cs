using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using System;
using System.Linq;
using System.Collections.Generic;
using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Models;

namespace DLGP_SVDK.Infrastructure
{
    public class AppContextSeedData
    {
        private ApplicationDbContext _context;
        private UserManager<ApplicationUser> _userManager;

        public AppContextSeedData(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task EnsureSeedDataAsync()
        {
            try
            {

                if (await _userManager.FindByEmailAsync("ilson_biscuola@dialog.com.au") == null)
                {
                    // Add user Ilson Biscuola
                    var newUser = new Models.ApplicationUser()
                    {
                        UserName = "biscuolai",
                        Email = "ilson_biscuola@dialog.com.au"
                    };

                    await _userManager.CreateAsync(newUser, "Password0!");
                }

                if (await _userManager.FindByEmailAsync("oliver_fehr@dialog.com.au") == null)
                {
                    // Add user Oliver Fehr
                    var newUser = new Models.ApplicationUser()
                    {
                        UserName = "fehro",
                        Email = "oliver_fehr@dialog.com.au"
                    };

                    await _userManager.CreateAsync(newUser, "Password0!");
                }

                // Add new data
                if (!_context.Projects.Any())
                {
                    var ServiceDeskProject = new Project()
                    {
                        ProjectCode = "DLGP.SVDK",
                        ProjectName = "Service Desk",
                        ProjectDescription = "Ticket system",
                        Tickets = new List<Ticket>() {
                        new Ticket() { ProjectId = 1,
                            ContactTypeId = 0,
                            CategoryId = 0,
                            Title = "System is down",
                            Details = "User abc called and said that the system xyz is down since 01/01/2016",
                            Priority = 3,
                            Owner = "ilson_biscuola@dialog.com.au",
                            AssignedTo = "biscuolai",
                            CreatedBy = "System",
                            CreatedDate = DateTimeOffset.Now,
                            CurrentStatusDate = DateTimeOffset.Now,
                            LastUpdateBy = "Oliver Fehr",
                            LastUpdateDate = DateTimeOffset.Now,
                            IsHtml = false,
                            CurrentStatusSetBy = "biscuolai"
                        }
                    }
                    };

                    // Adding data to Project and Ticket tables
                    _context.Projects.Add(ServiceDeskProject);
                    _context.Tickets.AddRange(ServiceDeskProject.Tickets);

                    // save changes
                    _context.SaveChanges();
                }

                // Add LookupValue data
                if (!_context.LookupValues.Any())
                {
                    List<LookupValue> LV = new List<LookupValue>()
                    {
                        new LookupValue() { Active = true, Name = LookupValueName.Category, Order = 0, Value = "Bug" },
                        new LookupValue() { Active = true, Name = LookupValueName.Category, Order = 1, Value = "Enhancement" },
                        new LookupValue() { Active = true, Name = LookupValueName.Category, Order = 2, Value = "Request For Information" },
                        new LookupValue() { Active = true, Name = LookupValueName.ConfigurationItem, Order = 0, Value = "Service Desk" },
                        new LookupValue() { Active = true, Name = LookupValueName.ConfigurationItem, Order = 1, Value = "VRAT" },
                        new LookupValue() { Active = true, Name = LookupValueName.ContactType, Order = 0, Value = "Portal" },
                        new LookupValue() { Active = true, Name = LookupValueName.ContactType, Order = 1, Value = "Email" },
                        new LookupValue() { Active = true, Name = LookupValueName.ContactType, Order = 2, Value = "Phone" },
                        new LookupValue() { Active = true, Name = LookupValueName.Priority, Order = 0, Value = "1 - Critical" },
                        new LookupValue() { Active = true, Name = LookupValueName.Priority, Order = 1, Value = "2 - High" },
                        new LookupValue() { Active = true, Name = LookupValueName.Priority, Order = 2, Value = "3 - Medium" },
                        new LookupValue() { Active = true, Name = LookupValueName.Priority, Order = 3, Value = "4 - Low" },
                        new LookupValue() { Active = true, Name = LookupValueName.TicketStatus, Order = 0, Value = "New" },
                        new LookupValue() { Active = true, Name = LookupValueName.TicketStatus, Order = 1, Value = "Open" },
                        new LookupValue() { Active = true, Name = LookupValueName.TicketStatus, Order = 2, Value = "Ready For Test" },
                        new LookupValue() { Active = true, Name = LookupValueName.TicketStatus, Order = 3, Value = "Pending" },
                        new LookupValue() { Active = true, Name = LookupValueName.TicketStatus, Order = 4, Value = "Cancelled" },
                        new LookupValue() { Active = true, Name = LookupValueName.TicketStatus, Order = 5, Value = "Closed" }
                    };

                    _context.LookupValues.AddRange(LV);

                    // save changes
                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
