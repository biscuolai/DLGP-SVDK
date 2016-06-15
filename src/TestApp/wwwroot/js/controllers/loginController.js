(function () {
    'use strict';

    angular.module('Authentication')
    .controller('loginController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService', 
        function ($scope, $rootScope, $location, AuthenticationService) {

            // reset login status
            AuthenticationService.ClearCredentials();

            $scope.login = function () {

                $scope.dataLoading = true;
                AuthenticationService.Login($scope.username, $scope.password, function (response) {

                    if (response.success) {

                        AuthenticationService.SetCredentials($scope.username, $scope.password, response.data);
                        $location.path('/');

                        // alert message on the top of the main screen
                        $rootScope.addAlert(response.message, 'success');
                    } else {

                        // alert message on the top of login screen
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }

                });
            };
        }]);
})();
