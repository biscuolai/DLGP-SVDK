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

                var month = '';
                $scope.data = [];
                $scope.series = [];
                $scope.labels = [];

                debugger;

                try {
                    for (var i = 0; i < $scope.monthlyData[0].ticketSummary.length; i++) {
                        
                        $scope.labels.push($scope.monthlyData[0].ticketSummary[i].months[i]);

                        // Creates an empty line
                        $scope.data.push([]);

                        // Adds cols to the empty line:
                        $scope.data[i].push(new Array($scope.monthlyData[0].ticketSummary[i].values.length));

                        for (var j = 0; j < $scope.monthlyData[0].ticketSummary[i].values.length; j++) {
                            $scope.data[i][j] = $scope.monthlyData[0].ticketSummary[i].values[j];
                        }

                        $scope.series.push($scope.monthlyData[0].ticketSummary[i].name);
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

        $scope.options = { legend: { display: true } };

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
    }
})();
