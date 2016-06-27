(function () {
    'use strict';

    angular
        .module('app')
        .controller('dashboardController', ['$http', '$scope', '$location', 'MessageService', dashboardController]);

    function dashboardController($http, $scope, $location, MessageService) {

        GetDashboardData();

        $scope.newTickets = 0;
        $scope.openTickets = 0;
        $scope.onHoldTickets = 0;
        $scope.pendingTickets = 0;
        $scope.resolvedTickets = 0;
        $scope.cancelledTickets = 0;
        $scope.closedTickets = 0;
        $scope.monthlyData = [];
        $scope.labels = [];
        $scope.data = [];
        $scope.statuses = [];

        // clear all parameters from URL
        $location.search('');

        //To Get all Ticket records  
        function GetDashboardData() {
            $http.get('/api/dashboard').success(function (Dashboard) {

                $scope.Dashboard = Dashboard.data;

                $scope.newTickets = $scope.Dashboard.new;
                $scope.openTickets = $scope.Dashboard.open;
                $scope.onHoldTickets = $scope.Dashboard.onHold;
                $scope.pendingTickets = $scope.Dashboard.pending;
                $scope.resolvedTickets = $scope.Dashboard.resolved;
                $scope.cancelledTickets = $scope.Dashboard.cancelled;
                $scope.closedTickets = $scope.Dashboard.closed;
                $scope.monthlyData.push($scope.Dashboard.dashboardMonthlyData);


                //debugger;

                //for (var s = 0; s < $scope.Dashboard.dashboardMonthlyData.length; s++) {
                //    $scope.monthlyData.push($scope.Dashboard.dashboardMonthlyData);
                //}

                debugger;

                try {
                    for (var i = 0; i < $scope.monthlyData.length; i++) {
                        $scope.labels.push($scope.monthlyData[i].month);
                        $scope.data.push($scope.monthlyData[i].value);
                        $scope.statuses.push($scope.monthlyData[i].status);
                    }
                } catch (e) {
                    // show in alerts error message
                    MessageService.clearAlert();
                    MessageService.addAlert('An error has occured while loading dashboard data!', 'danger');
                }
            })
            .error(function () {
                // show in alerts error message
                MessageService.clearAlert();
                MessageService.addAlert('An error has occured while loading dashboard data!', 'danger');
            });
        }



        //$scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        //$scope.data = [
        //  [65, 59, 80, 81, 56, 55, 40],
        //  [28, 48, 40, 19, 86, 27, 90]
        //];
        $scope.colours = [
          { // grey
              fillColor: 'rgba(148,159,177,0.2)',
              strokeColor: 'rgba(148,159,177,1)',
              pointColor: 'rgba(148,159,177,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(148,159,177,0.8)'
          },
          { // dark grey
              fillColor: 'rgba(77,83,96,0.2)',
              strokeColor: 'rgba(77,83,96,1)',
              pointColor: 'rgba(77,83,96,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(77,83,96,1)'
          }
        ];

        $scope.randomize = function () {
            $scope.data = $scope.data.map(function (data) {
                return data.map(function (y) {
                    y = y + Math.random() * 10 - 5;
                    return parseInt(y < 0 ? 0 : y > 100 ? 100 : y);
                });
            });
        };
    }
})();
