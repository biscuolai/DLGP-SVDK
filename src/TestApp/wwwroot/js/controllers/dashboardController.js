(function () {
    'use strict';

    angular
        .module('app')
        .controller('ticketController', ['$http', '$controller', '$location', '$rootScope', 'Constants', '$filter', ticketController]);

    //AngularJS controller method
    function ticketController($http, $controller, $location, $rootScope, Constants, $filter) {

        if ((($location.search().action !== undefined) && ($location.search().action === 'edit')) &&
            (($location.search().id !== undefined) && ($location.search().id > 0))) {
            // query parameter existing and get Ticket by TicketId
            $http.get('/api/tickets/' + $location.search().id).success(function (data) {
                // success
                $rootScope.Ticket = data.data;

                // Load all dropdownlists and set all values according this specific record
                LoadAllDropDownLists(true);
                // Clear all alert messages 
                $rootScope.clearAlert();
            })
            .error(function () {
                // show in alerts error message
                $rootScope.clearAlert();
                $rootScope.addAlert('An error has occured while loading ticket id = ' + $location.search().id, 'danger'); 
            });
        }
        // no parameter has been passed, it can be a new ticket or dashboard page
        else {
            // it is a new ticket
            if (($location.search().action !== undefined) && ($location.search().action === 'new')) {
                // clear all fields 
                ClearFields();
                // Load all dropdownlists setting to default value
                LoadAllDropDownLists(false);
                // Clear all alert messages 
                $rootScope.clearAlert();
            }
            // Request is coming from dashboard page. Load all ticket records
            else {
                // define the variable alerts if it does not exists
                if ($rootScope.alerts === undefined) {
                    $rootScope.alerts = [];
                }

                // get the list of all tickets 
                GetAllTickets();
                // clear all parameters from URL
                $location.search('');
            }
        }
       
        //To Get all Ticket records  
        function GetAllTickets() {
            $http.get('/api/tickets').success(function (Ticket) {
                $rootScope.Tickets = Ticket.data;

                $rootScope.newTickets = 0;
                $rootScope.onHoldTickets = 0;
                $rootScope.pendingTickets = 0;
                $rootScope.openTickets = 0;

                for (var i = 0; i < $rootScope.Tickets.length; i++){
                    if ($rootScope.Tickets[i].ticketStatusId === Constants.TicketStatus['New']) { $rootScope.newTickets++ }
                    else if ($rootScope.Tickets[i].ticketStatusId === Constants.TicketStatus['Open']) { $rootScope.openTickets++ }
                    else if ($rootScope.Tickets[i].ticketStatusId === Constants.TicketStatus['PendingOnHold']) { $rootScope.onHoldTickets++ }
                    else if (($rootScope.Tickets[i].ticketStatusId === Constants.TicketStatus['PendingOnHold']) ||
                             ($rootScope.Tickets[i].ticketStatusId === Constants.TicketStatus['PendingRFI'])) { $rootScope.pendingTickets++ }
                }
            })
            .error(function () {
                // show in alerts error message
                $rootScope.clearAlert();
                $rootScope.addAlert('An error has occured while loading list of all tickets!', 'danger');
            });
        }

        function LoadAllDropDownLists(findItems) {
            $http.get('/api/values/contacttype').success(function (ContactType) {
                $rootScope.ContactType = {
                    availableOptions: ContactType.data,
                    selectedOption: ContactType.data[0]
                };

                if (findItems === true) {
                    $rootScope.ContactType.selectedOption = $filter('filter')($rootScope.ContactType.availableOptions, { contactTypeId: $rootScope.Ticket.contactTypeId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                $rootScope.clearAlert();
                $rootScope.addAlert('An error has occured while loading contact type drop down list!', 'danger');
            });
            $http.get('/api/values/category').success(function (Category) {
                $rootScope.Category = {
                    availableOptions: Category.data,
                    selectedOption: Category.data[0]
                };

                if (findItems === true) {
                    $rootScope.Category.selectedOption = $filter('filter')($rootScope.Category.availableOptions, { categoryId: $rootScope.Ticket.categoryId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                $rootScope.addAlert('An error has occured while loading category drop down list!', 'danger');
            });
            $http.get('/api/values/configurationitem').success(function (ConfigurationItem) {
                $rootScope.ConfigurationItem = {
                    availableOptions: ConfigurationItem.data,
                    selectedOption: ConfigurationItem.data[0]
                };

                if (findItems === true) {
                    $rootScope.ConfigurationItem.selectedOption = $filter('filter')($rootScope.ConfigurationItem.availableOptions, { configurationItemId: $rootScope.Ticket.configurationItemId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                $rootScope.addAlert('An error has occured while loading configuration item drop down list!', 'danger');
            });
            $http.get('/api/values/ticketstatus').success(function (TicketStatus) {
                $rootScope.TicketStatus = {
                    availableOptions: TicketStatus.data,
                    selectedOption: TicketStatus.data[0]
                };

                if (findItems === true) {
                    $rootScope.TicketStatus.selectedOption = $filter('filter')($rootScope.TicketStatus.availableOptions, { ticketStatusId: $rootScope.Ticket.ticketStatusId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                $rootScope.addAlert('An error has occured while loading ticket status drop down list!', 'danger');
            });
            $http.get('/api/values/priority').success(function (Priority) {
                $rootScope.Priority = {
                    availableOptions: Priority.data,
                    selectedOption: Priority.data[0]
                };

                if (findItems === true) {
                    $rootScope.Priority.selectedOption = $filter('filter')($rootScope.Priority.availableOptions, { priorityId: $rootScope.Ticket.priorityId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                $rootScope.addAlert('An error has occured while loading priority drop down list!', 'danger');
            });
            $http.get('/api/projects').success(function (Project) {
                $rootScope.Projects = {
                    availableOptions: Project.data,
                    selectedOption: Project.data[0]
                };
                if (findItems === true) {
                    $rootScope.Projects.selectedOption = $filter('filter')($rootScope.Projects.availableOptions, { projectId: $rootScope.Ticket.projectId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                $rootScope.addAlert('An error has occured while loading project drop down list!', 'danger');
            });
            $http.get('/api/admin/users').success(function (User) {
                $rootScope.Users = {
                    availableOptions: User.data,
                    selectedOption: User.data[0]
                };
                if (findItems === true) {
                    $rootScope.Users.selectedOption = $filter('filter')($rootScope.Users.availableOptions, { id: $rootScope.Ticket.assignedTo })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                $rootScope.addAlert('An error has occured while loading assigned to drop down list!', 'danger');
            });
        }

        $rootScope.editTicket = function (Ticket) {
            // get Ticket by TicketId
            $http.get('/api/tickets/' + Ticket.ticketId).success(function (data) {
                // success
                $rootScope.Ticket = data.data;

                LoadAllDropDownLists(true);

                $location.path('/editTicket'); //redirect to edit Ticket template
            })
            .error(function () {
                // show in alerts error message
                $rootScope.addAlert('An error has occured while loading ticket id = ' + Ticket.ticketId, 'danger');
            });
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
            if ($rootScope.Ticket !== undefined) {
                $rootScope.Ticket.projectId = "";
                $rootScope.Ticket.contactTypeId = "";
                $rootScope.Ticket.categoryId = "";
                $rootScope.Ticket.configurationItemId = "";
                $rootScope.Ticket.title = "";
                $rootScope.Ticket.details = "";
                $rootScope.Ticket.tagList = "";
                $rootScope.Ticket.assignedTo = "";
                $rootScope.Ticket.ticketStatusId = "";
                $rootScope.Ticket.priorityId = "";
                $rootScope.Ticket.assignedTo = "";
            }
        }

        $rootScope.cancel = function () {
            ClearFields();
            $location.path('/'); // cancel and redirect to dashboard
        };

        $rootScope.searchTicket = ""; // set the default search / filter term to empty string

        //Edit/Update operation
        $rootScope.UpdateTicket = function (Ticket) {

            // read fresh data from all dropdownlists
            Ticket.projectId = $rootScope.Projects.selectedOption.projectId;
            Ticket.contactTypeId = $rootScope.ContactType.selectedOption.contactTypeId;
            Ticket.categoryId = $rootScope.Category.selectedOption.categoryId;
            Ticket.configurationItemId = $rootScope.ConfigurationItem.selectedOption.configurationItemId;
            Ticket.ticketStatusId = $rootScope.TicketStatus.selectedOption.ticketStatusId;
            Ticket.priorityId = $rootScope.Priority.selectedOption.priorityId;
            Ticket.assignedTo = $rootScope.Users.selectedOption.id;

            $http.put('/api/tickets/' + Ticket.ticketId, Ticket).success(function (data) {
                GetAllTickets();
                ClearFields();
                $location.path('/'); // Updated successfully and redirect to dashboard

                // show in alerts that ticket has been updated successfully
                $rootScope.clearAlert();
                $rootScope.addAlert('Ticket ID = ' + Ticket.ticketId + ' has been updated successfully!', 'success'); // And call the method on the newScope.

            }).error(function (data) {
                // show in alerts error message
                $rootScope.clearAlert();
                $rootScope.addAlert('An error has occured while updating ticket id = ' + Ticket.ticketId, 'danger');
            });
        };

        // Insert operation / add ticket
        $rootScope.AddTicket = function (Ticket) {
            if (Ticket !== undefined) {
                // read fresh data from all dropdownlists
                Ticket.projectId = $rootScope.Projects.selectedOption.projectId;
                Ticket.contactTypeId = $rootScope.ContactType.selectedOption.contactTypeId;
                Ticket.categoryId = $rootScope.Category.selectedOption.categoryId;
                Ticket.configurationItemId = $rootScope.ConfigurationItem.selectedOption.configurationItemId;
                Ticket.ticketStatusId = $rootScope.TicketStatus.selectedOption.ticketStatusId;
                Ticket.priorityId = $rootScope.Priority.selectedOption.priorityId;
                Ticket.assignedTo = $rootScope.Users.selectedOption.id;
                Ticket.createdBy = "System";
                Ticket.createdDate = new Date();
                Ticket.currentStatusDate = new Date();
                Ticket.currentStatusSetBy = "biscuolai";
                Ticket.lastUpdateBy = "biscuolai";
                Ticket.lastUpdateDate = new Date();
                Ticket.owner = "ilson_biscuola@dialog.com.au";

                $http.post('/api/tickets', Ticket).success(function (data) {
                    //$rootScope.Tickets.push(data);
                    GetAllTickets();
                    $location.path('/'); // Added successfully and redirect to dashboard

                    // show in alerts that ticket has been added successfully
                    $rootScope.clearAlert();
                    $rootScope.addAlert('A new ticket has been added successfully!', 'success'); // And call the method on the newScope.

                }).error(function (data) {
                    // show in alerts error message
                    $rootScope.clearAlert();
                    $rootScope.addAlert('An error has occured while adding a new ticket!', 'danger');
                });
            }
        };

        //Delete Ticket
        $rootScope.DeleteTicket = function (Ticket) {     
            $http.delete('/api/tickets/' + Ticket.TicketID).success(function (data) {
                alert("Deleted successfully!");
                $http.get('/api/tickets').success(function (data) {
                    $rootScope.Tickets = data;                    
                })
            }).error(function (data) {
                $rootScope.error = "An error has occured while deleting! " + data;                
            });
        };

        $rootScope.addAlert = function (message, alertType) {
            $rootScope.alerts.push({
                type: alertType,
                msg: message
            });

            return $rootScope.alerts;
        };

        $rootScope.closeAlert = function (index) {
            $rootScope.alerts.splice(index, 1);
        };

        $rootScope.clearAlert = function () {
            $rootScope.alerts = [];
        };
    }
})();
