(function () {
    'use strict';

    angular.module('Authentication')
    .controller('logoffController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService', 'MessageService', '$http',
        function ($scope, $rootScope, $location, AuthenticationService, MessageService, $http) {

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

            $scope.initFirst = function () {
                $http.get('/api/admin/' + $scope.globals.currentUser.userData.id + '/notifications').success(function (Notifications) {
                    $scope.notifications = Notifications.data;
                })
                .error(function () {
                    // show in alerts error message
                    MessageService.clearAlert();
                    MessageService.addAlert('An error has occured while loading list of all notifications!', 'danger');
                });
            }

        }]);
})();
