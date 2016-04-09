(function () {
    'use strict';

    angular
        .module('app')
        .controller('ticketController', ticketController);

    ticketController.$inject = ['$http'];

    function ticketController($http) {
        /* jshint validthis:true */
        var vm = this;

        vm.tickets = [];

        vm.errorMessage = "";
        vm.isBusy = true;

        $http.get("/api/tickets")
            .then(function (response) {
                // success
                angular.copy(response.data.data, vm.tickets);

                vm.errorMessage = "Successfully loaded " + vm.tickets;
            }, function (error) {
                // failure
                vm.errorMessage = "Failed to Load " + error;
            })
            .finally(function () {
                vm.isBusy = false;
            });
    }
})();
