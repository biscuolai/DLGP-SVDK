(function () {
    'use strict';

    angular.module('Authentication', []);

    //angular.module('angular-login.grandfather', ['ui.router'])
    //.config(function ($stateProvider) {
    //    $stateProvider
    //      .state('app', {
    //          abstract: true,
    //          template: '<ui-view></ui-view>',
    //          resolve: {
    //              'login': function (loginService, $q, $http) {
    //                  var roleDefined = $q.defer();

    //                  /**
    //                   * In case there is a pendingStateChange means the user requested a $state,
    //                   * but we don't know yet user's userRole.
    //                   *
    //                   * Calling resolvePendingState makes the loginService retrieve his userRole remotely.
    //                   */
    //                  if (loginService.pendingStateChange) {
    //                      return loginService.resolvePendingState($http.get('/user'));
    //                  } else {
    //                      roleDefined.resolve();
    //                  }
    //                  return roleDefined.promise;
    //              }
    //          }
    //      });
    //});

    //angular.module('angular-login', [
    //  // login service
    //  'loginService'
    //  //'angular-login.mock',
    //  //'angular-login.directives',

    //  // different app sections

    //  //'angular-login.home',
    //  //'angular-login.pages',
    //  //'angular-login.register',
    //  //'angular-login.error',

    //  // components
    //  //'ngAnimate'
    //])
    //.config(function ($urlRouterProvider) {
    //    $urlRouterProvider.otherwise('/');
    //})
    //.run(function ($rootScope, $window) {
    //    // google analytics
    //    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
    //        var realURL = toState.url;
    //        if (!!$window.ga) {
    //            // resolves variables inside urls, ex: /error/:error in /error/unauthorized
    //            for (var v in toParams) {
    //                realURL = realURL.replace(':' + v, toParams[v]);
    //            }
    //            $window.ga('send', 'pageview', realURL);
    //        }
    //    });
    //    /**
    //     * $rootScope.doingResolve is a flag useful to display a spinner on changing states.
    //     * Some states may require remote data so it will take awhile to load.
    //     */
    //    var resolveDone = function () { $rootScope.doingResolve = false; };
    //    $rootScope.doingResolve = false;

    //    $rootScope.$on('$stateChangeStart', function () {
    //        $rootScope.doingResolve = true;
    //    });
    //    $rootScope.$on('$stateChangeSuccess', resolveDone);
    //    $rootScope.$on('$stateChangeError', resolveDone);
    //    $rootScope.$on('$statePermissionError', resolveDone);
    //})
    //.controller('BodyController', function ($scope, $state, $stateParams, loginService, $http, $timeout) {
    //    // Expose $state and $stateParams to the <body> tag
    //    $scope.$state = $state;
    //    $scope.$stateParams = $stateParams;

    //    // loginService exposed and a new Object containing login user/pwd
    //    $scope.ls = loginService;
    //    $scope.login = {
    //        working: false,
    //        wrong: false
    //    };
    //    $scope.loginMe = function () {
    //        // setup promise, and 'working' flag
    //        var loginPromise = $http.post('/login', $scope.login);
    //        $scope.login.working = true;
    //        $scope.login.wrong = false;

    //        loginService.loginUser(loginPromise);
    //        loginPromise.error(function () {
    //            $scope.login.wrong = true;
    //            $timeout(function () { $scope.login.wrong = false; }, 8000);
    //        });
    //        loginPromise.finally(function () {
    //            $scope.login.working = false;
    //        });
    //    };
    //    $scope.logoutMe = function () {

    //        debugger;

    //        loginService.logoutUser($http.get('/logout'));
    //    };
    //});

    angular.module('app', ['ui.bootstrap',
                           'Authentication',
                           //'angular-login.grandfather',
                           //'angular-login',
                           'ngRoute',
                           'ngResource',
                           'ui.router',
                           'ngCookies',
                           'ngMessages',
                           'chart.js',
                           'smart-table']) //, 'ui.router', 'ngRoute', 'app.controllers', 'textAngular',  'ngMaterial'
    //.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    //    $routeProvider
    //        .when('/login', {
    //            controller: 'loginController',
    //            templateUrl: '../templates/login.html',
    //            hideMenus: true
    //        })
    //        .when('/', {
    //            controller: 'dashboardController',
    //            templateUrl: '../templates/dashboard.html'
    //        })
    //        .when('/requests', {
    //            controller: 'ticketController',
    //            templateUrl: '../templates/requests.html'
    //        })
    //        .when('/newTicket', {
    //            controller: 'ticketController',
    //            templateUrl: '../templates/newTicket.html'
    //        })
    //        .when('/editTicket', {
    //            controller: 'ticketController',
    //            templateUrl: '../templates/editTicket.html'
    //        })
    //        .when('/about', {
    //            templateUrl: '../templates/about.html'
    //        })
    //        .when('/contact', {
    //            templateUrl: '../templates/contact.html'
    //        })
    //        .otherwise({ redirectTo: '/dashboard' });
    //}])
    .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {

        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {

            debugger;

            // redirect to login page if not logged in
            if (
                (
                 $location.path() !== '/register' &&
                 $location.path() !== '/forgotpassword' &&
                 $location.path() !== '/login'
                ) &&
                !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);

//    angular.module('BasicHttpAuth', ['Authentication', 'app', 'ngRoute', 'ngCookies'])
})();



