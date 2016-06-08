(function () {
    'use strict';

    angular
        .module('app')
        .factory('Resource', ['$http', '$q', '$filter', '$timeout', function ($http, $q, $filter, $timeout) {

            // the database (normally on your server)
            var allTickets = [];

            GetAllTickets();

            //To Get all Ticket records  
            function GetAllTickets() {
                $http.get('/api/tickets').success(function (Ticket) {
                    allTickets = Ticket.data;
                })
                .error(function () {
                    // reset variable
                    allTickets = [];
                });
            }

            function getPage(start, number, params) {

                var deferred = $q.defer();

                var filtered = params.search.predicateObject ? $filter('filter')(allTickets, params.search.predicateObject) : allTickets;

                if (params.sort.predicate) {
                    filtered = $filter('orderBy')(filtered, params.sort.predicate, params.sort.reverse);
                }

                // set default number of records to a page = total of records if parameter 'number' is equal to zero
                if ((number === 0) && (filtered !== undefined) && (filtered.length > 0)) {
                    number = filtered.length;
                }

                var result = filtered.slice(start, start + number);

                $timeout(function () {
                    //note, the server passes the information about the data set size
                    deferred.resolve({
                        data: result,
                        numberOfPages: Math.ceil(filtered.length / number)
                    });
                }, 500);

                return deferred.promise;
            }

            return {
                getPage: getPage
            };

        }]);
})();
