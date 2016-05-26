using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace TestApp.Migrations
{
    public partial class dashboard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Ticket_TicketCategory_CategoryId", table: "Ticket");
            migrationBuilder.DropForeignKey(name: "FK_Ticket_TicketConfigurationItem_ConfigurationItemId", table: "Ticket");
            migrationBuilder.DropForeignKey(name: "FK_Ticket_TicketContactType_ContactTypeId", table: "Ticket");
            migrationBuilder.DropForeignKey(name: "FK_Ticket_TicketPriority_PriorityId", table: "Ticket");
            migrationBuilder.DropForeignKey(name: "FK_Ticket_Project_ProjectId", table: "Ticket");
            migrationBuilder.DropForeignKey(name: "FK_Ticket_TicketStatus_TicketStatusId", table: "Ticket");
            migrationBuilder.DropForeignKey(name: "FK_TicketEvent_Ticket_TicketId", table: "TicketEvent");
            migrationBuilder.DropForeignKey(name: "FK_TicketEventNotification_TicketEvent_EventId", table: "TicketEventNotification");
            migrationBuilder.DropForeignKey(name: "FK_TicketSubscriber_Ticket_TicketId", table: "TicketSubscriber");
            migrationBuilder.DropForeignKey(name: "FK_TicketTag_Ticket_TicketId", table: "TicketTag");
            migrationBuilder.DropForeignKey(name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId", table: "AspNetRoleClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId", table: "AspNetUserClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId", table: "AspNetUserLogins");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_IdentityRole_RoleId", table: "AspNetUserRoles");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_ApplicationUser_UserId", table: "AspNetUserRoles");
            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_TicketCategory_CategoryId",
                table: "Ticket",
                column: "CategoryId",
                principalTable: "TicketCategory",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_TicketConfigurationItem_ConfigurationItemId",
                table: "Ticket",
                column: "ConfigurationItemId",
                principalTable: "TicketConfigurationItem",
                principalColumn: "ConfigurationItemId",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_TicketContactType_ContactTypeId",
                table: "Ticket",
                column: "ContactTypeId",
                principalTable: "TicketContactType",
                principalColumn: "ContactTypeId",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_TicketPriority_PriorityId",
                table: "Ticket",
                column: "PriorityId",
                principalTable: "TicketPriority",
                principalColumn: "PriorityId",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Project_ProjectId",
                table: "Ticket",
                column: "ProjectId",
                principalTable: "Project",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_TicketStatus_TicketStatusId",
                table: "Ticket",
                column: "TicketStatusId",
                principalTable: "TicketStatus",
                principalColumn: "TicketStatusId",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_TicketEvent_Ticket_TicketId",
                table: "TicketEvent",
                column: "TicketId",
                principalTable: "Ticket",
                principalColumn: "TicketId",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_TicketEventNotification_TicketEvent_EventId",
                table: "TicketEventNotification",
                column: "EventId",
                principalTable: "TicketEvent",
                principalColumn: "EventId",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_TicketSubscriber_Ticket_TicketId",
                table: "TicketSubscriber",
                column: "TicketId",
                principalTable: "Ticket",
                principalColumn: "TicketId",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_TicketTag_Ticket_TicketId",
                table: "TicketTag",
                column: "TicketId",
                principalTable: "Ticket",
                principalColumn: "TicketId",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId",
                table: "AspNetUserClaims",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId",
                table: "AspNetUserLogins",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserRole<string>_IdentityRole_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserRole<string>_ApplicationUser_UserId",
                table: "AspNetUserRoles",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Ticket_TicketCategory_CategoryId", table: "Ticket");
            migrationBuilder.DropForeignKey(name: "FK_Ticket_TicketConfigurationItem_ConfigurationItemId", table: "Ticket");
            migrationBuilder.DropForeignKey(name: "FK_Ticket_TicketContactType_ContactTypeId", table: "Ticket");
            migrationBuilder.DropForeignKey(name: "FK_Ticket_TicketPriority_PriorityId", table: "Ticket");
            migrationBuilder.DropForeignKey(name: "FK_Ticket_Project_ProjectId", table: "Ticket");
            migrationBuilder.DropForeignKey(name: "FK_Ticket_TicketStatus_TicketStatusId", table: "Ticket");
            migrationBuilder.DropForeignKey(name: "FK_TicketEvent_Ticket_TicketId", table: "TicketEvent");
            migrationBuilder.DropForeignKey(name: "FK_TicketEventNotification_TicketEvent_EventId", table: "TicketEventNotification");
            migrationBuilder.DropForeignKey(name: "FK_TicketSubscriber_Ticket_TicketId", table: "TicketSubscriber");
            migrationBuilder.DropForeignKey(name: "FK_TicketTag_Ticket_TicketId", table: "TicketTag");
            migrationBuilder.DropForeignKey(name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId", table: "AspNetRoleClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId", table: "AspNetUserClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId", table: "AspNetUserLogins");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_IdentityRole_RoleId", table: "AspNetUserRoles");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_ApplicationUser_UserId", table: "AspNetUserRoles");
            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_TicketCategory_CategoryId",
                table: "Ticket",
                column: "CategoryId",
                principalTable: "TicketCategory",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_TicketConfigurationItem_ConfigurationItemId",
                table: "Ticket",
                column: "ConfigurationItemId",
                principalTable: "TicketConfigurationItem",
                principalColumn: "ConfigurationItemId",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_TicketContactType_ContactTypeId",
                table: "Ticket",
                column: "ContactTypeId",
                principalTable: "TicketContactType",
                principalColumn: "ContactTypeId",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_TicketPriority_PriorityId",
                table: "Ticket",
                column: "PriorityId",
                principalTable: "TicketPriority",
                principalColumn: "PriorityId",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Project_ProjectId",
                table: "Ticket",
                column: "ProjectId",
                principalTable: "Project",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_TicketStatus_TicketStatusId",
                table: "Ticket",
                column: "TicketStatusId",
                principalTable: "TicketStatus",
                principalColumn: "TicketStatusId",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_TicketEvent_Ticket_TicketId",
                table: "TicketEvent",
                column: "TicketId",
                principalTable: "Ticket",
                principalColumn: "TicketId",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_TicketEventNotification_TicketEvent_EventId",
                table: "TicketEventNotification",
                column: "EventId",
                principalTable: "TicketEvent",
                principalColumn: "EventId",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_TicketSubscriber_Ticket_TicketId",
                table: "TicketSubscriber",
                column: "TicketId",
                principalTable: "Ticket",
                principalColumn: "TicketId",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_TicketTag_Ticket_TicketId",
                table: "TicketTag",
                column: "TicketId",
                principalTable: "Ticket",
                principalColumn: "TicketId",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId",
                table: "AspNetUserClaims",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId",
                table: "AspNetUserLogins",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserRole<string>_IdentityRole_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserRole<string>_ApplicationUser_UserId",
                table: "AspNetUserRoles",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
