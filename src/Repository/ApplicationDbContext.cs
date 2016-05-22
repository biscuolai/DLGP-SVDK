using DLGP_SVDK.Model.Domain.Entities;
using Microsoft.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace DLGP_SVDK.Repository
{
    public class ApplicationDbContext : IdentityDbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=DLGPSVDKDB;Trusted_Connection=True;MultipleActiveResultSets=true");
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketEventNotification> TicketEventNotifications { get; set; }
        public DbSet<TicketEvent> TicketEvents { get; set; }
        public DbSet<TicketSubscriber> TicketSubscribers { get; set; }
        public DbSet<TicketTag> TicketTags { get; set; }
        public DbSet<LookupValue> LookupValues { get; set; }
        public DbSet<TicketConfigurationItem> TicketConfigurationItems { get; set; }
        public DbSet<TicketCategory> TicketCategories { get; set; }
        public DbSet<TicketContactType> TicketContactTypes { get; set; }
        public DbSet<TicketPriority> TicketPriotiries { get; set; }
        public DbSet<TicketStatus> TicketStatuses { get; set; }
    }
}
