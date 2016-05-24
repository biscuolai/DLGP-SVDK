(function () {
    'use strict';

    angular
        .module('app')
        .controller('pipeController', ['Resource', function (service) {

            var ctrl = this;

            ctrl.selectedPredicate = 'status.name';

            ctrl.StatusViews = [
                { id: 0, name: 'All Tickets' },
                { id: 1, name: 'My Tickets' },
                { id: 2, name: 'All New Tickets' },
                { id: 2, name: 'All Open Tickets' },
                { id: 2, name: 'All Pending Tickets' },
                { id: 2, name: 'All Closed Tickets' }
            ];

            //this.status = { name : '' };

            this.displayed = [];

            this.callServer = function callServer(tableState) {

                ctrl.isLoading = true;

                var pagination = tableState.pagination;

                // setting predicateObject as Ticket Status selected
                //if (tableState.search.predicateObject === undefined) {
                //    tableState.search.predicateObject = {};
                //}
                //if ((ctrl.status !== undefined) && (ctrl.status !== '') && (ctrl.status !== 'All')) {
                //    tableState.search.predicateObject.status = ctrl.status;
                //}

                var start = pagination.start || 0;      // This is NOT the page number, but the index of item in the list that you want to use to display the table.
                var number = pagination.number || 5;    // Number of entries showed per page.

                service.getPage(start, number, tableState).then(function (result) {
                    ctrl.displayed = result.data;
                    tableState.pagination.numberOfPages = result.numberOfPages; //set the number of pages so the pagination can update
                    ctrl.isLoading = false;
                });
            };

            //this.setTicketStatus = function setTicketStatus(status) {
            //    ctrl.status.name = status;
            //}

            this.showTicketList = function showTicketList(id) {

                debugger;

                switch(id)
                {
                    // all tickets
                    case 0:
                        ctrl.selectedPredicate = '';
                        ctrl.selectedPredicateValue = '';
                        break;
                    // my tickets
                    case 1:
                        ctrl.selectedPredicate = '';
                        ctrl.selectedPredicateValue = '';
                        break;
                    // all new tickets
                    case 2:
                        ctrl.selectedPredicateValue = '';
                        ctrl.selectedPredicate = 'status.name';
                        ctrl.selectedPredicateValue = 'new';
                        break;
                    default:
                        //
                        break;
                }
            }

        }])
        //.filter('datagridFilter', function ($filter) {
        //    return function (input, predicate) {
        //        return $filter('filter')(input, predicate, true);
        //    }
        //})
        //.filter('unique', function () {
        //    return function (arr, field) {
        //        var o = {}, i, l = arr.length, r = [], property = '', subProperty = '';
        //        if (field.indexOf('.') != -1) {
        //            var res = field.split('.');
        //            property = res[0];
        //            subProperty = res[1];
        //        }
        //        for (i = 0; i < l; i++) {
        //            if (property !== '') {
        //                o[arr[i][property][subProperty]] = arr[i];
        //            }
        //            else {
        //                o[arr[i][field]] = arr[i];
        //            }
        //        }

        //        // push all values to unique dropdown list
        //        for (i in o) {
        //            r.push(o[i]);
        //        }

        //        return r;
        //    };
    //});

})();
