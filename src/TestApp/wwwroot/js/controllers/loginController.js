(function () {
    'use strict';

    angular.module('Authentication')
    .controller('loginController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService', 
        function ($scope, $rootScope, $location, AuthenticationService) {

            // reset login status
            AuthenticationService.ClearCredentials();

            $scope.login = function () {

                debugger;

                $scope.dataLoading = true;
                AuthenticationService.Login($scope.username, $scope.password, function (response) {

                    if (response.success) {

                        debugger;

                        AuthenticationService.SetCredentials($scope.username, $scope.password);
                        $location.path('/');
                    } else {

                        debugger;

                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }

                });
            };
        }]);
})();
