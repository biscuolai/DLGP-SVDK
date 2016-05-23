(function () {
    'use strict';

    angular
        .module('app')
        .factory('Resource', ['$http', '$q', '$filter', '$timeout', function ($http, $q, $filter, $timeout) {

        // the database (normally on your server)
        var randomsItems = [];

        GetAllTickets();

        //To Get all Ticket records  
        function GetAllTickets() {

            debugger;

            $http.get('/api/tickets').success(function (Ticket) {
                randomsItems = Ticket.data;
            })
            .error(function () {
                // reset variable
                randomsItems = [];
            });
        }

        function getPage(start, number, params) {

            var deferred = $q.defer();

            var filtered = params.search.predicateObject ? $filter('filter')(randomsItems, params.search.predicateObject) : randomsItems;

            if (params.sort.predicate) {
                filtered = $filter('orderBy')(filtered, params.sort.predicate, params.sort.reverse);
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
