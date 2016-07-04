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

            //$scope.showNotifications = function () {

            //    debugger;
            //    $scope.html = '<div class="list-group" style="max-height: 200px;" class="overflow-y-scroll">'
            //    for (var i = 0; i < $scope.notifications.length; i++) {
            //        $scope.html += '<a class="list-group-item" href="#/editTicket?action=edit&id=' + $scope.notifications[i].ticketId + '" route-refresh>' + $scope.notifications[i].ticketId + ' - ' + $scope.notifications[i].title + '</a>';
            //    }
            //    $scope.html += '</div>'

            //    BootstrapDialog.show({
            //        title: 'Notifications',
            //        message: $scope.html,
            //        type: BootstrapDialog.TYPE_PRIMARY, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            //        closable: true, // <-- Default value is false
            //        draggable: true, // <-- Default value is false
            //        btnCancelLabel: 'No', // <-- Default value is 'Cancel',
            //        btnOKLabel: 'Yes', // <-- Default value is 'OK',
            //        btnOKClass: 'btn-success', // <-- If you didn't specify it, dialog type will be used,
            //        callback: function (result) {
            //            // result will be true if button was click, while it will be false if users close the dialog directly.
            //            if (result) {
            //                //$scope.resetVariables();
            //                //$scope.initFirst();
            //            }
            //        },
            //        onhidden: function (dialogRef) {
            //            alert('Dialog is popped down.');
            //        }
            //    });
            //}

        }]);
})();
