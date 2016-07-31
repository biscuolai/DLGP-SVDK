using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using TestApp.Model.Domain.Entities;

namespace TestApp.Repository
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=TestAppDB;Trusted_Connection=True;MultipleActiveResultSets=true");
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketEventNotification> TicketEventNotifications { get; set; }
        public DbSet<TicketEvent> TicketEvents { get; set; }
        public DbSet<TicketSubscriber> TicketSubscribers { get; set; }
        public DbSet<TicketTag> TicketTags { get; set; }
    }
}
