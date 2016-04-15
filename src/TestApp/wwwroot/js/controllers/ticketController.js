(function () {
    'use strict';

    angular
        .module('app')
        .controller('ticketController', ['$http', '$scope', '$controller', '$location', ticketController]);

    function ticketController($http, $scope, $controller, $location) {

        var vm = this;

        $scope.tickets = [];

        $scope.showHints = false;

        $scope.errorMessage = "";
        $scope.isBusy = true;

        // datagrid configuration
        vm.config = {
            itemsPerPage: 5,
            fillLastPage: true
        };

        // sort and search variables
        $scope.sortType = 'TicketId';  // set the default sort type to Ticket Id
        $scope.sortReverse = true;     // set the default sort order to Ascending
        vm.searchTicket = "";                // set the default search / filter term to empty string

        $scope.details = "";
        $scope.tags = "";

        // ticket category
        $scope.projects = [
            { id: 1, name: 'Project1' },
            { id: 2, name: 'Project2' },
            { id: 3, name: 'Project3' }
        ];
        $scope.selectedProject = { id: 1, name: 'Project1' };

        // ticket category
        $scope.ticketCategory = [
            { id: 0, name: 'Bug' },
            { id: 1, name: 'Enhancement' },
            { id: 2, name: 'Request For Information' }
        ];
        $scope.selectedTicketCategory = { id: 0, name: 'Bug' };

        // ticket contact type
        $scope.ticketContactType = [
            { id: 0, name: 'Email' },
            { id: 1, name: 'Phone' },
            { id: 2, name: 'Portal' }
        ];
        $scope.selectedTicketContactType = { id: 2, name: 'Portal' };

        // ticket configuration item
        $scope.ticketConfigurationItem = [
            { id: 0, name: 'ConfigurationItem1' },
            { id: 1, name: 'ConfigurationItem2' },
            { id: 2, name: 'ConfigurationItem3' }
        ];
        $scope.selectedTicketConfigurationItem = { id: 1, name: 'ConfigurationItem1' };

        // ticket Priority
        $scope.ticketPriority = [
            { id: 0, name: '1 - Critical' },
            { id: 1, name: '2 - High' },
            { id: 2, name: '3 - Medium' },
            { id: 3, name: '4 - Low' }
        ];
        $scope.selectedTicketPriority = { id: 3, name: '4 - Low' };

        // Assigned To
        $scope.ticketAssignedTo = [
            { id: 0, name: 'Ilson Biscuola' },
            { id: 1, name: 'Wesley Sim' },
            { id: 2, name: 'Phil Wiles' },
            { id: 3, name: 'Jonathan Rowlands' }
        ];
        $scope.selectedTicketAssignedTo = { id: 0, name: 'Ilson Biscuola' };

        // Ticket Status
        $scope.ticketStatus = [
            { id: 0, name: 'New' },
            { id: 1, name: 'Open' },
            { id: 2, name: 'Pending - Request for Information' },
            { id: 3, name: 'Pending - On Hold' },
            { id: 4, name: 'Ready For Test' },
            { id: 5, name: 'Resolved' },
            { id: 6, name: 'Cancelled' }
        ];
        $scope.selectedTicketStatus = { id: 0, name: 'New' };

        $http.get("/api/tickets")
            .then(function (response) {
                // success
                angular.copy(response.data.data, $scope.tickets);

                $scope.errorMessage = "Successfully loaded " + $scope.tickets;
            }, function (error) {
                // failure
                $scope.errorMessage = "Failed to Load " + error;
            })
            .finally(function () {
                $scope.isBusy = false;
            });

        $scope.sendPost = function () {
            var value = {
                'projectId': $scope.selectedProject.id,
                'contactTypeId': $scope.selectedTicketContactType.id,
                'categoryId': $scope.selectedTicketCategory.id,
                'configurationItemId': $scope.selectedTicketConfigurationItem.id,
                'title': $scope.title,
                'details': $scope.details,
                'isHtml': true,
                'tagList': $scope.tags,
                'createdBy': "@User.Identity.GetUserName()",
                'createdDate': new Date(),
                'owner': "@User.Identity.GetUserName()",
                'assignedTo': $scope.selectedTicketAssignedTo.name,
                'ticketStatus': $scope.selectedTicketStatus.id,
                'currentStatusDate': new Date(),
                'currentStatusSetBy': "@User.Identity.GetUserName()",
                'lastUpdateBy': "@User.Identity.GetUserName()",
                'lastUpdateDate': new Date(),
                'priority': $scope.selectedTicketPriority.id
            };

            $http.post('/api/tickets', value);

            vm.ticketForm.$setPristine();
            vm.ticketForm.$setUntouched();
            $scope.title = "";
            $scope.details = "";
            $scope.tags = "";
            $scope.selectedProject = { id: 1, name: 'Project1' };
            $scope.selectedTicketCategory = { id: 0, name: 'Bug' };
            $scope.selectedTicketContactType = { id: 2, name: 'Portal' };
            $scope.selectedTicketConfigurationItem = { id: 1, name: 'ConfigurationItem1' };
            $scope.selectedTicketPriority = { id: 3, name: '4 - Low' };
            $scope.selectedTicketAssignedTo = { id: 0, name: 'Ilson Biscuola' };
            $scope.selectedTicketStatus = { id: 0, name: 'New' };

            ////You need to supply a scope while instantiating.
            ////Provide the scope, you can also do $scope.$new(true) in order to create an isolated scope.
            ////In this case it is the child scope of this scope.
            var alertCtrlViewModel = $scope.$new();
            $controller('alertsController', { $scope: alertCtrlViewModel });
            alertCtrlViewModel.clearAlert();
            $scope.ticketAlerts = alertCtrlViewModel.addAlert('A new ticket has been created successfully.', 'success'); //And call the method on the newScope.


            //$scope.addAlert = function () {
            //    $rootScope.$emit("addAlert", { message:'test', alertType:'success' });
            //}

            //window.location = '/dashboard.html';
            //window.location.reload();

            //$location.path('../templates/dashboard.html');

            //debugger;
        };


        $scope.viewby = 10;
        $scope.totalItems = $scope.tickets.length;
        $scope.currentPage = 4;
        $scope.itemsPerPage = $scope.viewby;
        $scope.maxSize = 5; //Number of pager buttons to show

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function () {
            console.log('Page changed to: ' + $scope.currentPage);
        };

        $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        }
    }
   
})();

