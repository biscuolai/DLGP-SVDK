(function () {
    'use strict';

    angular
        .module('app')
        .controller('datagridController', ['Resource', '$location', '$rootScope', function (Resource, $location, $rootScope) {

            var ctrl = this;

            if ($location.search().action !== undefined) {
                ctrl.selectedAction = parseInt($location.search().action);
            }
            else {
                ctrl.selectedAction = 0;
            }

            if ($location.search().items !== undefined && $location.search().items !== "0") {
                ctrl.itemsPerPage = parseInt($location.search().items);
            }
            else {
                ctrl.itemsPerPage = 500;
            }

            ctrl.StatusViews = [
                { id: 0, name: 'All Tickets' },
                { id: 1, name: 'My Tickets' },
                { id: 2, name: 'All New Tickets' },
                { id: 3, name: 'All Open Tickets' },
                { id: 4, name: 'All Pending Tickets' },
                { id: 5, name: 'All Closed Tickets' }
            ];

            this.displayed = [];

            this.pipeFunction = function (tableState, varCtrl) {

                

                if (!ctrl.stCtrl && varCtrl) {
                    ctrl.stCtrl = varCtrl;
                }

                if (!tableState && ctrl.stCtrl) {
                    //ctrl.stCtrl.pipe();
                    return;
                }

                var pagination = tableState.pagination;

                var start = pagination.start || 0;                      // This is NOT the page number, but the index of item in the list that you want to use to display the table.
                var number = pagination.number || ctrl.itemsPerPage;    // Number of entries showed per page.



                //tableState.start = tablestate.pagination.start || 0;
                //tableState.number = tablestate.pagination.number || ctrl.itemsPerPage;

                ctrl.isLoading = true;

                ctrl.query = '';

                // get data
                Resource.getPage(start, number, tableState).then(function (result) {
                    ctrl.displayed = result.data;
                    tableState.pagination.numberOfPages = result.numberOfPages; //set the number of pages so the pagination can update
                    ctrl.isLoading = false;
                });
            }

            //this.callServer = function callServer(tableState) {

            //    ctrl.isLoading = true;

            //    ctrl.query = '';

            //    var pagination = tableState.pagination;

            //    var start = pagination.start || 0;                      // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            //    var number = pagination.number || ctrl.itemsPerPage;    // Number of entries showed per page.

            //    Resource.getPage(start, number, tableState).then(function (result) {
            //        ctrl.displayed = result.data;
            //        tableState.pagination.numberOfPages = result.numberOfPages; //set the number of pages so the pagination can update
            //        ctrl.isLoading = false;
            //    });
            //};

            this.submitSearch = function (query) {
                // place ajax http code here
                this.queryResponse = query;
            };

            this.showTicketList = function (id, itemsPerPage) {
                ctrl.selectedAction = id;
                ctrl.itemsPerPage = itemsPerPage;

                ctrl.queryResponse =
                    {
                        status: '',
                        assignedTo: ''
                    };

                ctrl.selectedItem = ctrl.StatusViews[id].name;
                ctrl.queryResponse.assignedTo = '';
                switch (id) {
                    // all tickets
                    case 0:
                        ctrl.queryResponse.status = '';
                        break;
                        // my tickets
                    case 1:
                        ctrl.queryResponse.status = '';
                        ctrl.queryResponse.assignedTo = $rootScope.globals.currentUser.userData.id;
                        break;
                        // all new tickets
                    case 2:
                        ctrl.queryResponse.status = 'new';
                        break;
                        // all open tickets
                    case 3:
                        ctrl.queryResponse.status = 'open';
                        break;
                        // all pending tickets
                    case 4:
                        ctrl.queryResponse.status = 'Pending - Request for Information';
                        break;
                        // all closed tickets
                    case 5:
                        ctrl.queryResponse.status = 'closed';
                        break;
                    default:
                        //
                        break;
                }
            }

            ctrl.initFirst = function () {
                // load data for first time
                this.pipeFunction(null, ctrl);

                // show all tickets, set 25 items per page as default.
                ctrl.selectedItem = 'All Tickets';
                this.showTicketList(0, 25);
            }
        }])
})();
