(function () {
    'use strict';

    angular.module('app')
    .controller('masterController', ['$scope', '$http', '$cookieStore', '$rootScope', '$state', 'AuthenticationService', masterController]);

    function masterController($scope, $http, $cookieStore, $rootScope, AuthenticationService, $state) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function () {
        $scope.$apply();
    };

    //$scope.reloadRoute = function () {
    //    $state.reload();
    //};

    $scope.Logoff = function () {
//        debugger;

        //alert($('input[name=__RequestVerificationToken]').attr('value'));

        //$http({
        //    method: 'POST',
        //    url: '/api/user/logoff',
        //    headers: {
        //        '__RequestVerificationToken': $('input[name=__RequestVerificationToken]').attr('value')
        //    }
        //});

        // reset login status
        AuthenticationService.ClearCredentials();

        // goes back to login page once log off
        $location.path("/");

        //reloadRoute();
    }
}
})();
