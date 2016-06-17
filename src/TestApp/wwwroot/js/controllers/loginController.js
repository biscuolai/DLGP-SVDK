(function () {
    'use strict';

    angular.module('Authentication')
    .controller('loginController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService', 'MessageService',
            function ($scope, $rootScope, $location, AuthenticationService, MessageService) {

            // reset login status
            AuthenticationService.ClearCredentials();

            $scope.login = function () {

                $scope.dataLoading = true;
                AuthenticationService.Login($scope.username, $scope.password, function (response) {

                    if (response.success) {

                        AuthenticationService.SetCredentials($scope.username, $scope.password, response.data);
                        $location.path('/');

                        // alert message on the top of the main screen
                        MessageService.addAlert(response.message, 'success');
                    } else {

                        // alert message on the top of login screen
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }

                });
            };
        }]);
})();
