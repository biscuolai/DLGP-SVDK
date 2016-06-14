(function () {
    'use strict';

    angular.module('app').config(['$stateProvider', '$urlRouterProvider', 
        function ($stateProvider, $urlRouterProvider) {

            // Application routes
            $stateProvider
                // Needs authentication
                .state('dashboard', {
                    url: '/',
                    templateUrl: '../templates/dashboard.html',
                    requireLogin: true
                })
                // Needs authentication
                .state('requests', {
                    url: '/requests',
                    templateUrl: '../templates/requests.html',
                    requireLogin: true
                })
                // Needs authentication
                .state('newTicket', {
                    url: '/newTicket',
                    templateUrl: '../templates/newTicket.html',
                    requireLogin: true
                })
                // Needs authentication
                .state('editTicket', {
                    url: '/editTicket',
                    templateUrl: '../templates/editTicket.html',
                    requireLogin: true
                })
                // Needs authentication
                .state('about', {
                    url: '/about',
                    templateUrl: '../templates/about.html',
                    requireLogin: true
                })
                // available for anybody
                .state('contact', {
                    url: '/contact',
                    templateUrl: '../templates/contact.html'
                })
                // the login screen
                .state('login', {
                    url: '/login',
                    templateUrl: '../templates/login.html',
                    controller: 'loginController',
                    hideMenus: true
                })
                .state('forgotPassword', {
                    url: '/forgotPassword',
                    templateUrl: '../templates/forgotPassword.html',
                    controller: 'loginController',
                    hideMenus: true
                })
                .state('app.error', {
                    url: '/error/:error',
                    templateUrl: '../templates/error.html',
                    accessLevel: accessLevels.public
                })
                .state('app.home', {
                    url: '/',
                    templateUrl: '../templates/index.html',
                    controller: 'homeController'
                })
                .state('app.admin', {
                    url: '/admin',
                    templateUrl: '../templates/admin.html',
                    accessLevel: accessLevels.admin
                })
                .state('app.user', {
                    url: '/user',
                    templateUrl: '../templates/user.html',
                    accessLevel: accessLevels.user
                })
                .state('register', {
                    url: '/register',
                    templateUrl: '../templates/register.html',
                    controller: 'registerController',
                    accessLevel: accessLevels.public
                });
            // For unmatched routes
            $urlRouterProvider.otherwise('/login');
        }])
})();
            //$urlRouterProvider.otherwise(function ($injector, $location) {
//                var $state = $injector.get("$state");
//                $state.go("login");
//            });
//        }
//    ])
//    // check if user is signed in through Identity using the API
//    //.factory('Auth', ['$http', function ($http) {

//    //    app
//    .factory('Auth', function ($http, $q) {
//        return {
//            getData: function () {
//                // the $http API is based on the deferred/promise APIs exposed by the $q service
//                // so it returns a promise for us by default
//                return $http.get('/api/admin/issignedin')
//                    .then(function (response) {
//                        if (typeof response.data === 'object') {
//                            return response.data;
//                        } else {
//                            // invalid response
//                            return $q.reject(response.data);
//                        }
//                    }, function (response) {
//                        // something went wrong
//                        return $q.reject(response.data);
//                    });
//            }
//        };
//    });

//        //var getData = function () {
//        //    // Angular $http() and then() both return promises themselves 
//        //    return $http({ method: "GET", url: "/api/admin/issignedin" }).then(function (result) {
//        //        debugger;
//        //        return result.data.data;
//        //    });
//        //};

//        //return { isLoggedIn: getData };


//        //// default
//        //var authLoggedIn = false;

//        //$http.get('/api/admin/issignedin').success(function (auth) {
//        //    // success return user is signed in or not 

//        //    //authLoggedIn = auth.data;
//        //    alert('success');
//        //    return { isLoggedIn: auth.data };
//        //    debugger;
//        //})
//        //.error(function () {
//        //    // in case of error, return false
//        //    debugger;
//        //    alert('error');
//        //    //authLoggedIn = false;
//        //    return { isLoggedIn: false };
//        //});

//        //debugger;

//        //return { isLoggedIn: authLoggedIn };
//   // }])
//})();