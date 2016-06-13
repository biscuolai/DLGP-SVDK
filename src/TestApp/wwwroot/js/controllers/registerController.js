//(function () {
//    'use strict';

//    angular
//        .module('app')
//        .controller('registerController', function ($scope, $http, $timeout, $state) {
//            $scope.xhr = false;
//            $scope.redirect = false;

//            $scope.registerObj = {
//                role: 'user'
//            };

//            $scope.submit = function (formInstance) {
//                // xhr is departing
//                $scope.xhr = true;
//                $http.post('/user', $scope.registerObj)
//                .success(function (data, status, headers, config) {
//                    console.info('post success - ', data);
//                    $scope.xhr = false;
//                    $scope.redirect = true;
//                    $timeout(function () {
//                        $state.go('app.home');
//                    }, 2000);
//                })
//                .error(function (data, status, headers, config) {
//                    data.errors.forEach(function (error, index, array) {
//                        formInstance[error.field].$error[error.name] = true;
//                    });
//                    formInstance.$setPristine();
//                    console.info('post error - ', data);
//                    $scope.xhr = false;
//                });
//            };
//        });
//})();

(function () {
    'use strict';

    angular.module('Authentication')
    .controller('registerController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService',
        function ($scope, $rootScope, $location, AuthenticationService) {

            // reset login status
            AuthenticationService.ClearCredentials();

            $scope.register = function () {

                debugger;

                $scope.dataLoading = true;
                AuthenticationService.Register($scope.username, $scope.password, $scope.confirmPassword, $scope.displayName, function (response) {

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
