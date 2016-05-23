(function () {
    'use strict';

    angular
        .module('app')
        .controller('pipeCtrl', ['Resource', function (service) {

            var ctrl = this;

            this.displayed = [];

            this.callServer = function callServer(tableState) {

                ctrl.isLoading = true;

                var pagination = tableState.pagination;

                var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
                var number = pagination.number || 10;  // Number of entries showed per page.

                service.getPage(start, number, tableState).then(function (result) {
                    ctrl.displayed = result.data;
                    tableState.pagination.numberOfPages = result.numberOfPages;//set the number of pages so the pagination can update
                    ctrl.isLoading = false;
                });
            };
        }])
        .filter('myStrictFilter', function ($filter) {
            return function (input, predicate) {
                return $filter('filter')(input, predicate, true);
            }
        })
        .filter('unique', function () {
            return function (arr, field) {
                var o = {}, i, l = arr.length, r = [];
                for (i = 0; i < l; i += 1) {
                    o[arr[i][field]] = arr[i];
                }
                for (i in o) {
                    r.push(o[i]);
                }
                return r;
            };
        });
})();
