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
                        Email = "ilson_biscuola@dialog.com.au",
                        EmailConfirmed = true                        
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
                        EmailConfirmed = true
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
                        EmailConfirmed = true
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
                            Owner = "biscuolai",
                            AssignedTo = "biscuolai",
                            CreatedBy = "biscuolai",
                            CreatedDate = DateTimeOffset.Now,
                            CurrentStatusDate = DateTimeOffset.Now,
                            LastUpdateBy = "biscuolai",
                            LastUpdateDate = DateTimeOffset.Now,
                            CurrentStatusSetBy = "biscuolai"
                        } };

                    _context.Tickets.AddRange(Tickets);

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
