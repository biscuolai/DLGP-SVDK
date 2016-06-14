(function () {
    'use strict';

    angular.module('Authentication')
    .controller('registerController',
        ['$scope', '$location', 'AuthenticationService', '$http', 
        function ($scope, $location, AuthenticationService, $http) {

            // reset login status
            AuthenticationService.ClearCredentials();

            $http.get('/api/admin/roles').success(function (Role) {

                $scope.roles = {
                    availableOptions: Role.data,
                    selectedOption: Role.data[0]
                };
            })
            .error(function () {
                // show in alerts error message
                $scope.message = 'An error has occured while loading role drop down list!', 'danger';
            });

            $scope.login = function () {

                // reset user credentials
                AuthenticationService.ClearCredentials();
                // go back to login page
                $location.path('/login');

            }

            $scope.register = function () {

                $scope.dataLoading = true;
                AuthenticationService.Register($scope.username, $scope.password, $scope.confirmPassword, $scope.email, $scope.roles.selectedOption.name, function (response) {

                    if (response.success) {

                        AuthenticationService.SetCredentials($scope.username, $scope.password, response.data);
                        $location.path('/');
                    } else {

                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
            };
        }]);
})();
