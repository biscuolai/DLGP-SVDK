using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using System;
using System.Linq;
using System.Collections.Generic;
using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Models;
using DLGP_SVDK.Model.Domain.Entities.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace DLGP_SVDK.Infrastructure
{
    public class AppContextSeedData
    {
        private ApplicationDbContext _context;
        private UserManager<ApplicationUser> _userManager;
        private RoleManager<IdentityRole> _rolesManager;

        public AppContextSeedData(ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> rolesManager)
        {
            _context = context;
            _userManager = userManager;
            _rolesManager = rolesManager;
        }

        public async Task EnsureSeedDataAsync()
        {
            try
            {
                if (!await _rolesManager.RoleExistsAsync("admin"))
                {
                    var newRole = new IdentityRole("admin");

                    await _rolesManager.CreateAsync(newRole);
                }

                if (!await _rolesManager.RoleExistsAsync("operator"))
                {
                    var newRole = new IdentityRole("operator");

                    await _rolesManager.CreateAsync(newRole);
                }

                if (await _userManager.FindByEmailAsync("ilson_biscuola@dialog.com.au") == null)
                {
                    // Add user Ilson Biscuola
                    var newUser = new ApplicationUser()
                    {
                        UserName = "biscuolai",
                        Email = "ilson_biscuola@dialog.com.au"
                        //DisplayName = "Ilson Biscuola"
                    };

                    await _userManager.CreateAsync(newUser, "Password0!");
                    await _userManager.AddToRoleAsync(newUser, "admin");
                }

                if (await _userManager.FindByEmailAsync("admin@dialog.com.au") == null)
                {
                    // Add user admin
                    var newAdmin = new ApplicationUser()
                    {
                        UserName = "admin",
                        Email = "admin@dialog.com.au",
                        //DisplayName = "Admin User"
                    };

                    await _userManager.CreateAsync(newAdmin, "Password0!");
                    await _userManager.AddToRoleAsync(newAdmin, "admin");
                }

                if (await _userManager.FindByEmailAsync("helpdesk@dialog.com.au") == null)
                {
                    // Add user admin
                    var newOperator = new ApplicationUser()
                    {
                        UserName = "Operator",
                        Email = "helpdesk@dialog.com.au",
                        //DisplayName = "Operator"
                    };

                    await _userManager.CreateAsync(newOperator, "Password0!");
                    await _userManager.AddToRoleAsync(newOperator, "operator");
                }

                // Add a new project 
                if (!_context.Projects.Any())
                {
                    var ServiceDeskProject = new Project()
                    {
                        ProjectCode = "DLGP-SVDK",
                        ProjectName = "Dialog Internal",
                        ProjectDescription = "Ticket system"
                    };

                    // Adding data to Project and Ticket tables
                    _context.Projects.Add(ServiceDeskProject);
                    
                    // save changes
                    _context.SaveChanges();
                }

                // Add a new ticket and assign to that project
                if (!_context.TicketConfigurationItems.Any())
                {
                    var ci = new TicketConfigurationItem();
                    ci.Active = true;
                    ci.Name = "Service Desk";
                    ci.Order = 0;
                    ci.ProjectId = 1;
                    _context.TicketConfigurationItems.Add(ci);

                    // save changes
                    _context.SaveChanges();
                }

                // Add a new ticket and assign to that project
                if (!_context.TicketCategories.Any())
                {
                    var cat = new List<TicketCategory>() {
                        new TicketCategory() { Active = true, Order = 0, Name = "Bug" },
                        new TicketCategory() { Active = true, Order = 1, Name = "Enhancement" },
                        new TicketCategory() { Active = true, Order = 2, Name = "Request For Information" },
                    };

                    _context.TicketCategories.AddRange(cat);

                    // save changes
                    _context.SaveChanges();
                }

                // Add a new ticket and assign to that project
                if (!_context.TicketContactTypes.Any())
                {
                    var ct = new List<TicketContactType>() {
                        new TicketContactType() { Active = true, Order = 0, Name = "Portal" },
                        new TicketContactType() { Active = true, Order = 1, Name = "Email" },
                        new TicketContactType() { Active = true, Order = 2, Name = "Phone" }
                    };

                    _context.TicketContactTypes.AddRange(ct);

                    // save changes
                    _context.SaveChanges();
                }

                // Add a new ticket and assign to that project
                if (!_context.TicketPriorities.Any())
                {
                    var p = new List<TicketPriority>() {
                        new TicketPriority() { Active = true, Order = 0, Name = "1 - Critical" },
                        new TicketPriority() { Active = true, Order = 1, Name = "2 - High" },
                        new TicketPriority() { Active = true, Order = 2, Name = "3 - Medium" },
                        new TicketPriority() { Active = true, Order = 3, Name = "4 - Low" }
                    };

                    _context.TicketPriorities.AddRange(p);

                    // save changes
                    _context.SaveChanges();
                }

                // Add a new ticket and assign to that project
                if (!_context.TicketStatuses.Any())
                {
                    var p = new List<TicketStatus>() {
                        new TicketStatus() { Active = true, Order = 0, Name = "New" },
                        new TicketStatus() { Active = true, Order = 1, Name = "Open" },
                        new TicketStatus() { Active = true, Order = 2, Name = "Pending - Request for Information" },
                        new TicketStatus() { Active = true, Order = 3, Name = "Pending - On Hold" },
                        new TicketStatus() { Active = true, Order = 4, Name = "Resolved" },
                        new TicketStatus() { Active = true, Order = 5, Name = "Cancelled" },
                        new TicketStatus() { Active = true, Order = 6, Name = "Closed" }
                    };

                    _context.TicketStatuses.AddRange(p);

                    // save changes
                    _context.SaveChanges();
                }

                // Add a new ticket and assign to that project
                if (!_context.Tickets.Any())
                {
                    var Tickets = new List<Ticket>() {
                        new Ticket()
                        {   ProjectId = 1,
                            ContactTypeId = 1,
                            CategoryId = 1,
                            ConfigurationItemId = 1,
                            Title = "System is down",
                            Details = "User abc called and said that the system xyz is down since 01/01/2016",
                            PriorityId = 3,
                            TicketStatusId = 1,
                            Owner = "ilson_biscuola@dialog.com.au",
                            AssignedTo = "biscuolai",
                            CreatedBy = "System",
                            CreatedDate = DateTimeOffset.Now,
                            CurrentStatusDate = DateTimeOffset.Now,
                            LastUpdateBy = "Oliver Fehr",
                            LastUpdateDate = DateTimeOffset.Now,
                            CurrentStatusSetBy = "biscuolai"
                        } };

                    _context.Tickets.AddRange(Tickets);

                    // save changes
                    _context.SaveChanges();
                }

                // Add LookupValue data
                //if (!_context.LookupValues.Any())
                //{
                //    List<LookupValue> LV = new List<LookupValue>()
                //    {
                //        new LookupValue() { Active = true, LookupType = LookupValueType.Category, Order = 0, Value = "Bug" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.Category, Order = 1, Value = "Enhancement" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.Category, Order = 2, Value = "Request For Information" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.ConfigurationItem, Order = 0, Value = "Service Desk" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.ConfigurationItem, Order = 1, Value = "VRAT" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.ContactType, Order = 0, Value = "Portal" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.ContactType, Order = 1, Value = "Email" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.ContactType, Order = 2, Value = "Phone" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.Priority, Order = 0, Value = "1 - Critical" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.Priority, Order = 1, Value = "2 - High" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.Priority, Order = 2, Value = "3 - Medium" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.Priority, Order = 3, Value = "4 - Low" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.TicketStatus, Order = 0, Value = "New" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.TicketStatus, Order = 1, Value = "Open" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.TicketStatus, Order = 2, Value = "Pending - Request for Information" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.TicketStatus, Order = 3, Value = "Pending - On Hold" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.TicketStatus, Order = 4, Value = "Resolved" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.TicketStatus, Order = 5, Value = "Cancelled" },
                //        new LookupValue() { Active = true, LookupType = LookupValueType.TicketStatus, Order = 6, Value = "Closed" }
                //    };

                //    _context.LookupValues.AddRange(LV);

                //    // save changes
                //    _context.SaveChanges();
                //}
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
