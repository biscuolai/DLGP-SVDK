using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using TestApp.Models;

namespace TestApp.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityRole", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .HasAnnotation("Relational:Name", "RoleNameIndex");

                    b.HasAnnotation("Relational:TableName", "AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasAnnotation("Relational:TableName", "AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasAnnotation("Relational:TableName", "AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasAnnotation("Relational:TableName", "AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasAnnotation("Relational:TableName", "AspNetUserRoles");
                });

            modelBuilder.Entity("TestApp.Model.Domain.Entities.Project", b =>
                {
                    b.Property<int>("ProjectId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ProjectCode")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 10);

                    b.Property<string>("ProjectDescription")
                        .HasAnnotation("MaxLength", 500);

                    b.Property<string>("ProjectName")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 100);

                    b.Property<byte[]>("Version")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasAnnotation("MaxLength", 8);

                    b.HasKey("ProjectId");
                });

            modelBuilder.Entity("TestApp.Model.Domain.Entities.Ticket", b =>
                {
                    b.Property<int>("TicketId")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("AffectsCustomer");

                    b.Property<string>("AssignedTo")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<int>("CategoryId");

                    b.Property<int>("ConfigurationItemId");

                    b.Property<int>("ContactTypeId");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 256);

                    b.Property<DateTimeOffset>("CreatedDate");

                    b.Property<DateTimeOffset>("CurrentStatusDate");

                    b.Property<string>("CurrentStatusSetBy")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("Details")
                        .IsRequired();

                    b.Property<bool>("IsHtml");

                    b.Property<string>("LastUpdateBy")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 256);

                    b.Property<DateTimeOffset>("LastUpdateDate");

                    b.Property<string>("Owner")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 256);

                    b.Property<int>("Priority");

                    b.Property<int>("ProjectId");

                    b.Property<string>("TagList")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<int>("TicketStatus");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 500);

                    b.Property<byte[]>("Version")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasAnnotation("MaxLength", 8)
                        .HasAnnotation("Relational:ColumnType", "timestamp");

                    b.HasKey("TicketId");

                    b.HasAnnotation("Relational:TableName", "Ticket");
                });

            modelBuilder.Entity("TestApp.Model.Domain.Entities.TicketEvent", b =>
                {
                    b.Property<int>("EventId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Comment");

                    b.Property<string>("EventBy")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 256);

                    b.Property<DateTimeOffset>("EventDate")
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<string>("EventDescription")
                        .HasAnnotation("MaxLength", 500);

                    b.Property<bool>("IsHtml");

                    b.Property<int>("TicketId");

                    b.Property<byte[]>("Version")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasAnnotation("MaxLength", 8)
                        .HasAnnotation("Relational:ColumnType", "timestamp");

                    b.HasKey("EventId");
                });

            modelBuilder.Entity("TestApp.Model.Domain.Entities.TicketEventNotification", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("EventId");

                    b.Property<bool>("IsNew");

                    b.Property<bool>("IsRead");

                    b.Property<string>("SubscriberId")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<int>("TicketId");

                    b.Property<byte[]>("Version")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasAnnotation("MaxLength", 8)
                        .HasAnnotation("Relational:ColumnType", "timestamp");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("TestApp.Model.Domain.Entities.TicketSubscriber", b =>
                {
                    b.Property<string>("SubscriberId")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<int>("TicketId");

                    b.HasKey("SubscriberId");
                });

            modelBuilder.Entity("TestApp.Model.Domain.Entities.TicketTag", b =>
                {
                    b.Property<int>("TicketTagId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("TagName")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 100);

                    b.Property<int>("TicketId");

                    b.HasKey("TicketTagId");
                });

            modelBuilder.Entity("TestApp.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id");

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedUserName")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasAnnotation("Relational:Name", "EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .HasAnnotation("Relational:Name", "UserNameIndex");

                    b.HasAnnotation("Relational:TableName", "AspNetUsers");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNet.Identity.EntityFramework.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("TestApp.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("TestApp.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNet.Identity.EntityFramework.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId");

                    b.HasOne("TestApp.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("TestApp.Model.Domain.Entities.Ticket", b =>
                {
                    b.HasOne("TestApp.Model.Domain.Entities.Project")
                        .WithMany()
                        .HasForeignKey("ProjectId");
                });

            modelBuilder.Entity("TestApp.Model.Domain.Entities.TicketEvent", b =>
                {
                    b.HasOne("TestApp.Model.Domain.Entities.Ticket")
                        .WithMany()
                        .HasForeignKey("TicketId");
                });

            modelBuilder.Entity("TestApp.Model.Domain.Entities.TicketEventNotification", b =>
                {
                    b.HasOne("TestApp.Model.Domain.Entities.TicketEvent")
                        .WithMany()
                        .HasForeignKey("EventId");

                    b.HasOne("TestApp.Model.Domain.Entities.TicketSubscriber")
                        .WithMany()
                        .HasForeignKey("SubscriberId");
                });

            modelBuilder.Entity("TestApp.Model.Domain.Entities.TicketSubscriber", b =>
                {
                    b.HasOne("TestApp.Model.Domain.Entities.Ticket")
                        .WithMany()
                        .HasForeignKey("TicketId");
                });

            modelBuilder.Entity("TestApp.Model.Domain.Entities.TicketTag", b =>
                {
                    b.HasOne("TestApp.Model.Domain.Entities.Ticket")
                        .WithMany()
                        .HasForeignKey("TicketId");
                });
        }
    }
}
