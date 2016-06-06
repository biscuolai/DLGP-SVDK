(function () {
    'use strict';

    angular.module('app').config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            // For unmatched routes
            $urlRouterProvider.otherwise('/');

            // Application routes
            $stateProvider
                .state('dashboard', {
                    url: '/',
                    templateUrl: '../templates/dashboard.html'
                })
                .state('requests', {
                    url: '/requests',
                    templateUrl: '../templates/requests.html'
                })
                .state('newTicket', {
                    url: '/newTicket',
                    templateUrl: '../templates/newTicket.html'
                })
                .state('editTicket', {
                    url: '/editTicket',
                    templateUrl: '../templates/editTicket.html'
                });
        }
    ]);
})();