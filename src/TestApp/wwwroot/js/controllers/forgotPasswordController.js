(function () {
    'use strict';

    angular.module('Authentication')
    .controller('forgotPasswordController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService',
        function ($scope, $rootScope, $location, AuthenticationService) {

            // reset login status
            AuthenticationService.ClearCredentials();

            $scope.forgotPassword = function () {

                $scope.forgotPasswordConfirm = false;

                AuthenticationService.ForgotPassword($scope.email, function (response) {

                    if (response.success) {
                        $scope.forgotPasswordConfirm = true;
                    } else {
                        $scope.error = response.message;
                    }

                });
            };
        }]);
})();
