(function () {
    'use strict';

    angular
        .module('app')
        .controller('datagridController', ['Resource', '$location', function (Resource, $location) {

            var ctrl = this;

            ctrl.StatusViews = [
                { id: 0, name: 'All Tickets' },
                { id: 1, name: 'My Tickets' },
                { id: 2, name: 'All New Tickets' },
                { id: 3, name: 'All Open Tickets' },
                { id: 4, name: 'All Pending Tickets' },
                { id: 5, name: 'All Closed Tickets' }
            ];

            this.displayed = [];

            this.callServer = function callServer(tableState) {

                ctrl.isLoading = true;

                ctrl.query = '';

                var pagination = tableState.pagination;

                var start = pagination.start || 0;      // This is NOT the page number, but the index of item in the list that you want to use to display the table.
                var number = pagination.number || 5;    // Number of entries showed per page.

                Resource.getPage(start, number, tableState).then(function (result) {
                    ctrl.displayed = result.data;
                    tableState.pagination.numberOfPages = result.numberOfPages; //set the number of pages so the pagination can update
                    ctrl.isLoading = false;
                });
            };

            this.submitSearch = function (query) {
                // place ajax http code here
                this.queryResponse = query;
            };

            this.showTicketList = function (id) {

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
                        ctrl.queryResponse.assignedTo = '';
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

            // get the id of the view if it exists
            if ($location.search().id !== undefined) {
                ctrl.id = parseInt($location.search().id);
                this.showTicketList(ctrl.id);
            }
            else {
                ctrl.selectedItem = 'My Tickets';
            }

        }])
})();
