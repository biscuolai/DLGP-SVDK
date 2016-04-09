using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using System;
using TestApp.Model.Domain.Entities;
using System.Linq;
using System.Collections.Generic;

namespace TestApp.Models
{
    public class AppContextSeedData
    {
        private ApplicationDbContext _context;
        private UserManager<Models.ApplicationUser> _userManager;

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
                            TicketType = "Portal",
                            Category = "Bug",
                            Title = "System is down",
                            Details = "User abc called and said that the system xyz is down since 01/01/2016",
                            Priority = "1",
                            Owner = "Ilson Biscuola",
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
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
