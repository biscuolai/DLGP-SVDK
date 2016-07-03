(function () {
    'use strict';

    angular
        .module('app')
        .controller('ticketController', ['$http', '$controller', '$location', '$scope', '$filter', 'MessageService', '$timeout',
            ticketController]);

    //AngularJS controller method
    function ticketController($http, $controller, $location, $scope, $filter, MessageService, $timeout) {

        $scope.initFirst = function () {
            if ((($location.search().action !== undefined) && ($location.search().action === 'edit')) &&
                (($location.search().id !== undefined) && ($location.search().id > 0))) {
                // query parameter existing and get Ticket by TicketId
                $http.get('/api/tickets/' + $location.search().id).success(function (data) {
                    // success
                    $scope.Ticket = data.data;
                    $scope.originalTicket = angular.copy($scope.Ticket);

                    // Load all dropdownlists and set all values according this specific record
                    LoadAllDropDownLists(true, $location.search().id);
                    // Load all events from ticket 
                    GetAllEventsByTicketId($location.search().id);
                    // Clear all MessageService.addAlert messages 
                    MessageService.clearAlert();

                    // reset all flags
                    $scope.resetVariables();

                    $scope.isMoreInfo = ($scope.Ticket.status.name.toUpperCase() === "PENDING - REQUEST FOR INFORMATION");
                    $scope.isResolved = ($scope.Ticket.status.name.toUpperCase() === "RESOLVED");
                    $scope.isCancelled = ($scope.Ticket.status.name.toUpperCase() === "CANCELLED");
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
        }
       
        //To Get all Ticket records  
        function GetAllTickets() {
            $http.get('/api/tickets').success(function (Ticket) {
                $scope.Tickets = Ticket.data;
            })
            .error(function () {
                // show in alerts error message
                MessageService.clearAlert();
                MessageService.addAlert('An error has occured while loading list of all tickets!', 'danger');
            });
        }

        //To Get all Ticket events records for an existing ticket  
        function GetAllEventsByTicketId(id) {
            $http.get('/api/tickets/' + id + '/events').success(function (Events) {
                debugger;
                $scope.Events = Events.data;
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
                $scope.ContactType = {
                    availableOptions: ContactType.data,
                    selectedOption: ContactType.data[0]
                };

                if (findItems === true) {
                    $scope.ContactType.selectedOption = $filter('filter')($scope.ContactType.availableOptions, { contactTypeId: $scope.Ticket.contactTypeId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                MessageService.clearAlert();
                MessageService.addAlert('An error has occured while loading contact type drop down list!', 'danger');
            });
            $http.get('/api/values/category').success(function (Category) {
                $scope.Category = {
                    availableOptions: Category.data,
                    selectedOption: Category.data[0]
                };

                if (findItems === true) {
                    $scope.Category.selectedOption = $filter('filter')($scope.Category.availableOptions, { categoryId: $scope.Ticket.categoryId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                MessageService.addAlert('An error has occured while loading category drop down list!', 'danger');
            });
            $http.get('/api/values/configurationitem').success(function (ConfigurationItem) {
                $scope.ConfigurationItem = {
                    availableOptions: ConfigurationItem.data,
                    selectedOption: ConfigurationItem.data[0]
                };

                if (findItems === true) {
                    $scope.ConfigurationItem.selectedOption = $filter('filter')($scope.ConfigurationItem.availableOptions, { configurationItemId: $scope.Ticket.configurationItemId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                MessageService.addAlert('An error has occured while loading configuration item drop down list!', 'danger');
            });
            $http.get('/api/values/ticketstatus/' + id).success(function (TicketStatus) {
                $scope.TicketStatus = {
                    availableOptions: TicketStatus.data,
                    selectedOption: TicketStatus.data[0]
                };

                if (findItems === true) {
                    $scope.TicketStatus.selectedOption = $filter('filter')($scope.TicketStatus.availableOptions, { ticketStatusId: $scope.Ticket.ticketStatusId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                MessageService.addAlert('An error has occured while loading ticket status drop down list!', 'danger');
            });
            $http.get('/api/values/priority').success(function (Priority) {

                $scope.Priority = {
                    availableOptions: Priority.data,
                    selectedOption: Priority.data[0]
                };

                if (findItems === true) {
                    $scope.Priority.selectedOption = $filter('filter')($scope.Priority.availableOptions, { priorityId: $scope.Ticket.priorityId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                MessageService.addAlert('An error has occured while loading priority drop down list!', 'danger');
            });
            $http.get('/api/projects').success(function (Project) {
                $scope.Projects = {
                    availableOptions: Project.data,
                    selectedOption: Project.data[0]
                };
                if (findItems === true) {
                    $scope.Projects.selectedOption = $filter('filter')($scope.Projects.availableOptions, { projectId: $scope.Ticket.projectId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                MessageService.addAlert('An error has occured while loading project drop down list!', 'danger');
            });
            $http.get('/api/admin/users').success(function (User) {

                $scope.Users = {
                    availableOptions: User.data,
                    selectedOption: User.data[0]
                };
                if (findItems === true) {
                    $scope.Users.selectedOption = $filter('filter')($scope.Users.availableOptions, { id: $scope.Ticket.assignedTo })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                MessageService.addAlert('An error has occured while loading assigned to drop down list!', 'danger');
            });
        }

        $scope.editTicket = function (Ticket) {
            // get Ticket by TicketId
            $http.get('/api/tickets/' + Ticket.ticketId).success(function (data) {
                // success
                $scope.Ticket = data.data;

                LoadAllDropDownLists(true, Ticket.ticketId);

                $location.path('/editTicket'); //redirect to edit Ticket template
            })
            .error(function () {
                // show in alerts error message
                MessageService.addAlert('An error has occured while loading ticket id = ' + Ticket.ticketId, 'danger');
            });
        }

        $scope.deleteTicket = function (Ticket) {
            var getTicketData = DeleteTicket(Ticket.Id);
            getTicketData.then(function (msg) {
                MessageService.addAlert(msg.data);
                GetAllTickets();
            }, function () {
                MessageService.addAlert('Error in deleting Ticket record', 'success');
            });
        }

        function ClearFields() {
            if ($scope.Ticket !== undefined) {
                $scope.Ticket.projectId = "";
                $scope.Ticket.contactTypeId = "";
                $scope.Ticket.categoryId = "";
                $scope.Ticket.configurationItemId = "";
                $scope.Ticket.title = "";
                $scope.Ticket.details = "";
                $scope.Ticket.tagList = "";
                $scope.Ticket.assignedTo = "";
                $scope.Ticket.ticketStatusId = "";
                $scope.Ticket.priorityId = "";
            }
        }

        $scope.cancel = function () {
            if ($scope.isTicketChanged()) {
                BootstrapDialog.confirm({
                    title: 'Warning',
                    message: 'There is unsaved data. Do you still want to cancel?',
                    type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                    closable: true, // <-- Default value is false
                    draggable: true, // <-- Default value is false
                    btnCancelLabel: 'No', // <-- Default value is 'Cancel',
                    btnOKLabel: 'Yes', // <-- Default value is 'OK',
                    btnOKClass: 'btn-warning', // <-- If you didn't specify it, dialog type will be used,
                    callback: function (result) {
                        // result will be true if button was click, while it will be false if users close the dialog directly.
                        if (result) {
                            $scope.resetVariables();
                            $scope.initFirst();
                        } 
                    }
                });
            }
            else {
                $scope.resetVariables();
            }
        };

        $scope.isTicketChanged = function () {
            return !angular.equals($scope.originalTicket, $scope.Ticket);
        };

        $scope.resetVariables = function () {
            $scope.isEditing = false;
            $scope.isAssigning = false;
            $scope.isRequestInfo = false;
            $scope.isSupplyInfo = false;
            $scope.isCancelInfo = false;
            $scope.isAddingComment = false;
        };

        $scope.back = function () {
            $scope.isEditing = false;
            $scope.isAssigning = false;
            ClearFields();
            //$location.path('/'); // cancel and redirect to dashboard
            window.history.back();
        };

        $scope.searchTicket = ""; // set the default search / filter term to empty string

        //Edit/Update operation
        $scope.UpdateTicket = function (Ticket) {

            // if the user is trying to resolve or cancel the ticket through edit ticket option
            if (($scope.TicketStatus.selectedOption.name.toUpperCase() == 'CANCELLED' ||
                $scope.TicketStatus.selectedOption.name.toUpperCase() == 'RESOLVED') &&
               (Ticket.comments === undefined || Ticket.comments.trim() === ''))
            {
                MessageService.clearAlert();
                MessageService.addAlert('Please confirm all information in Resolution Tab before resolving or cancelling a ticket.', 'danger');
                return false;
            }

            // read fresh data from all dropdownlists
            Ticket.projectId = $scope.Projects.selectedOption.projectId;
            Ticket.contactTypeId = $scope.ContactType.selectedOption.contactTypeId;
            Ticket.categoryId = $scope.Category.selectedOption.categoryId;
            Ticket.configurationItemId = $scope.ConfigurationItem.selectedOption.configurationItemId;
            Ticket.ticketStatusId = $scope.TicketStatus.selectedOption.ticketStatusId;
            Ticket.priorityId = $scope.Priority.selectedOption.priorityId;

            // unassigned ticket - check all 
            try {
                Ticket.assignedTo = $scope.Users.selectedOption.id;
            } catch (e) {
                // ticket is unassigned
                Ticket.assignedTo = null;
            }

            Ticket.isEditing = $scope.isEditing;
            Ticket.isRequestInfo = $scope.isRequestInfo;
            Ticket.isSupplyInfo = $scope.isSupplyInfo;
            Ticket.isCancelInfo = $scope.isCancelInfo;
            Ticket.isAssigning = $scope.isAssigning;
            Ticket.isAddingComment = $scope.isAddingComment;
            Ticket.currentStatusDate = new Date();
            Ticket.currentStatusSetBy = $scope.globals.currentUser.userData.userName;
            Ticket.lastUpdateBy = $scope.globals.currentUser.userData.userName;
            Ticket.lastUpdateDate = new Date();

            $http.put('/api/tickets/' + Ticket.ticketId, Ticket).success(function (data) {
                //$scope.Tickets.push(data);
                //GetAllTickets();
                //ClearFields();
                //$scope.resetVariables();
                //$location.path('/'); // Updated successfully and redirect to dashboard

                // call the initFirst function which will reload data and take care of all memory variables
                $scope.initFirst();

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
        $scope.AddTicket = function (Ticket) {

            if (Ticket !== undefined) {
                // read fresh data from all dropdownlists
                Ticket.projectId = $scope.Projects.selectedOption.projectId;
                Ticket.contactTypeId = $scope.ContactType.selectedOption.contactTypeId;
                Ticket.categoryId = $scope.Category.selectedOption.categoryId;
                Ticket.configurationItemId = $scope.ConfigurationItem.selectedOption.configurationItemId;
                Ticket.ticketStatusId = $scope.TicketStatus.selectedOption.ticketStatusId;
                Ticket.priorityId = $scope.Priority.selectedOption.priorityId;

                // unassigned ticket
                if ($scope.Users !== undefined && $scope.Users.selectedOption !== null && $scope.Users.selectedOption.id !== null) {
                    Ticket.assignedTo = $scope.Users.selectedOption.id;
                }

                Ticket.createdBy = $scope.globals.currentUser.userData.userName;
                Ticket.createdDate = new Date();
                Ticket.currentStatusDate = new Date();
                Ticket.currentStatusSetBy = $scope.globals.currentUser.userData.userName;
                Ticket.lastUpdateBy = $scope.globals.currentUser.userData.userName;
                Ticket.lastUpdateDate = new Date();
                Ticket.owner = $scope.globals.currentUser.userData.userName;

                $http.post('/api/tickets', Ticket).success(function (data) {
                    //$scope.Tickets.push(data);
                    //GetAllTickets();
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
        $scope.DeleteTicket = function (Ticket) {
            $http.delete('/api/tickets/' + Ticket.TicketID).success(function (data) {
                MessageService.addAlert("Deleted successfully!");
                $http.get('/api/tickets').success(function (data) {
                    $scope.Tickets = data;                    
                })
            }).error(function (data) {
                $scope.error = "An error has occured while deleting! " + data;                
            });
        };

        $scope.edit = function () {
            // set the variable isEditing to true and enable fields for editing 
            // Also the comments textarea field is set to visible
            $scope.isEditing = true;
            $scope.isAssigning = false;
            $scope.isRequestInfo = false;
            $scope.isSupplyInfo = false;
            $scope.isCancelInfo = false;
            $scope.isAddingComment = false;

            $scope.commentLabel = "Edit Ticket";

            $scope.scrollToComments();
        };

        $scope.updateStatusComment = function () {
            // if user selects cancelled or resolved as statuses, the label for comment text area will be resolution, otherwise continue as Edit Ticket
            if ($scope.TicketStatus.selectedOption.name.toUpperCase() === 'CANCELLED' || $scope.TicketStatus.selectedOption.name.toUpperCase() === 'RESOLVED') {
                $scope.commentLabel = "Resolution";
            }
            else {
                $scope.commentLabel = "Edit Ticket";
            }

            // set the status using the selected option id
            Ticket.ticketStatus = TicketStatus.selectedOption.ticketStatusId
        };

        $scope.moreInfo = function (flag) {
            // set the variable isRequestInfo to true and enable fields for editing 
            // Also the comments textarea field is set to visible
            $scope.isEditing = false;
            $scope.isAssigning = false;
            $scope.isRequestInfo = (flag === 'R');
            $scope.isSupplyInfo = (flag === 'S');
            $scope.isCancelInfo = (flag === 'C');
            $scope.isAddingComment = false;
            if (flag === 'R') $scope.commentLabel = "Request For Information";
            else if (flag === 'S') $scope.commentLabel = "Supply More Information";
            else if (flag === 'C') $scope.commentLabel = "Cancel More Information";

            $scope.scrollToComments();
        };

        $scope.assign = function () {
            // set the variable isAssigning to true and enable all fields for editing 
            // Also the comments textarea field is set to visible
            $scope.isEditing = false;
            $scope.isAssigning = true;
            $scope.isRequestInfo = false;
            $scope.isSupplyInfo = false;
            $scope.isCancelInfo = false;
            $scope.isAddingComment = false;
            $scope.commentLabel = "Assign Ticket";

            $scope.scrollToComments();
        };

        $scope.addComment = function () {
            // set the variable isAddingComment to true and enable all fields for editing 
            // Also the comments textarea field is set to visible
            $scope.isEditing = false;
            $scope.isAssigning = false;
            $scope.isRequestInfo = false;
            $scope.isSupplyInfo = false;
            $scope.isCancelInfo = false;
            $scope.isAddingComment = true;
            $scope.commentLabel = "Add New";

            $scope.scrollToComments();
        };

        $scope.editAttachments = function () {
            $location.path('/attachments');
        };

        $scope.scrollToComments = function () {
            // scroll to comments control
            $timeout(function () {
                var element = document.getElementById('comments');
                $('html,body').animate({ scrollTop: $(element).offset().top }, "slow");
                $(element).focus();
            }, 200);
        }
    }
})();
