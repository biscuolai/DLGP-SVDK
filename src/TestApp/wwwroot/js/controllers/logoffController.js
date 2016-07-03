(function () {
    'use strict';

    angular.module('Authentication')
    .controller('logoffController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService', 'MessageService',
        function ($scope, $rootScope, $location, AuthenticationService, MessageService) {

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
                //To Get all Ticket events records for an existing ticket  
                function GetAllNotificationsByUserId(id) {
                    $http.get('/api/admin/' + $scope.globals.currentUser.userData.Id + '/notifications').success(function (Notifications) {
                        debugger;
                        $scope.Notifications = Notifications.data;
                    })
                    .error(function () {
                        // show in alerts error message
                        MessageService.clearAlert();
                        MessageService.addAlert('An error has occured while loading list of all notifications!', 'danger');
                    });
                }
            }

        }]);
})();
