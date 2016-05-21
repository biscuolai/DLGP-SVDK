using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using DLGP_SVDK.Model.Domain.Entities;

namespace DLGP_SVDK.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketEventNotification> TicketEventNotifications { get; set; }
        public DbSet<TicketEvent> TicketEvents { get; set; }
        public DbSet<TicketSubscriber> TicketSubscribers { get; set; }
        public DbSet<TicketTag> TicketTags { get; set; }
        public DbSet<LookupValue> LookupValues { get; set; }
        public DbSet<TicketConfigurationItem> ConfigurationItems { get; set; }
        public DbSet<TicketCategory> Categories { get; set; }
        public DbSet<TicketContactType> ContactTypes { get; set; }
        public DbSet<TicketPriority> Priotiries { get; set; }
        public DbSet<TicketStatus> Statuses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connString = Startup.Configuration["Data:DefaultConnection:ConnectionString"];

            optionsBuilder.UseSqlServer(connString);

            base.OnConfiguring(optionsBuilder);
        }
    }
}
