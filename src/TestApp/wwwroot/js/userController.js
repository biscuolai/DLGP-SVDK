(function () {
    'use strict';

    angular
        .module('app')
        .controller('userController', userController);

    userController.$inject = ['$http']; 

    function userController($http) {
        /* jshint validthis:true */
        var vm = this;

        vm.users = [];

        vm.errorMessage = "";

        $http.get("/api/users")
            .then(function (response) {
                // success
                angular.copy(response.data, vm.users);
            }, function (error) {
                // failure
                vm.errorMessage = "Failed to Load" + error;
            });
    }
})();
