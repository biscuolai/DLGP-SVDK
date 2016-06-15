(function () {
    'use strict';

    angular.module('Authentication')
    .controller('resetPasswordController',
        ['$scope', '$location', 'AuthenticationService', '$http',
        function ($scope, $location, AuthenticationService, $http) {
                
            // reset login status
            AuthenticationService.ClearCredentials();

            $scope.login = function () {

                // reset user credentials
                AuthenticationService.ClearCredentials();
                // go back to login page
                $location.path('/login');

            }

            $scope.resetPassword = function () {

                // get the generated token by the server when user clicked on forgot password.
                if ($location.search().code !== undefined) {
                    $scope.code = encodeURIComponent($location.search().code);
                }

                $scope.dataLoading = true;
                AuthenticationService.ResetPassword($scope.username, $scope.password, $scope.confirmPassword, $scope.code, function (response) {

                    if (response.success) {

                        AuthenticationService.SetCredentials($scope.username, $scope.password, response.data);
                        $location.path('/');

                        // alert message on the top of the main screen
                        $rootScope.addAlert(response.message, 'success');

                    } else {

                        // alert message on the top of the panel - reset password
                        $scope.error = response.message;
                        $scope.dataLoading = false;

                    }
                });
            };
        }]);
})();
