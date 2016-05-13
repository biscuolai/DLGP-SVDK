﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('ticketCRUDController', ['$http', '$scope', '$controller', '$location', '$rootScope', ticketCRUDController]);

    //AngularJS controller method
    function ticketCRUDController($http, $scope, $controller, $location, $rootScope) {

        GetAllTickets();

        //To Get all Ticket records  
        function GetAllTickets() {
            $http.get('/api/tickets').success(function (Ticket) {
                $rootScope.Tickets = Ticket.data;
            })
            .error(function () {
                $rootScope.error = "An Error has occured while loading tickets!";
            });
        }

        $rootScope.editTicket = function (Ticket) {
            // get Ticket by TicketId
            $http.get('/api/tickets/' + Ticket.ticketId).success(function (data) {
                // success
                $rootScope.Ticket = data.data;
                debugger;
                $rootScope.TicketId = $rootScope.Ticket.ticketId;
                $rootScope.ProjectId = $rootScope.Ticket.projectId;
                $rootScope.ContactTypeId = $rootScope.Ticket.contactTypeId;
                $rootScope.CategoryId = $rootScope.Ticket.categoryId;
                $rootScope.ConfigurationItemId = $rootScope.Ticket.configurationItemId;
                $rootScope.Title = $rootScope.Ticket.title;
                $rootScope.Details = $rootScope.Ticket.details;
                $rootScope.isHtml = $rootScope.Ticket.isHtml;
                $rootScope.TagList = $rootScope.Ticket.tagList;
                $rootScope.AssignedTo = $rootScope.Ticket.assignedTo;
                $rootScope.TicketStatus = $rootScope.Ticket.ticketStatus;
                $rootScope.Priority = $rootScope.Ticket.priority;
                $rootScope.Action = "Update";
                $rootScope.errorMessage = "Successfully loaded " + $rootScope.tickets;

                $location.path('/editTicket'); //redirect to edit Ticket template
            })
            .error(function () {
                $rootScope.error = "An Error has occured while loading ticket!";
                $rootScope.errorMessage = "Failed to Load " + error;
            });
        }

        $rootScope.AddUpdateTicket = function () {
            var Ticket = {
                Title: $rootScope.TicketTitle,
                Author: $rootScope.TicketAuthor,
                Publisher: $rootScope.TicketPublisher,
                Isbn: $rootScope.TicketIsbn
            };
            var getTicketAction = $rootScope.Action;

            if (getTicketAction == "Update") {
                Ticket.Id = $rootScope.TicketId;
                var getTicketData = updateTicket(Ticket);
                getTicketData.then(function (msg) {
                    GetAllTickets();
                    alert(msg.data);
                    $rootScope.divTicket = false;
                }, function () {
                    alert('Error in updating Ticket record');
                });
            } else {
                var getTicketData = AddTicket(Ticket);
                getTicketData.then(function (msg) {
                    GetAllTickets();
                    alert(msg.data);
                    $rootScope.divTicket = false;
                }, function () {
                    alert('Error in adding Ticket record');
                });
            }
        }

        $rootScope.AddTicketDiv = function () {
            ClearFields();
            $rootScope.Action = "Add";
        }

        $rootScope.deleteTicket = function (Ticket) {
            var getTicketData = DeleteTicket(Ticket.Id);
            getTicketData.then(function (msg) {
                alert(msg.data);
                GetAllTickets();
            }, function () {
                alert('Error in deleting Ticket record');
            });
        }

        function ClearFields() {
            $rootScope.TicketId = "";
            $rootScope.ProjectId = "";
            $rootScope.ContactTypeId = "";
            $rootScope.CategoryId = "";
            $rootScope.ConfigurationItemId = "";
            $rootScope.Title = "";
            $rootScope.Details = "";
            $rootScope.isHtml = "";
            $rootScope.TagList = "";
            $rootScope.AssignedTo = "";
            $rootScope.TicketStatus = "";
            $rootScope.Priority = "";
        }

        $rootScope.Cancel = function () {
            //$rootScope.divTicket = false;
        };

        $rootScope.searchTicket = ""; // set the default search / filter term to empty string

        //Select all Tickets
        function getTickets($http, $scope) {
            $http.get('/api/tickets').success(function (data) {
                $rootScope.Tickets = data;
            })
            .error(function () {
                $rootScope.error = "An Error has occured while loading tickets!";
            });
        };

        //Edit/Update operation
        $rootScope.updateTicket = function (Ticket) {                 
            $http.put('/api/tickets/' + Ticket.TicketID, Ticket).success(function (data) {
                alert("Updated successfully!");             
                $http.get('/api/tickets/').success(function (data) {
                    $rootScope.Tickets = data;
                    ClearFields();  
                })               
            }).error(function (data) {
                $rootScope.error = "An Error has occured while updating! " + data;                
            });
        };

        // Insert operation / add ticket
        $rootScope.AddTicket = function (Ticket) {        
            $http.post('/api/tickets', Ticket).success(function (data) {
                alert("Added successfully!!");                
                $rootScope.Tickets.push(data);
                ClearFields();                
            }).error(function (data) {
                $rootScope.error = "An error has occured while adding! " + data;                
            });
        };

        //Delete Ticket
        $rootScope.DeleteTicket = function (Ticket) {     
            $http.delete('/api/tickets/' + Ticket.TicketID).success(function (data) {
                alert("Deleted successfully!!");
                $http.get('/api/tickets').success(function (data) {
                    $rootScope.Tickets = data;                    
                })
            }).error(function (data) {
                $rootScope.error = "An error has occured while deleting! " + data;                
            });
        };
    }
})();
