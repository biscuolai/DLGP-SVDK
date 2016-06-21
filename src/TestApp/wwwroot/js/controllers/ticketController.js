(function () {
    'use strict';

    angular
        .module('app')
        .controller('ticketController', ['$http', '$controller', '$location', '$rootScope', '$filter', 'MessageService', ticketController]);

    //AngularJS controller method
    function ticketController($http, $controller, $location, $rootScope, $filter, MessageService) {

        if ((($location.search().action !== undefined) && ($location.search().action === 'edit')) &&
            (($location.search().id !== undefined) && ($location.search().id > 0))) {
            // query parameter existing and get Ticket by TicketId
            $http.get('/api/tickets/' + $location.search().id).success(function (data) {
                // success
                $rootScope.Ticket = data.data[0];

                // Load all dropdownlists and set all values according this specific record
                LoadAllDropDownLists(true, $location.search().id);
                // Load all events from ticket 
                GetAllEventsByTicketId($location.search().id);
                // Clear all MessageService.addAlert messages 
                MessageService.clearAlert();

                // reset all flags
                $rootScope.cancel();

                $rootScope.isMoreInfo = ($rootScope.Ticket.status.name.toUpperCase() === "PENDING - REQUEST FOR INFORMATION");
            })
            .error(function () {
                // show in alerts error message
                MessageService.clearAlert();
                MessageService.addAlert('An error has occured while loading ticket id = ' + $location.search().id, 'danger');
            });
        }
        // no parameter has been passed, it can be a new ticket or dashboard page
        else {
            // it is a new ticket
            if (($location.search().action !== undefined) && ($location.search().action === 'new')) {
                // clear all fields 
                ClearFields();
                // Load all dropdownlists setting to default value
                LoadAllDropDownLists(false, null);
                // Clear all MessageService.addAlert messages 
                MessageService.clearAlert();
            }
            // Request is coming from dashboard page. Load all ticket records
            else {
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
            })
            .error(function () {
                // show in alerts error message
                MessageService.clearAlert();
                MessageService.addAlert('An error has occured while loading list of all tickets!', 'danger');
            });
        }

        //To Get all Ticket events records for an existing ticket  
        function GetAllEventsByTicketId(id) {
            $http.get('/api/tickets/events/' + id).success(function (Events) {
                $rootScope.Events = Events.data;
            })
            .error(function () {
                // show in alerts error message
                MessageService.clearAlert();
                MessageService.addAlert('An error has occured while loading list of all ticket events!', 'danger');
            });
        }

        // findItems (boolean) parameter is only when ticket already exists
        function LoadAllDropDownLists(findItems, id) {
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
                MessageService.clearAlert();
                MessageService.addAlert('An error has occured while loading contact type drop down list!', 'danger');
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
                MessageService.addAlert('An error has occured while loading category drop down list!', 'danger');
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
                MessageService.addAlert('An error has occured while loading configuration item drop down list!', 'danger');
            });
            $http.get('/api/values/ticketstatus/' + id).success(function (TicketStatus) {
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
                MessageService.addAlert('An error has occured while loading ticket status drop down list!', 'danger');
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
                MessageService.addAlert('An error has occured while loading priority drop down list!', 'danger');
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
                MessageService.addAlert('An error has occured while loading project drop down list!', 'danger');
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
                MessageService.addAlert('An error has occured while loading assigned to drop down list!', 'danger');
            });
        }

        $rootScope.editTicket = function (Ticket) {
            // get Ticket by TicketId
            $http.get('/api/tickets/' + Ticket.ticketId).success(function (data) {
                // success
                $rootScope.Ticket = data.data;

                LoadAllDropDownLists(true, Ticket.ticketId);

                $location.path('/editTicket'); //redirect to edit Ticket template
            })
            .error(function () {
                // show in alerts error message
                MessageService.addAlert('An error has occured while loading ticket id = ' + Ticket.ticketId, 'danger');
            });
        }

        $rootScope.deleteTicket = function (Ticket) {
            var getTicketData = DeleteTicket(Ticket.Id);
            getTicketData.then(function (msg) {
                MessageService.addAlert(msg.data);
                GetAllTickets();
            }, function () {
                MessageService.addAlert('Error in deleting Ticket record', 'success');
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
            }
        }

        $rootScope.cancel = function () {
            $rootScope.isEditing = false;
            $rootScope.isAssigning = false;
            $rootScope.isRequestInfo = false;
            $rootScope.isSupplyInfo = false;
            $rootScope.isCancelInfo = false;
            $rootScope.isAddingComment = false;
        };

        $rootScope.back = function () {
            $rootScope.isEditing = false;
            $rootScope.isAssigning = false;
            ClearFields();
            //$location.path('/'); // cancel and redirect to dashboard
            window.history.back();
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
            Ticket.isEditing = $rootScope.isEditing;
            Ticket.isRequestInfo = $rootScope.isRequestInfo;
            Ticket.isSupplyInfo = $rootScope.isSupplyInfo;
            Ticket.isCancelInfo = $rootScope.isCancelInfo;
            Ticket.isAssigning = $rootScope.isAssigning;
            Ticket.isAddingComment = $rootScope.isAddingComment;
            Ticket.currentStatusDate = new Date();
            Ticket.currentStatusSetBy = $rootScope.globals.currentUser.userData.userName;
            Ticket.lastUpdateBy = $rootScope.globals.currentUser.userData.userName;
            Ticket.lastUpdateDate = new Date();

            $http.put('/api/tickets/' + Ticket.ticketId, Ticket).success(function (data) {
                GetAllTickets();
                ClearFields();
                $rootScope.cancel();
                //$location.path('/'); // Updated successfully and redirect to dashboard

                // show in alerts that ticket has been updated successfully
                MessageService.clearAlert();
                MessageService.addAlert('Ticket ID = ' + Ticket.ticketId + ' has been updated successfully!', 'success'); // And call the method on the newScope.

            }).error(function (data) {
                // show in alerts error message
                MessageService.clearAlert();
                MessageService.addAlert('An error has occured while updating ticket id = ' + Ticket.ticketId, 'danger');
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
                Ticket.createdBy = $rootScope.globals.currentUser.userData.userName;
                Ticket.createdDate = new Date();
                Ticket.currentStatusDate = new Date();
                Ticket.currentStatusSetBy = $rootScope.globals.currentUser.userData.userName;
                Ticket.lastUpdateBy = $rootScope.globals.currentUser.userData.userName;
                Ticket.lastUpdateDate = new Date();
                Ticket.owner = $rootScope.globals.currentUser.userData.userName;

                debugger;

                $http.post('/api/tickets', Ticket).success(function (data) {
                    //$rootScope.Tickets.push(data);
                    GetAllTickets();
                    $location.path('/'); // Added successfully and redirect to dashboard

                    // show in alerts that ticket has been added successfully
                    MessageService.clearAlert();
                    MessageService.addAlert('A new ticket has been added successfully!', 'success'); // And call the method on the newScope.

                }).error(function (data) {
                    // show in alerts error message
                    MessageService.clearAlert();
                    MessageService.addAlert('An error has occured while adding a new ticket!', 'danger');
                });
            }
        };

        //Delete Ticket
        $rootScope.DeleteTicket = function (Ticket) {     
            $http.delete('/api/tickets/' + Ticket.TicketID).success(function (data) {
                MessageService.addAlert("Deleted successfully!");
                $http.get('/api/tickets').success(function (data) {
                    $rootScope.Tickets = data;                    
                })
            }).error(function (data) {
                $rootScope.error = "An error has occured while deleting! " + data;                
            });
        };

        $rootScope.edit = function () {
            // set the variable isEditing to true and enable fields for editing 
            // Also the comments textarea field is set to visible
            $rootScope.isEditing = true;
            $rootScope.isAssigning = false;
            $rootScope.isRequestInfo = false;
            $rootScope.isSupplyInfo = false;
            $rootScope.isCancelInfo = false;
            $rootScope.isAddingComment = false;
            $rootScope.commentLabel = "Edit Ticket";
        };
        $rootScope.moreInfo = function (flag) {
            // set the variable isRequestInfo to true and enable fields for editing 
            // Also the comments textarea field is set to visible
            debugger;
            $rootScope.isEditing = false;
            $rootScope.isAssigning = false;
            $rootScope.isRequestInfo = (flag === 'R');
            $rootScope.isSupplyInfo = (flag === 'S');
            $rootScope.isCancelInfo = (flag === 'C');
            $rootScope.isAddingComment = false;
            if (flag === 'R') $rootScope.commentLabel = "Request For Information";
            else if (flag === 'S') $rootScope.commentLabel = "Supply More Information";
            else if (flag === 'C') $rootScope.commentLabel = "Cancel More Information";
        };
        $rootScope.assign = function () {
            // set the variable isAssigning to true and enable all fields for editing 
            // Also the comments textarea field is set to visible
            $rootScope.isEditing = false;
            $rootScope.isAssigning = true;
            $rootScope.isRequestInfo = false;
            $rootScope.isSupplyInfo = false;
            $rootScope.isCancelInfo = false;
            $rootScope.isAddingComment = false;
            $rootScope.commentLabel = "Assign Ticket";
        };
        $rootScope.addComment = function () {
            // set the variable isAddingComment to true and enable all fields for editing 
            // Also the comments textarea field is set to visible
            $rootScope.isEditing = false;
            $rootScope.isAssigning = false;
            $rootScope.isRequestInfo = false;
            $rootScope.isSupplyInfo = false;
            $rootScope.isCancelInfo = false;
            $rootScope.isAddingComment = true;
            $rootScope.commentLabel = "Add New";
        };
    }
})();
