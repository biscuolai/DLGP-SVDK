(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', function ($scope) {
            $scope.users = angular.fromJson(localStorage.getItem('userStorage'));
        });
})();
