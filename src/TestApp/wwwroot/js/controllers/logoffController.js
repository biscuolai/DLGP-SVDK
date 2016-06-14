(function () {
    'use strict';

    angular.module('Authentication')
    .controller('logoffController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService',   
        function ($scope, $rootScope, $location, AuthenticationService) {

            $scope.logoff = function () {

                // if user is logged in
                if ($rootScope.globals.currentUser) {

                    // log off current user
                    $scope.loggingOff = true;
                    AuthenticationService.Logoff(function (response) {

                        if (response.success) {

                            // reset user credentials
                            AuthenticationService.ClearCredentials();
                            // go back to login page
                            $location.path('/login');

                        } else {

                            // error message
                            $scope.error = response.message;
                            $scope.loggingOff = false;
                        }
                    });
                }
            };
        }]);
})();
