(function () {
    'use strict';

    angular
        .module('app')
        .controller('alertsController', ['$scope', alertsController]);

    function alertsController($scope) {
        $scope.alerts = [{
            type: 'success',
            msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
        }, {
            type: 'danger',
            msg: 'Found a bug? Create an issue with as many details as you can.'
        }];

        $scope.addAlert = function (message, alertType) {
            $scope.alerts.push({
                type: alertType,
                msg: message
            });
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.clearAlert = function () {
            $scope.alerts = [];
        };
    }
})();