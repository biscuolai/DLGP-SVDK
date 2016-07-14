(function () {
    'use strict';

    angular.module('Authentication', []);

    angular.module('ShowMessage', []);

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
                           'ShowMessage',
                           //'angular-login.grandfather',
                           //'angular-login',
                           'ngRoute',
                           'ngResource',
                           'ui.router',
                           'ngCookies',
                           'ngMessages',
                           'chart.js',
                           'smart-table',
                           'fileUpload'
    ]) //, 'ui.router', 'ngRoute', 'app.controllers', 'textAngular',  'ngMaterial'
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

            // redirect to login page if not logged in
            if (
                (
                 $location.path() !== '/register' &&
                 $location.path() !== '/forgotpassword' &&
                 $location.path() !== '/resetpassword' &&
                 $location.path() !== '/login'
                ) &&
                !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);

//    angular.module('BasicHttpAuth', ['Authentication', 'app', 'ngRoute', 'ngCookies'])
})();




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
                    requireLogin: true,
                    params: {
                        breadcrumb: 'Dashboard'
                    },
                    controller: function ($rootScope, $stateParams) {
                        $rootScope.breadcrumb = $stateParams.breadcrumb;
                    }
                })
                // Needs authentication
                .state('requests', {
                    url: '/requests',
                    templateUrl: '../templates/requests.html',
                    requireLogin: true,
                    params: {
                        breadcrumb: 'Requests'
                    },
                    controller: function ($rootScope, $stateParams) {
                        $rootScope.breadcrumb = $stateParams.breadcrumb;
                    }
                })
                // Needs authentication
                .state('newTicket', {
                    url: '/newTicket',
                    templateUrl: '../templates/newTicket.html',
                    requireLogin: true,
                    params: {
                        breadcrumb: 'New Ticket'
                    },
                    controller: function ($rootScope, $stateParams) {
                        $rootScope.breadcrumb = $stateParams.breadcrumb;
                    }
                })
                // Needs authentication
                .state('editTicket', {
                    url: '/editTicket',
                    templateUrl: '../templates/editTicket.html',
                    requireLogin: true,
                    params: {
                        breadcrumb: 'Edit Ticket'
                    },
                    controller: function ($rootScope, $stateParams) {
                        $rootScope.breadcrumb = $stateParams.breadcrumb;
                    }
                })
                // Needs authentication
                .state('about', {
                    url: '/about',
                    templateUrl: '../templates/about.html',
                    requireLogin: true,
                    params: {
                        breadcrumb: 'About'
                    },
                    controller: function ($rootScope, $stateParams) {
                        $rootScope.breadcrumb = $stateParams.breadcrumb;
                    }
                })
                // available for anybody
                .state('contact', {
                    url: '/contact',
                    templateUrl: '../templates/contact.html',
                    params: {
                        breadcrumb: 'Contact'
                    },
                    controller: function ($rootScope, $stateParams) {
                        $rootScope.breadcrumb = $stateParams.breadcrumb;
                    }
                })
                // the login screen
                .state('login', {
                    url: '/login',
                    templateUrl: '../templates/login.html',
                    controller: 'loginController',
                    hideMenus: true
                })
                .state('forgotpassword', {
                    url: '/forgotpassword',
                    templateUrl: '../templates/forgotPassword.html',
                    controller: 'forgotPasswordController',
                    hideMenus: true
                })
                .state('resetpassword', {
                    url: '/resetpassword',
                    templateUrl: '../templates/resetPassword.html',
                    controller: 'resetPasswordController',
                    hideMenus: true
                })
                .state('attachments', {
                    url: '/attachments',
                    templateUrl: '../templates/attachments.html',
                    controller: 'fileUploadController'
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
(function () {
    'use strict';

    angular.module('app').constant('Constants', {
        //LookupValues: {
        //    ContactType: 0,
        //    Category: 1,
        //    ConfigurationItem: 2,
        //    TicketStatus: 3,
        //    Priority: 4
        //},
        //TicketStatus: {
        //    New: 1,
        //    Open: 2,
        //    PendingRFI: 3,
        //    PendingOnHold: 4,
        //    Resolved: 5,
        //    Cancelled: 6,
        //    Closed: 7
        //},
    }); 
})();

//(function () {
//    'use strict';

//    angular
//        .module('app')
//        .run(function ($rootScope, $state, $location, $window, Auth) {

//            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

//                var shouldLogin = toState.data !== undefined
//                              && toState.data.requireLogin;

//                debugger;

//                // wants any private stuff - require login 
//                // let's check if user is authenticated
//                if (shouldLogin) {

//                    var dataPromise = Auth.getData();

//                    var isLoggedIn = false;
//                    dataPromise.then(function (result) {
//                        isLoggedIn = result.data;

//                        debugger;

//                        if (!isLoggedIn)
//                            //&&
//                            //(toState.name !== "login" && toState.name !== "dashboard"))
//                        {
//                            //event.noUpdate = true;

//                            var landingUrl = "http://" + $window.location.host + "/Account/Login";
//                            $window.location.href = landingUrl;

//                            event.preventDefault();

//                            return;
//                        }
//                        // authenticated (previously) comming not to root main
//                        //else {

//                        //    debugger;

//                        //    var shouldGoToMain = ((fromState.name === "" && toState.name !== "dashboard") || (toState.name === "dashboard")) && isLoggedIn;

//                        //    if (shouldGoToMain) {
//                        //        $state.go('dashboard');

//                        //        event.preventDefault();
//                        //        event.noUpdate = true;
//                        //    }
//                        //    else {
//                        //        var landingUrl = "http://" + $window.location.host + "/Account/Login";
//                        //        $window.location.href = landingUrl;
//                        //    }
//                        //    return;
//                        //}
//                    });
//                }
//                //else {
//                //    // UNauthenticated (previously) comming not to root public 
//                //    var shouldGoToContact = fromState.name === ""
//                //                      && toState.name !== "contact"
//                //                      && toState.name !== "login";

//                //    if (shouldGoToContact) {
//                //        $state.go('contact');
//                //        event.preventDefault();
//                //        event.noUpdate = true;
//                //    }
//                //}
//            });
//        });
//})();

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

        //$scope.colours = [
        //  { // grey
        //      fillColor: 'rgba(148,159,177,0.2)',
        //      strokeColor: 'rgba(148,159,177,1)',
        //      pointColor: 'rgba(148,159,177,1)',
        //      pointStrokeColor: '#fff',
        //      pointHighlightFill: '#fff',
        //      pointHighlightStroke: 'rgba(148,159,177,0.8)'
        //  },
        //  { // dark grey
        //      fillColor: 'rgba(77,83,96,0.2)',
        //      strokeColor: 'rgba(77,83,96,1)',
        //      pointColor: 'rgba(77,83,96,1)',
        //      pointStrokeColor: '#fff',
        //      pointHighlightFill: '#fff',
        //      pointHighlightStroke: 'rgba(77,83,96,1)'
        //  }
        //];
    }
})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('ticketController', ['$http', '$controller', '$location', '$scope', '$filter', 'MessageService', '$timeout',
            ticketController]);

    //AngularJS controller method
    function ticketController($http, $controller, $location, $scope, $filter, MessageService, $timeout) {

        $scope.initFirst = function () {
            if ((($location.search().action !== undefined) && ($location.search().action === 'edit')) &&
                (($location.search().id !== undefined) && ($location.search().id > 0))) {
                // query parameter existing and get Ticket by TicketId
                $http.get('/api/tickets/' + $location.search().id).success(function (data) {
                    // success
                    $scope.Ticket = data.data;
                    $scope.originalTicket = angular.copy($scope.Ticket);

                    // Load all dropdownlists and set all values according this specific record
                    LoadAllDropDownLists(true, $location.search().id);
                    // Load all events from ticket 
                    GetAllEventsByTicketId($location.search().id);
                    // Clear all MessageService.addAlert messages 
                    MessageService.clearAlert();

                    // reset all flags
                    $scope.resetVariables();

                    $scope.isMoreInfo = ($scope.Ticket.status.name.toUpperCase() === "PENDING - REQUEST FOR INFORMATION");
                    $scope.isResolved = ($scope.Ticket.status.name.toUpperCase() === "RESOLVED");
                    $scope.isCancelled = ($scope.Ticket.status.name.toUpperCase() === "CANCELLED");
                })
                .error(function () {
                    // show in alerts error message
                    MessageService.clearAlert();
                    MessageService.addAlert('An error has occured while loading ticket id = ' + $location.search().id, 'danger');
                });
            }
                // no parameter has been passed, it can be a new ticket or dashboard page
            else {
                // it is a new ticket
                if (($location.search().action !== undefined) && ($location.search().action === 'new')) {
                    // clear all fields 
                    ClearFields();
                    // Load all dropdownlists setting to default value
                    LoadAllDropDownLists(false, null);
                    // Clear all MessageService.addAlert messages 
                    MessageService.clearAlert();
                }
                    // Request is coming from dashboard page. Load all ticket records
                else {
                    // get the list of all tickets 
                    GetAllTickets();
                    // clear all parameters from URL
                    $location.search('');
                }
            }
        }
       
        //To Get all Ticket records  
        function GetAllTickets() {
            $http.get('/api/tickets').success(function (Ticket) {
                $scope.Tickets = Ticket.data;
            })
            .error(function () {
                // show in alerts error message
                MessageService.clearAlert();
                MessageService.addAlert('An error has occured while loading list of all tickets!', 'danger');
            });
        }

        //To Get all Ticket events records for an existing ticket  
        function GetAllEventsByTicketId(id) {
            $http.get('/api/tickets/' + id + '/events').success(function (Events) {
                debugger;
                $scope.Events = Events.data;
            })
            .error(function () {
                // show in alerts error message
                MessageService.clearAlert();
                MessageService.addAlert('An error has occured while loading list of all ticket events!', 'danger');
            });
        }

        // findItems (boolean) parameter is only when ticket already exists
        function LoadAllDropDownLists(findItems, id) {
            $http.get('/api/values/contacttype').success(function (ContactType) {
                $scope.ContactType = {
                    availableOptions: ContactType.data,
                    selectedOption: ContactType.data[0]
                };

                if (findItems === true) {
                    $scope.ContactType.selectedOption = $filter('filter')($scope.ContactType.availableOptions, { contactTypeId: $scope.Ticket.contactTypeId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                MessageService.clearAlert();
                MessageService.addAlert('An error has occured while loading contact type drop down list!', 'danger');
            });
            $http.get('/api/values/category').success(function (Category) {
                $scope.Category = {
                    availableOptions: Category.data,
                    selectedOption: Category.data[0]
                };

                if (findItems === true) {
                    $scope.Category.selectedOption = $filter('filter')($scope.Category.availableOptions, { categoryId: $scope.Ticket.categoryId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                MessageService.addAlert('An error has occured while loading category drop down list!', 'danger');
            });
            $http.get('/api/values/configurationitem').success(function (ConfigurationItem) {
                $scope.ConfigurationItem = {
                    availableOptions: ConfigurationItem.data,
                    selectedOption: ConfigurationItem.data[0]
                };

                if (findItems === true) {
                    $scope.ConfigurationItem.selectedOption = $filter('filter')($scope.ConfigurationItem.availableOptions, { configurationItemId: $scope.Ticket.configurationItemId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                MessageService.addAlert('An error has occured while loading configuration item drop down list!', 'danger');
            });
            $http.get('/api/values/ticketstatus/' + id).success(function (TicketStatus) {
                $scope.TicketStatus = {
                    availableOptions: TicketStatus.data,
                    selectedOption: TicketStatus.data[0]
                };

                if (findItems === true) {
                    $scope.TicketStatus.selectedOption = $filter('filter')($scope.TicketStatus.availableOptions, { ticketStatusId: $scope.Ticket.ticketStatusId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                MessageService.addAlert('An error has occured while loading ticket status drop down list!', 'danger');
            });
            $http.get('/api/values/priority').success(function (Priority) {

                $scope.Priority = {
                    availableOptions: Priority.data,
                    selectedOption: Priority.data[0]
                };

                if (findItems === true) {
                    $scope.Priority.selectedOption = $filter('filter')($scope.Priority.availableOptions, { priorityId: $scope.Ticket.priorityId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                MessageService.addAlert('An error has occured while loading priority drop down list!', 'danger');
            });
            $http.get('/api/projects').success(function (Project) {
                $scope.Projects = {
                    availableOptions: Project.data,
                    selectedOption: Project.data[0]
                };
                if (findItems === true) {
                    $scope.Projects.selectedOption = $filter('filter')($scope.Projects.availableOptions, { projectId: $scope.Ticket.projectId })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                MessageService.addAlert('An error has occured while loading project drop down list!', 'danger');
            });
            $http.get('/api/admin/users').success(function (User) {

                $scope.Users = {
                    availableOptions: User.data,
                    selectedOption: User.data[0]
                };
                if (findItems === true) {
                    $scope.Users.selectedOption = $filter('filter')($scope.Users.availableOptions, { id: $scope.Ticket.assignedTo })[0];
                }
            })
            .error(function () {
                // show in alerts error message
                MessageService.addAlert('An error has occured while loading assigned to drop down list!', 'danger');
            });
        }

        $scope.editTicket = function (Ticket) {
            // get Ticket by TicketId
            $http.get('/api/tickets/' + Ticket.ticketId).success(function (data) {
                // success
                $scope.Ticket = data.data;

                LoadAllDropDownLists(true, Ticket.ticketId);

                $location.path('/editTicket'); //redirect to edit Ticket template
            })
            .error(function () {
                // show in alerts error message
                MessageService.addAlert('An error has occured while loading ticket id = ' + Ticket.ticketId, 'danger');
            });
        }

        $scope.deleteTicket = function (Ticket) {
            var getTicketData = DeleteTicket(Ticket.Id);
            getTicketData.then(function (msg) {
                MessageService.addAlert(msg.data);
                GetAllTickets();
            }, function () {
                MessageService.addAlert('Error in deleting Ticket record', 'success');
            });
        }

        function ClearFields() {
            if ($scope.Ticket !== undefined) {
                $scope.Ticket.projectId = "";
                $scope.Ticket.contactTypeId = "";
                $scope.Ticket.categoryId = "";
                $scope.Ticket.configurationItemId = "";
                $scope.Ticket.title = "";
                $scope.Ticket.details = "";
                $scope.Ticket.tagList = "";
                $scope.Ticket.assignedTo = "";
                $scope.Ticket.ticketStatusId = "";
                $scope.Ticket.priorityId = "";
            }
        }

        $scope.cancel = function () {
            if ($scope.isTicketChanged()) {
                BootstrapDialog.confirm({
                    title: 'Warning',
                    message: 'There is unsaved data. Do you still want to cancel?',
                    type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                    closable: true, // <-- Default value is false
                    draggable: true, // <-- Default value is false
                    btnCancelLabel: 'No', // <-- Default value is 'Cancel',
                    btnOKLabel: 'Yes', // <-- Default value is 'OK',
                    btnOKClass: 'btn-warning', // <-- If you didn't specify it, dialog type will be used,
                    callback: function (result) {
                        // result will be true if button was click, while it will be false if users close the dialog directly.
                        if (result) {
                            $scope.resetVariables();
                            $scope.initFirst();
                        } 
                    }
                });
            }
            else {
                $scope.resetVariables();
            }
        };

        $scope.isTicketChanged = function () {
            return !angular.equals($scope.originalTicket, $scope.Ticket);
        };

        $scope.resetVariables = function () {
            $scope.isEditing = false;
            $scope.isAssigning = false;
            $scope.isRequestInfo = false;
            $scope.isSupplyInfo = false;
            $scope.isCancelInfo = false;
            $scope.isAddingComment = false;
        };

        $scope.back = function () {
            $scope.isEditing = false;
            $scope.isAssigning = false;
            ClearFields();
            //$location.path('/'); // cancel and redirect to dashboard
            window.history.back();
        };

        $scope.searchTicket = ""; // set the default search / filter term to empty string

        //Edit/Update operation
        $scope.UpdateTicket = function (Ticket) {

            // if the user is trying to resolve or cancel the ticket through edit ticket option
            if (($scope.TicketStatus.selectedOption.name.toUpperCase() == 'CANCELLED' ||
                $scope.TicketStatus.selectedOption.name.toUpperCase() == 'RESOLVED') &&
               (Ticket.comments === undefined || Ticket.comments.trim() === ''))
            {
                MessageService.clearAlert();
                MessageService.addAlert('Please confirm all information in Resolution Tab before resolving or cancelling a ticket.', 'danger');
                return false;
            }

            // read fresh data from all dropdownlists
            Ticket.projectId = $scope.Projects.selectedOption.projectId;
            Ticket.contactTypeId = $scope.ContactType.selectedOption.contactTypeId;
            Ticket.categoryId = $scope.Category.selectedOption.categoryId;
            Ticket.configurationItemId = $scope.ConfigurationItem.selectedOption.configurationItemId;
            Ticket.ticketStatusId = $scope.TicketStatus.selectedOption.ticketStatusId;
            Ticket.priorityId = $scope.Priority.selectedOption.priorityId;

            // unassigned ticket - check all 
            try {
                Ticket.assignedTo = $scope.Users.selectedOption.id;
            } catch (e) {
                // ticket is unassigned
                Ticket.assignedTo = null;
            }

            Ticket.isEditing = $scope.isEditing;
            Ticket.isRequestInfo = $scope.isRequestInfo;
            Ticket.isSupplyInfo = $scope.isSupplyInfo;
            Ticket.isCancelInfo = $scope.isCancelInfo;
            Ticket.isAssigning = $scope.isAssigning;
            Ticket.isAddingComment = $scope.isAddingComment;
            Ticket.currentStatusDate = new Date();
            Ticket.currentStatusSetBy = $scope.globals.currentUser.userData.userName;
            Ticket.lastUpdateBy = $scope.globals.currentUser.userData.userName;
            Ticket.lastUpdateDate = new Date();

            $http.put('/api/tickets/' + Ticket.ticketId, Ticket).success(function (data) {
                //$scope.Tickets.push(data);
                //GetAllTickets();
                //ClearFields();
                //$scope.resetVariables();
                //$location.path('/'); // Updated successfully and redirect to dashboard

                // call the initFirst function which will reload data and take care of all memory variables
                $scope.initFirst();

                // show in alerts that ticket has been updated successfully
                MessageService.clearAlert();
                MessageService.addAlert('Ticket ID = ' + Ticket.ticketId + ' has been updated successfully!', 'success'); // And call the method on the newScope.

            }).error(function (data) {
                // show in alerts error message
                MessageService.clearAlert();
                MessageService.addAlert('An error has occured while updating ticket id = ' + Ticket.ticketId, 'danger');
            });
        };

        // Insert operation / add ticket
        $scope.AddTicket = function (Ticket) {

            if (Ticket !== undefined) {
                // read fresh data from all dropdownlists
                Ticket.projectId = $scope.Projects.selectedOption.projectId;
                Ticket.contactTypeId = $scope.ContactType.selectedOption.contactTypeId;
                Ticket.categoryId = $scope.Category.selectedOption.categoryId;
                Ticket.configurationItemId = $scope.ConfigurationItem.selectedOption.configurationItemId;
                Ticket.ticketStatusId = $scope.TicketStatus.selectedOption.ticketStatusId;
                Ticket.priorityId = $scope.Priority.selectedOption.priorityId;

                // unassigned ticket
                if ($scope.Users !== undefined && $scope.Users.selectedOption !== null && $scope.Users.selectedOption.id !== null) {
                    Ticket.assignedTo = $scope.Users.selectedOption.id;
                }

                Ticket.createdBy = $scope.globals.currentUser.userData.userName;
                Ticket.createdDate = new Date();
                Ticket.currentStatusDate = new Date();
                Ticket.currentStatusSetBy = $scope.globals.currentUser.userData.userName;
                Ticket.lastUpdateBy = $scope.globals.currentUser.userData.userName;
                Ticket.lastUpdateDate = new Date();
                Ticket.owner = $scope.globals.currentUser.userData.userName;

                $http.post('/api/tickets', Ticket).success(function (data) {
                    //$scope.Tickets.push(data);
                    //GetAllTickets();
                    $location.path('/'); // Added successfully and redirect to dashboard

                    // show in alerts that ticket has been added successfully
                    MessageService.clearAlert();
                    MessageService.addAlert('A new ticket has been added successfully!', 'success'); // And call the method on the newScope.

                }).error(function (data) {
                    // show in alerts error message
                    MessageService.clearAlert();
                    MessageService.addAlert('An error has occured while adding a new ticket!', 'danger');
                });
            }
        };

        //Delete Ticket
        $scope.DeleteTicket = function (Ticket) {
            $http.delete('/api/tickets/' + Ticket.TicketID).success(function (data) {
                MessageService.addAlert("Deleted successfully!");
                $http.get('/api/tickets').success(function (data) {
                    $scope.Tickets = data;                    
                })
            }).error(function (data) {
                $scope.error = "An error has occured while deleting! " + data;                
            });
        };

        $scope.edit = function () {
            // set the variable isEditing to true and enable fields for editing 
            // Also the comments textarea field is set to visible
            $scope.isEditing = true;
            $scope.isAssigning = false;
            $scope.isRequestInfo = false;
            $scope.isSupplyInfo = false;
            $scope.isCancelInfo = false;
            $scope.isAddingComment = false;

            $scope.commentLabel = "Edit Ticket";

            $scope.scrollToComments();
        };

        $scope.updateStatusComment = function () {
            // if user selects cancelled or resolved as statuses, the label for comment text area will be resolution, otherwise continue as Edit Ticket
            if ($scope.TicketStatus.selectedOption.name.toUpperCase() === 'CANCELLED' || $scope.TicketStatus.selectedOption.name.toUpperCase() === 'RESOLVED') {
                $scope.commentLabel = "Resolution";
            }
            else {
                $scope.commentLabel = "Edit Ticket";
            }

            // set the status using the selected option id
            Ticket.ticketStatus = TicketStatus.selectedOption.ticketStatusId
        };

        $scope.moreInfo = function (flag) {
            // set the variable isRequestInfo to true and enable fields for editing 
            // Also the comments textarea field is set to visible
            $scope.isEditing = false;
            $scope.isAssigning = false;
            $scope.isRequestInfo = (flag === 'R');
            $scope.isSupplyInfo = (flag === 'S');
            $scope.isCancelInfo = (flag === 'C');
            $scope.isAddingComment = false;
            if (flag === 'R') $scope.commentLabel = "Request For Information";
            else if (flag === 'S') $scope.commentLabel = "Supply More Information";
            else if (flag === 'C') $scope.commentLabel = "Cancel More Information";

            $scope.scrollToComments();
        };

        $scope.assign = function () {
            // set the variable isAssigning to true and enable all fields for editing 
            // Also the comments textarea field is set to visible
            $scope.isEditing = false;
            $scope.isAssigning = true;
            $scope.isRequestInfo = false;
            $scope.isSupplyInfo = false;
            $scope.isCancelInfo = false;
            $scope.isAddingComment = false;
            $scope.commentLabel = "Assign Ticket";

            $scope.scrollToComments();
        };

        $scope.addComment = function () {
            // set the variable isAddingComment to true and enable all fields for editing 
            // Also the comments textarea field is set to visible
            $scope.isEditing = false;
            $scope.isAssigning = false;
            $scope.isRequestInfo = false;
            $scope.isSupplyInfo = false;
            $scope.isCancelInfo = false;
            $scope.isAddingComment = true;
            $scope.commentLabel = "Add New";

            $scope.scrollToComments();
        };

        $scope.editAttachments = function () {
            $location.path('/attachments');
        };

        $scope.scrollToComments = function () {
            // scroll to comments control
            $timeout(function () {
                var element = document.getElementById('comments');
                $('html,body').animate({ scrollTop: $(element).offset().top }, "slow");
                $(element).focus();
            }, 200);
        }
    }
})();

(function () {
    'use strict';

    angular.module('app')
    .controller('masterController', ['$scope', '$http', '$cookieStore', masterController]);

    function masterController($scope, $http, $cookieStore) {
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
}
})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('alertsController', ['$scope', alertsController]);

    function alertsController($scope) {
        $scope.alerts = [{
            type: 'success',
            msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
        }, {
            type: 'danger',
            msg: 'Found a bug? Create an issue with as many details as you can.'
        }];

        $scope.addAlert = function (message, alertType) {
            $scope.alerts.push({
                type: alertType,
                msg: message
            });

            return $scope.alerts;
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.clearAlert = function () {
            $scope.alerts = [];
        };
    }
})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('chartController', ['$scope', chartController]);

    function chartController($scope) {

        $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        $scope.data = [
          [65, 59, 80, 81, 56, 55, 40],
          [28, 48, 40, 19, 86, 27, 90]
        ];
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


        //$scope.labels2 = ['Download Sales', 'Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
        //$scope.data2 = [300, 500, 100, 40, 120];
        //$scope.type2 = 'PolarArea';

        //$scope.toggle = function () {
        //    $scope.type2 = $scope.type2 === 'PolarArea' ? 'Pie' : 'PolarArea';
        //};

    }
})();

(function() {
    'use strict';

    angular
    .module('app')
    .directive('appLoading', appLoading);

    function appLoading() {
        var directive = {
            restrict: 'AE',
            template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
        };

        return directive;
    }

})();
(function() {
    'use strict';

    angular
        .module('app')
        .directive('appWidgetBody', appWidgetBody);

    function appWidgetBody() {
        var directive = {
            requires: '^appWidget',
            scope: {
                loading: '@?',
                classes: '@?'
            },
            transclude: true,
            template: '<div class="widget-body" ng-class="classes"><app-loading ng-show="loading"></app-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>',
            restrict: 'E'
        };

        return directive;
    }

})();
(function() {
    'use strict';

    angular
    .module('app')
    .directive('appWidgetFooter', appWidgetFooter);

    function appWidgetFooter() {
        var directive = {
            requires: '^appWidget',
            transclude: true,
            template: '<div class="widget-footer" ng-transclude></div>',
            restrict: 'E'
        };

        return directive;
    }

})();
(function() {
    'use strict';

    angular
    .module('app')
    .directive('appWidgetHeader', appWidgetTitle);

    function appWidgetTitle() {
        var directive = {
            requires: '^appWidget',
            scope: {
                title: '@',
                icon: '@'
            },
            transclude: true,
            template: '<div class="widget-header"><div class="row"><div class="pull-left"><i class="fa" ng-class="icon"></i> {{title}} </div><div class="pull-right col-xs-6 col-sm-10 widget-search" ng-transclude></div></div></div>',
            restrict: 'E'
        };
        return directive;
    }

})();
(function() {
    'use strict';

    angular
    .module('app')
    .directive('appWidget', appWidget);

    function appWidget() {
        var directive = {
            transclude: true,
            template: '<div class="widget" ng-transclude></div>',
            restrict: 'EA'
        };

        return directive;

        function link(scope, element, attrs) {
            /* */
        }
    };

})();
(function () {
    'use strict';

    angular
        .module('app')
        .factory('Resource', ['$http', '$q', '$filter', '$timeout', function ($http, $q, $filter, $timeout) {

            // the database (normally on your server)
            var allTickets = [];

            GetAllTickets();

            //To Get all Ticket records  
            function GetAllTickets() {
                $http.get('/api/tickets').success(function (Ticket) {
                    allTickets = Ticket.data;
                })
                .error(function () {
                    // reset variable
                    allTickets = [];
                });
            }

            function getPage(start, number, params) {
                var deferred = $q.defer();

                var filtered = [];

                if (params !== null) {

                    filtered = params.search.predicateObject ? $filter('filter')(allTickets, params.search.predicateObject) : allTickets;

                    if ((params !== null) && (params.sort.predicate)) {
                        filtered = $filter('orderBy')(filtered, params.sort.predicate, params.sort.reverse);
                    }

                    // set default number of records to a page = total of records if parameter 'number' is equal to zero
                    if ((number === 0) && (filtered !== undefined) && (filtered.length > 0)) {
                        number = filtered.length;
                    }
                }
                else {
                    filtered = allTickets;
                }

                var result = filtered.slice(start, start + number);

                //alert('filtered.length: ' + filtered.length + ', number: ' + number + ' result: ' + result.length);

                //debugger;

                $timeout(function () {
                    // note, the server passes the information about the data set size
                    deferred.resolve({
                        data: result,
                        numberOfPages: Math.ceil(filtered.length / number) 
                    });
                }, 100);

                return deferred.promise;
            }

            return {
                getPage: getPage
            };

        }]);
})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('datagridController', ['Resource', '$location', '$rootScope',
            function (Resource, $location, $rootScope) {

                var ctrl = this;

                ctrl.StatusViews = [
                    { id: 0, name: 'All Tickets' },
                    { id: 1, name: 'My Tickets' },
                    { id: 2, name: 'New Tickets' },
                    { id: 3, name: 'Open Tickets' },
                    { id: 4, name: 'Pending Tickets' },
                    { id: 5, name: 'Resolved Tickets' },
                    { id: 6, name: 'Cancelled Tickets' },
                    { id: 7, name: 'Closed Tickets' }
                ];

                this.displayed = [];

                this.pipeFunction = function (tableState, varCtrl) {

                    if (!ctrl.stCtrl && varCtrl) {
                        ctrl.stCtrl = varCtrl;
                    }

                    //if (!tableState && ctrl.stCtrl) {
                    //    ctrl.stCtrl.smartTableState.pipe();
                    //    return;
                    //}

                    if (tableState !== null) {
                        var pagination = tableState.pagination;

                        var start = pagination.start || 0;                      // This is NOT the page number, but the index of item in the list that you want to use to display the table.
                        var number = pagination.number || ctrl.itemsPerPage;    // Number of entries showed per page.
                    }
                    else {
                        var start = 0;
                        var number = 25;
                    }


                    //tableState.start = tablestate.pagination.start || 0;
                    //tableState.number = tablestate.pagination.number || ctrl.itemsPerPage;

                    ctrl.isLoading = true;

                    ctrl.query = '';

                    // get data
                    Resource.getPage(start, number, tableState).then(function (result) {
                        debugger;
                        ctrl.displayed = result.data;
                        if (tableState !== null) {
                            tableState.pagination.numberOfPages = result.numberOfPages; //set the number of pages so the pagination can update
                            //tableState.pagination.start = 0;
                        }
                        ctrl.isLoading = false;
                    });
                }

                //this.callServer = function callServer(tableState) {

                //    ctrl.isLoading = true;

                //    ctrl.query = '';

                //    var pagination = tableState.pagination;

                //    var start = pagination.start || 0;                      // This is NOT the page number, but the index of item in the list that you want to use to display the table.
                //    var number = pagination.number || ctrl.itemsPerPage;    // Number of entries showed per page.

                //    Resource.getPage(start, number, tableState).then(function (result) {
                //        ctrl.displayed = result.data;
                //        tableState.pagination.numberOfPages = result.numberOfPages; //set the number of pages so the pagination can update
                //        ctrl.isLoading = false;
                //    });
                //};

                //this.submitSearch = function (query) {
                //    // place ajax http code here
                //    this.queryResponse = query;
                //};

                this.showTicketList = function (id, itemsPerPage) {
                    ctrl.selectedAction = id;
                    ctrl.itemsPerPage = itemsPerPage;

                    ctrl.queryResponse =
                        {
                            status: '',
                            assignedTo: ''
                        };

                    ctrl.selectedItem = ctrl.StatusViews[id].name;
                    ctrl.queryResponse.assignedTo = '';
                    ctrl.queryResponse.status = '';
                    switch (id) {
                        // all tickets
                        case 0:
                            ctrl.queryResponse.status = '';
                            break;
                            // my tickets
                        case 1:
                            ctrl.queryResponse.assignedTo = $rootScope.globals.currentUser.userData.id;
                            break;
                            // all new tickets
                        case 2:
                            ctrl.queryResponse.status = 'new';
                            break;
                            // all open tickets
                        case 3:
                            ctrl.queryResponse.status = 'open';
                            break;
                            // all pending tickets
                        case 4:
                            ctrl.queryResponse.status = 'pending';
                            //var elem = document.getElementById('statusName');
                            //elem.value = 'pending';
                            //angular.element(elem).triggerHandler('click');
                            break;
                            // all Resolved tickets
                        case 5:
                            ctrl.queryResponse.status = 'resolved';
                            break;
                            // all cancelled tickets
                        case 6:
                            ctrl.queryResponse.status = 'cancelled';
                            break;
                            // all closed tickets
                        case 7:
                            ctrl.queryResponse.status = 'closed';
                            break;
                        default:
                            //
                            break;
                    }
                }

                ctrl.initFirst = function () {

                    // load data for first time
                    this.pipeFunction(null, ctrl);

                    if ($location.search().action !== undefined) {
                        ctrl.selectedAction = parseInt($location.search().action);
                    }
                    else {
                        ctrl.selectedAction = 0;
                    }

                    if ($location.search().items !== undefined && $location.search().items !== "0") {
                        ctrl.itemsPerPage = parseInt($location.search().items);
                    }
                    else {
                        ctrl.itemsPerPage = 25;
                    }

                    // show all tickets, set 25 items per page as default.
                    ctrl.selectedItem = 'All Tickets';
                    this.showTicketList(ctrl.selectedAction, ctrl.itemsPerPage);
                }
            }]);
    //.directive('stSubmitSearch', function () {
    //    debugger;
        
    //    return {
    //        restrict: 'EA',
    //        require: '^stTable', // to get smart-table as dependency
    //        link: function (scope, element, attrs, ctrl) {
    //            // ctrl is smart-table instance
    //            element.bind('click', function (evt) {
    //                scope.$apply(ctrl.pipe());
    //            });
    //        }
    //    };
    //});
})();

(function () {
    'use strict';

    angular.module('Authentication')
    .factory('AuthenticationService',
        ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
        function (Base64, $http, $cookieStore, $rootScope, $timeout) {
            var service = {};

            service.Login = function (username, password, callback) {
                /* Dummy authentication for testing, uses $timeout to simulate api call
                 ----------------------------------------------*/
                //$timeout(function () {
                //    var response = { success: username === 'test' && password === 'test' };
                //    if (!response.success) {
                //        response.message = 'Username or password is incorrect';
                //    }
                //    callback(response);
                //}, 1000);

                /* Use this for real authentication
                 ----------------------------------------------*/
                $http({
                    method: 'POST',
                    url: '/api/user/login',
                    data: {
                        username: username, password: password, rememberMe: false
                    },
                    headers: {										
                        '__RequestVerificationToken': $('input[name=__RequestVerificationToken]').attr('value') // @html.AntiForgeryToken() generated in server side
                    }
                }).success(function (response) {
                    callback(response);
                });
            };

            service.Register = function (username, password, confirmPassword, email, role, callback) {
                $http({
                    method: 'POST',
                    url: '/api/user/register',
                    data: {
                        username: username, password: password, confirmPassword: confirmPassword, email: email, role: role
                    },
                    headers: {
                        '__RequestVerificationToken': $('input[name=__RequestVerificationToken]').attr('value') // @html.AntiForgeryToken() generated in server side
                    }
                }).success(function (response) {
                    callback(response);
                });
            };

            service.Logoff = function (callback) {
                $http({
                    method: 'POST',
                    url: '/api/user/logoff',
                    headers: {
                        '__RequestVerificationToken': $('input[name=__RequestVerificationToken]').attr('value') // @html.AntiForgeryToken() generated in server side
                    }
                }).success(function (response) {
                    callback(response);
                });
            };

            service.ForgotPassword = function (email, callback) {
                $http({
                    method: 'POST',
                    url: '/api/user/forgotpassword',
                    data: {
                        email: email
                    },
                    headers: {
                        '__RequestVerificationToken': $('input[name=__RequestVerificationToken]').attr('value') // @html.AntiForgeryToken() generated in server side
                    }
                }).success(function (response) {
                    callback(response);
                });
            };

            service.ResetPassword = function (username, password, confirmPassword, code, callback) {

                debugger;

                $http({
                    method: 'POST',
                    url: '/api/user/resetpassword',
                    data: {
                        username: username, password: password, confirmPassword: confirmPassword, code: decodeURIComponent(code.replace(/\%20/g, "+"))
                    },
                    headers: {
                        '__RequestVerificationToken': $('input[name=__RequestVerificationToken]').attr('value') // @html.AntiForgeryToken() generated in server side
                    }
                }).success(function (response) {
                    callback(response);
                });
            };

            service.SetCredentials = function (username, password, userData) {
                var authdata = Base64.encode(username + ':' + password);

                $rootScope.globals = {
                    currentUser: {
                        username: username,
                        userData: userData,
                        authdata: $('input[name=__RequestVerificationToken]').attr('value') //authdata
                    }
                };

                $http.defaults.headers.common['Authorization'] = 'Basic ' + $('input[name=__RequestVerificationToken]').attr('value') //authdata; // jshint ignore:line
                $cookieStore.put('globals', $rootScope.globals);
            };

            service.ClearCredentials = function () {
                $rootScope.globals = {};
                $cookieStore.remove('globals');
                $http.defaults.headers.common.Authorization = 'Basic ';
            };

            return service;
        }])

    .factory('Base64', function () {
        /* jshint ignore:start */

        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },

            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    window.alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }
        };

        /* jshint ignore:end */
    });
})();
/**
    * Directly from fnakstad
    * https://github.com/fnakstad/angular-client-side-auth/blob/master/client/js/routingConfig.js
    */

(function (exports) {

    var config = {

    /* List all the roles you wish to use in the app
    * You have a max of 31 before the bit shift pushes the accompanying integer out of
    * the memory footprint for an integer
    */
    roles: [
        'public',
        'user',
        'admin'
    ],

    /*
    Build out all the access levels you want referencing the roles listed above
    You can use the "*" symbol to represent access to all roles
        */
    accessLevels: {
        'public' : '*',
        'anon': ['public'],
        'user' : ['user', 'admin'],
        'admin': ['admin']
    }

    };

    /*
    Method to build a distinct bit mask for each role
    It starts off with "1" and shifts the bit to the left for each element in the
    roles array parameter
    */
    function buildRoles(roles) {

    var bitMask = "01";
    var userRoles = {};

    for (var role in roles) {
        var intCode = parseInt(bitMask, 2);
        userRoles[roles[role]] = {
        bitMask: intCode,
        title: roles[role]
        };
        bitMask = (intCode << 1).toString(2);
    }

    return userRoles;
    }

    /*
    This method builds access level bit masks based on the accessLevelDeclaration parameter which must
    contain an array for each access level containing the allowed user roles.
    */
    function buildAccessLevels(accessLevelDeclarations, userRoles) {

    var accessLevels = {},
        resultBitMask,
        role;
    for (var level in accessLevelDeclarations) {

        if (typeof accessLevelDeclarations[level] === 'string') {
        if (accessLevelDeclarations[level] === '*') {

            resultBitMask = '';

            for (role in userRoles) {
            resultBitMask += "1";
            }
            //accessLevels[level] = parseInt(resultBitMask, 2);
            accessLevels[level] = {
            bitMask: parseInt(resultBitMask, 2),
            title: accessLevelDeclarations[level]
            };
        }
        else {
            console.log("Access Control Error: Could not parse '" + accessLevelDeclarations[level] + "' as access definition for level '" + level + "'");
        }
        }
        else {

        resultBitMask = 0;
        for (role in accessLevelDeclarations[level]) {
            if (userRoles.hasOwnProperty(accessLevelDeclarations[level][role])) {
            resultBitMask = resultBitMask | userRoles[accessLevelDeclarations[level][role]].bitMask;
            }
            else {
            console.log("Access Control Error: Could not find role '" + accessLevelDeclarations[level][role] + "' in registered roles while building access for '" + level + "'");
            }
        }
        accessLevels[level] = {
            bitMask: resultBitMask,
            title: accessLevelDeclarations[level][role]
        };
        }
    }

    return accessLevels;
    }

    exports.userRoles = buildRoles(config.roles);
    exports.accessLevels = buildAccessLevels(config.accessLevels, exports.userRoles);

})(typeof exports === 'undefined' ? this : exports);


//(function () {
//    'use strict';

//    angular.module('loginService', ['ui.router'])
//    .provider('loginService', function () {
//      var userToken = localStorage.getItem('userToken'),
//          errorState = 'app.error',
//          logoutState = 'app.home';

//      this.$get = function ($rootScope, $http, $q, $state) {

//        /**
//         * Low-level, private functions.
//         */
//        var setHeaders = function (token) {
//          if (!token) {
//            delete $http.defaults.headers.common['X-Token'];
//            return;
//          }
//          $http.defaults.headers.common['X-Token'] = token.toString();
//        };

//        var setToken = function (token) {
//          if (!token) {
//            localStorage.removeItem('userToken');
//          } else {
//            localStorage.setItem('userToken', token);
//          }
//          setHeaders(token);
//        };

//        var getLoginData = function () {
//          if (userToken) {
//            setHeaders(userToken);
//          } else {
//            wrappedService.userRole = userRoles.public;
//            wrappedService.isLogged = false;
//            wrappedService.doneLoading = true;
//          }
//        };

//        var managePermissions = function () {
//          // Register routing function.
//          $rootScope.$on('$stateChangeStart', function (event, to, toParams, from, fromParams) {

//            /**
//             * $stateChangeStart is a synchronous check to the accessLevels property
//             * if it's not set, it will setup a pendingStateChange and will let
//             * the grandfather resolve do his job.
//             *
//             * In short:
//             * If accessLevels is still undefined, it let the user change the state.
//             * Grandfather.resolve will either let the user in or reject the promise later!
//             */
//            if (wrappedService.userRole === null) {
//              wrappedService.doneLoading = false;
//              wrappedService.pendingStateChange = {
//                to: to,
//                toParams: toParams
//              };
//              return;
//            }

//            // if the state has undefined accessLevel, anyone can access it.
//            // NOTE: if `wrappedService.userRole === undefined` means the service still doesn't know the user role,
//            // we need to rely on grandfather resolve, so we let the stateChange success, for now.
//            if (to.accessLevel === undefined || to.accessLevel.bitMask & wrappedService.userRole.bitMask) {
//              angular.noop(); // requested state can be transitioned to.
//            } else {
//              event.preventDefault();
//              $rootScope.$emit('$statePermissionError');
//              $state.go(errorState, { error: 'unauthorized' }, { location: false, inherit: false });
//            }
//          });

//          /**
//           * Gets triggered when a resolve isn't fulfilled
//           * NOTE: when the user doesn't have required permissions for a state, this event
//           *       it's not triggered.
//           *
//           * In order to redirect to the desired state, the $http status code gets parsed.
//           * If it's an HTTP code (ex: 403), could be prefixed with a string (ex: resolvename403),
//           * to handle same status codes for different resolve(s).
//           * This is defined inside $state.redirectMap.
//           */
//          $rootScope.$on('$stateChangeError', function (event, to, toParams, from, fromParams, error) {
//            /**
//             * This is a very clever way to implement failure redirection.
//             * You can use the value of redirectMap, based on the value of the rejection
//             * So you can setup DIFFERENT redirections based on different promise errors.
//             */
//            var errorObj, redirectObj;
//            // in case the promise given to resolve function is an $http request
//            // the error is a object containing the error and additional informations
//            error = (typeof error === 'object') ? error.status.toString() : error;
//            // in case of a random 4xx/5xx status code from server, user gets loggedout
//            // otherwise it *might* forever loop (look call diagram)
//            if (/^[45]\d{2}$/.test(error)) {
//              wrappedService.logoutUser();
//            }
//            /**
//             * Generic redirect handling.
//             * If a state transition has been prevented and it's not one of the 2 above errors, means it's a
//             * custom error in your application.
//             *
//             * redirectMap should be defined in the $state(s) that can generate transition errors.
//             */
//            if (angular.isDefined(to.redirectMap) && angular.isDefined(to.redirectMap[error])) {
//              if (typeof to.redirectMap[error] === 'string') {
//                return $state.go(to.redirectMap[error], { error: error }, { location: false, inherit: false });
//              } else if (typeof to.redirectMap[error] === 'object') {
//                redirectObj = to.redirectMap[error];
//                return $state.go(redirectObj.state, { error: redirectObj.prefix + error }, { location: false, inherit: false });
//              }
//            }
//            return $state.go(errorState, { error: error }, { location: false, inherit: false });
//          });
//        };

//        /**
//         * High level, public methods
//         */
//        var wrappedService = {
//          loginHandler: function (user, status, headers, config) {
//            /**
//             * Custom logic to manually set userRole goes here
//             *
//             * Commented example shows an userObj coming with a 'completed'
//             * property defining if the user has completed his registration process,
//             * validating his/her email or not.
//             *
//             * EXAMPLE:
//             * if (user.hasValidatedEmail) {
//             *   wrappedService.userRole = userRoles.registered;
//             * } else {
//             *   wrappedService.userRole = userRoles.invalidEmail;
//             *   $state.go('app.nagscreen');
//             * }
//             */
//            // setup token
//            setToken(user.token);
//            // update user
//            angular.extend(wrappedService.user, user);
//            // flag true on isLogged
//            wrappedService.isLogged = true;
//            // update userRole
//            wrappedService.userRole = user.userRole;
//            return user;
//          },
//          loginUser: function (httpPromise) {
//            httpPromise.success(this.loginHandler);
//          },
//          logoutUser: function (httpPromise) {
//            /**
//             * De-registers the userToken remotely
//             * then clears the loginService as it was on startup
//             */
//            setToken(null);
//            this.userRole = userRoles.public;
//            this.user = {};
//            this.isLogged = false;
//            $state.go(logoutState);
//          },
//          resolvePendingState: function (httpPromise) {
//            var checkUser = $q.defer(),
//                self = this,
//                pendingState = self.pendingStateChange;

//            // When the $http is done, we register the http result into loginHandler, `data` parameter goes into loginService.loginHandler
//            httpPromise.success(self.loginHandler);

//            httpPromise.then(
//              function success(httpObj) {
//                self.doneLoading = true;
//                // duplicated logic from $stateChangeStart, slightly different, now we surely have the userRole informations.
//                if (pendingState.to.accessLevel === undefined || pendingState.to.accessLevel.bitMask & self.userRole.bitMask) {
//                  checkUser.resolve();
//                } else {
//                  checkUser.reject('unauthorized');
//                }
//              },
//              function reject(httpObj) {
//                checkUser.reject(httpObj.status.toString());
//              }
//            );
//            /**
//             * I setted up the state change inside the promises success/error,
//             * so i can safely assign pendingStateChange back to null.
//             */
//            self.pendingStateChange = null;
//            return checkUser.promise;
//          },
//          /**
//           * Public properties
//           */
//          userRole: null,
//          user: {},
//          isLogged: null,
//          pendingStateChange: null,
//          doneLoading: null
//        };

//        getLoginData();
//        managePermissions();

//        return wrappedService;
//      };
//    });

//})();

(function () {
    'use strict';

    angular.module('Authentication')
    .controller('loginController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService', 'MessageService',
            function ($scope, $rootScope, $location, AuthenticationService, MessageService) {

            // reset login status
            AuthenticationService.ClearCredentials();

            $scope.login = function () {

                $scope.dataLoading = true;
                AuthenticationService.Login($scope.username, $scope.password, function (response) {

                    if (response.success) {

                        AuthenticationService.SetCredentials($scope.username, $scope.password, response.data);
                        $location.path('/');

                        // alert message on the top of the main screen
                        MessageService.addAlert(response.message, 'success');
                    } else {

                        // alert message on the top of login screen
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }

                });
            };
        }]);
})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', function ($scope) {
            $scope.users = angular.fromJson(localStorage.getItem('userStorage'));
        });
})();

(function () {
    'use strict';

    angular.module('Authentication')
    .controller('registerController',
        ['$scope', '$location', 'AuthenticationService', '$http', 
        function ($scope, $location, AuthenticationService, $http) {

            // reset login status
            AuthenticationService.ClearCredentials();

            $http.get('/api/admin/roles').success(function (Role) {

                $scope.roles = {
                    availableOptions: Role.data,
                    selectedOption: Role.data[0]
                };
            })
            .error(function () {
                // show in alerts error message
                $scope.message = 'An error has occured while loading role drop down list!', 'danger';
            });

            $scope.login = function () {

                // reset user credentials
                AuthenticationService.ClearCredentials();
                // go back to login page
                $location.path('/login');

            }

            $scope.register = function () {

                $scope.dataLoading = true;
                AuthenticationService.Register($scope.username, $scope.password, $scope.confirmPassword, $scope.email, $scope.roles.selectedOption.name, function (response) {

                    if (response.success) {

                        AuthenticationService.SetCredentials($scope.username, $scope.password, response.data);
                        $location.path('/');

                        // alert message on the top of the main screen
                        $rootScope.addAlert(response.message, 'success');

                    } else {

                        // alert message on the top of register screen
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
            };
        }]);
})();

(function () {
    'use strict';

    angular.module('Authentication')
    .controller('logoffController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService', 'MessageService', '$http', '$interval',
            function ($scope, $rootScope, $location, AuthenticationService, MessageService, $http, $interval) {

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

                setInterval(function () {
                    $scope.initFirst();
                }, 3600)

                $scope.initFirst = function () {

                    if ($rootScope.globals.currentUser &&
                        $rootScope.globals.currentUser.userData != undefined) {

                        $http.get('/api/admin/' + $rootScope.globals.currentUser.userData.id + '/notifications').success(function (Notifications) {

                            $scope.notifications = Notifications.data;

                            $scope.countUnRead = 0;
                            $scope.countNew = 0;

                            // counting unread and new notifications 
                            for (var i = 0; i < $scope.notifications.length; i++) {
                                if (!$scope.notifications[i].isRead) {
                                    $scope.countUnRead++;
                                }
                                if ($scope.notifications[i].isNew) {
                                    $scope.countNew++;
                                }
                            }

                        })
                    .error(function () {
                        // show in alerts error message
                        MessageService.clearAlert();
                        MessageService.addAlert('An error has occured while loading list of all notifications!', 'danger');
                    });
                    }
                }

                $scope.markAsRead = function (id) {
                    $http.put('/api/admin/' + $rootScope.globals.currentUser.userData.id + '/notifications/' + id, $scope.globals.currentUser.userData.id, id)
                        .success(function (data) {
                        }).error(function (data) {
                            // show in alerts error message
                            MessageService.clearAlert();
                            MessageService.addAlert('An error has occured while updating notifications ticket id = ' + id, 'danger');
                        });
                }

                $scope.clearNewNotifications = function () {
                    if ($scope.countNew > 0) {
                        $http.put('/api/admin/' + $rootScope.globals.currentUser.userData.id + '/notifications/clearnew', $scope.globals.currentUser.userData.id)
                            .success(function (data) {
                                // reset counter for new items
                                $scope.countNew = 0;
                            }).error(function (data) {
                                // show in alerts error message
                                MessageService.clearAlert();
                                MessageService.addAlert('An error has occured while updating notifications', 'danger');
                            });
                    }
                }

                $scope.clearNotifications = function () {
                    $http.put('/api/admin/' + $rootScope.globals.currentUser.userData.id + '/notifications/clear', $rootScope.globals.currentUser.userData.id)
                        .success(function (data) {
                            // reset counters
                            $scope.countNew = 0;
                            $scope.countUnRead = 0;
                        }).error(function (data) {
                            // show in alerts error message
                            MessageService.clearAlert();
                            MessageService.addAlert('An error has occured while clearing notifications', 'danger');
                        });
                }
            }]);
})();

(function () {
    'use strict';

    angular.module('app')
    /**
     * Simple directive to check password equality
     *
     * usage:
     * <input type="password" ng-model="password" password-match="confirmPassword">
     * <input type="password" ng-model="confirmPassword">
     */
    .directive('passwordMatch', function () {
        return {
            restrict: 'A',
            scope: false,
            require: 'ngModel',
            link: function (scope, elem, attrs, controller) {
                var checker = function () {
                    // get the value of the first password
                    var pwd = scope.$eval(attrs.ngModel);
                    // get the value of the other password
                    var pwd2 = scope.$eval(attrs.passwordMatch);
                    return pwd === pwd2;
                };
                scope.$watch(checker, function (pwdMatch) {
                    controller.$setValidity('match', pwdMatch);
                });
            }
        };
    })
    /**
     * Directive to manage valid/invalid states of remote-validated Data.
     * It stores an internal array of values declared invalid by the server.
     * Generates the form error specified in case the user re-types the same invalid values,
     * clears the errors in case the user changes the ngModel.
     *
     * usage:
     * <input type="email" ng-model="email" remote-validated="used">
     *
     * NOTE: Your controllers have to make the field invalid in case *your* server says so.
     */
    .directive('remoteValidated', function () {
        return {
            restrict: 'A',
            scope: false,
            require: 'ngModel',
            link: function (scope, elem, attrs, controller) {
                var invalidItems = [];
                scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                    if (newValue) {
                        // Check the array of already-bad items
                        if (invalidItems.indexOf(newValue) !== -1) {
                            return controller.$setValidity(attrs.remoteValidated, false);
                        }
                        // When the model changes, it checks if the previous value was
                        // triggering the error from server-side
                        if (controller.$error[attrs.remoteValidated]) {
                            invalidItems.push(oldValue);
                        }
                        controller.$setValidity(attrs.remoteValidated, true);
                    }
                });
            }
        };
    });
})();
(function () {
    'use strict';

    angular.module('ShowMessage')
    .factory('MessageService', ['$rootScope', function ($rootScope) {

        // define the variable alerts if it does not exists
        if ($rootScope.alerts === undefined) {
            $rootScope.alerts = [];
        }

        return {
            addAlert: function (message, alertType) {
                $rootScope.alerts.push({
                    type: alertType,
                    msg: message
                });

                debugger;

                return $rootScope.alerts;
            },

            closeAlert: function (index) {
                $rootScope.alerts.splice(index, 1);
            },

            clearAlert: function() {
                $rootScope.alerts = [];
            }
        };
    }]);
})();
(function () {
    'use strict';

    angular.module('Authentication')
    .controller('forgotPasswordController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService',
        function ($scope, $rootScope, $location, AuthenticationService) {

            // reset login status
            AuthenticationService.ClearCredentials();

            $scope.forgotPassword = function () {

                $scope.forgotPasswordConfirm = false;

                AuthenticationService.ForgotPassword($scope.email, function (response) {

                    if (response.success) {
                        $scope.forgotPasswordConfirm = true;
                    } else {
                        $scope.error = response.message;
                    }

                });
            };
        }]);
})();

(function () {
    'use strict';

    angular.module('Authentication')
    .controller('resetPasswordController',
        ['$scope', '$location', 'AuthenticationService', '$http',
        function ($scope, $location, AuthenticationService, $http) {
                
            // reset login status
            AuthenticationService.ClearCredentials();

            $scope.login = function () {

                // reset user credentials
                AuthenticationService.ClearCredentials();
                // go back to login page
                $location.path('/login');

            }

            $scope.resetPassword = function () {

                // get the generated token by the server when user clicked on forgot password.
                if ($location.search().code !== undefined) {
                    $scope.code = encodeURIComponent($location.search().code);
                }

                $scope.dataLoading = true;
                AuthenticationService.ResetPassword($scope.username, $scope.password, $scope.confirmPassword, $scope.code, function (response) {

                    if (response.success) {

                        AuthenticationService.SetCredentials($scope.username, $scope.password, response.data);
                        $location.path('/');

                        // alert message on the top of the main screen
                        $rootScope.addAlert(response.message, 'success');

                    } else {

                        // alert message on the top of the panel - reset password
                        $scope.error = response.message;
                        $scope.dataLoading = false;

                    }
                });
            };
        }]);
})();

(function () {
    'use strict';

    angular.module('fileUpload', ['ngFileUpload'])
        .controller('fileUploadController', ['$scope', '$http', '$timeout', '$compile', 'Upload', function ($scope, $http, $timeout, $compile, Upload) {

        var version = '11.0.0';

        $scope.usingFlash = FileAPI && FileAPI.upload != null;
        //Upload.setDefaults({ngfKeep: true, ngfPattern:'image/*'});
        $scope.changeAngularVersion = function () {
            window.location.hash = $scope.angularVersion;
            window.location.reload(true);
        };
        $scope.angularVersion = window.location.hash.length > 1 ? (window.location.hash.indexOf('/') === 1 ?
          window.location.hash.substring(2) : window.location.hash.substring(1)) : '1.2.24';

        $scope.invalidFiles = [];

        $scope.$watch('files', function (files) {
            $scope.formUpload = false;
            if (files != null) {
                if (!angular.isArray(files)) {
                    $timeout(function () {
                        $scope.files = files = [files];
                    });
                    return;
                }
                for (var i = 0; i < files.length; i++) {
                    Upload.imageDimensions(files[i]).then(function (d) {
                        $scope.d = d;
                    });
                    $scope.errorMsg = null;
                    (function (f) {
                        $scope.upload(f, true);
                    })(files[i]);
                }
            }
        });

        $scope.uploadPic = function (file) {
            $scope.formUpload = true;
            if (file != null) {
                $scope.upload(file);
            }
        };

        $scope.upload = function (file, resumable) {
            $scope.errorMsg = null;
            if ($scope.howToSend === 1) {
                uploadUsingUpload(file, resumable);
            } else if ($scope.howToSend == 2) {
                uploadUsing$http(file);
            } else {
                uploadS3(file);
            }
        };

        $scope.isResumeSupported = Upload.isResumeSupported();

        $scope.restart = function (file) {
            if (Upload.isResumeSupported()) {
                $http.get('https://angular-file-upload-cors-srv.appspot.com/upload?restart=true&name=' + encodeURIComponent(file.name)).then(function () {
                    $scope.upload(file, true);
                });
            } else {
                $scope.upload(file);
            }
        };

        $scope.chunkSize = 100000;
        function uploadUsingUpload(file, resumable) {
            file.upload = Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload' + $scope.getReqParams(),
                resumeSizeUrl: resumable ? 'https://angular-file-upload-cors-srv.appspot.com/upload?name=' + encodeURIComponent(file.name) : null,
                resumeChunkSize: resumable ? $scope.chunkSize : null,
                headers: {
                    'optional-header': 'header-value'
                },
                data: { username: $scope.username, file: file }
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });

            file.upload.xhr(function (xhr) {
                // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
            });
        }

        function uploadUsing$http(file) {
            file.upload = Upload.http({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload' + $scope.getReqParams(),
                method: 'POST',
                headers: {
                    'Content-Type': file.type
                },
                data: file
            });

            file.upload.then(function (response) {
                file.result = response.data;
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });

            file.upload.progress(function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }

        function uploadS3(file) {
            file.upload = Upload.upload({
                url: $scope.s3url,
                method: 'POST',
                data: {
                    key: file.name,
                    AWSAccessKeyId: $scope.AWSAccessKeyId,
                    acl: $scope.acl,
                    policy: $scope.policy,
                    signature: $scope.signature,
                    'Content-Type': file.type === null || file.type === '' ? 'application/octet-stream' : file.type,
                    filename: file.name,
                    file: file
                }
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });

            file.upload.progress(function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
            storeS3UploadConfigInLocalStore();
        }

        $scope.generateSignature = function () {
            $http.post('/s3sign?aws-secret-key=' + encodeURIComponent($scope.AWSSecretKey), $scope.jsonPolicy).
              success(function (data) {
                  $scope.policy = data.policy;
                  $scope.signature = data.signature;
              });
        };

        if (localStorage) {
            $scope.s3url = localStorage.getItem('s3url');
            $scope.AWSAccessKeyId = localStorage.getItem('AWSAccessKeyId');
            $scope.acl = localStorage.getItem('acl');
            $scope.success_action_redirect = localStorage.getItem('success_action_redirect');
            $scope.policy = localStorage.getItem('policy');
            $scope.signature = localStorage.getItem('signature');
        }

        $scope.success_action_redirect = $scope.success_action_redirect || window.location.protocol + '//' + window.location.host;
        $scope.jsonPolicy = $scope.jsonPolicy || '{\n  "expiration": "2020-01-01T00:00:00Z",\n  "conditions": [\n    {"bucket": "angular-file-upload"},\n    ["starts-with", "$key", ""],\n    {"acl": "private"},\n    ["starts-with", "$Content-Type", ""],\n    ["starts-with", "$filename", ""],\n    ["content-length-range", 0, 524288000]\n  ]\n}';
        $scope.acl = $scope.acl || 'private';

        function storeS3UploadConfigInLocalStore() {
            if ($scope.howToSend === 3 && localStorage) {
                localStorage.setItem('s3url', $scope.s3url);
                localStorage.setItem('AWSAccessKeyId', $scope.AWSAccessKeyId);
                localStorage.setItem('acl', $scope.acl);
                localStorage.setItem('success_action_redirect', $scope.success_action_redirect);
                localStorage.setItem('policy', $scope.policy);
                localStorage.setItem('signature', $scope.signature);
            }
        }

        //(function handleDynamicEditingOfScriptsAndHtml($scope) {
        //    $scope.defaultHtml = document.getElementById('editArea').innerHTML.replace(/\t\t\t\t/g, '').replace(/&amp;/g, '&');

        //    var fromLocal = (localStorage && localStorage.getItem('editHtml' + version));
        //    $scope.editHtml = fromLocal || $scope.defaultHtml;
        //    function htmlEdit() {
        //        document.getElementById('editArea').innerHTML = $scope.editHtml;
        //        $compile(document.getElementById('editArea'))($scope);
        //        $scope.editHtml && localStorage && localStorage.setItem('editHtml' + version, $scope.editHtml);
        //        if ($scope.editHtml != $scope.htmlEditor.getValue()) $scope.htmlEditor.setValue($scope.editHtml);
        //    }

        //    $scope.$watch('editHtml', htmlEdit);

        //    //$scope.htmlEditor = CodeMirror(document.getElementById('htmlEdit'), {
        //    //    lineNumbers: true, indentUnit: 4,
        //    //    mode: 'htmlmixed'
        //    //});
        //    //$scope.htmlEditor.on('change', function () {
        //    //    if ($scope.editHtml != $scope.htmlEditor.getValue()) {
        //    //        $scope.editHtml = $scope.htmlEditor.getValue();
        //    //        htmlEdit();
        //    //    }
        //    //});
        //})($scope, $http);

        $scope.confirm = function () {
            return confirm('Are you sure? Your local changes will be lost.');
        };

        $scope.getReqParams = function () {
            return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
            '&errorMessage=' + $scope.serverErrorMsg : '';
        };

        angular.element(window).bind('dragover', function (e) {
            e.preventDefault();
        });
        angular.element(window).bind('drop', function (e) {
            e.preventDefault();
        });

        $scope.modelOptionsObj = {};
        $scope.$watch('validate+dragOverClass+modelOptions+resize+resizeIf', function (v) {
            $scope.validateObj = eval('(function(){return ' + $scope.validate + ';})()');
            $scope.dragOverClassObj = eval('(function(){return ' + $scope.dragOverClass + ';})()');
            $scope.modelOptionsObj = eval('(function(){return ' + $scope.modelOptions + ';})()');
            $scope.resizeObj = eval('(function($file){return ' + $scope.resize + ';})()');
            $scope.resizeIfFn = eval('(function(){var fn = function($file, $width, $height){return ' + $scope.resizeIf + ';};return fn;})()');
        });

        $timeout(function () {
            $scope.capture = localStorage.getItem('capture' + version) || 'camera';
            $scope.pattern = localStorage.getItem('pattern' + version) || 'image/*,audio/*,video/*';
            $scope.acceptSelect = localStorage.getItem('acceptSelect' + version) || 'image/*,audio/*,video/*';
            $scope.modelOptions = localStorage.getItem('modelOptions' + version) || '{debounce:100}';
            $scope.dragOverClass = localStorage.getItem('dragOverClass' + version) || '{accept:\'dragover\', reject:\'dragover-err\', pattern:\'image/*,audio/*,video/*,text/*\'}';
            $scope.disabled = localStorage.getItem('disabled' + version) == 'true' || false;
            $scope.multiple = localStorage.getItem('multiple' + version) == 'true' || false;
            $scope.allowDir = localStorage.getItem('allowDir' + version) == 'true' || true;
            $scope.validate = localStorage.getItem('validate' + version) || '{size: {max: \'20MB\', min: \'10B\'}, height: {max: 12000}, width: {max: 12000}, duration: {max: \'5m\'}}';
            $scope.keep = localStorage.getItem('keep' + version) == 'true' || false;
            $scope.keepDistinct = localStorage.getItem('keepDistinct' + version) == 'true' || false;
            $scope.orientation = localStorage.getItem('orientation' + version) == 'true' || false;
            $scope.resize = localStorage.getItem('resize' + version) || "{width: 1000, height: 1000, centerCrop: true}";
            $scope.resizeIf = localStorage.getItem('resizeIf' + version) || "$width > 5000 || $height > 5000";
            $scope.dimensions = localStorage.getItem('dimensions' + version) || "$width < 12000 || $height < 12000";
            $scope.duration = localStorage.getItem('duration' + version) || "$duration < 10000";
            $scope.$watch('validate+capture+pattern+acceptSelect+disabled+capture+multiple+allowDir+keep+orientation+' +
              'keepDistinct+modelOptions+dragOverClass+resize+resizeIf', function () {
                  localStorage.setItem('capture' + version, $scope.capture);
                  localStorage.setItem('pattern' + version, $scope.pattern);
                  localStorage.setItem('acceptSelect' + version, $scope.acceptSelect);
                  localStorage.setItem('disabled' + version, $scope.disabled);
                  localStorage.setItem('multiple' + version, $scope.multiple);
                  localStorage.setItem('allowDir' + version, $scope.allowDir);
                  localStorage.setItem('validate' + version, $scope.validate);
                  localStorage.setItem('keep' + version, $scope.keep);
                  localStorage.setItem('orientation' + version, $scope.orientation);
                  localStorage.setItem('keepDistinct' + version, $scope.keepDistinct);
                  localStorage.setItem('dragOverClass' + version, $scope.dragOverClass);
                  localStorage.setItem('modelOptions' + version, $scope.modelOptions);
                  localStorage.setItem('resize' + version, $scope.resize);
                  localStorage.setItem('resizeIf' + version, $scope.resizeIf);
              });
        });
    }]);
})();
(function () {
    'use strict';

    angular
        .module('app')
        .directive('routeRefresh', function ($location, $window) {
            return function (scope, element, attrs) {
                element.bind('click', function () {
                    var url = $location.absUrl();
                    if ((element[0] &&
                         element[0].href &&
                         element[0].href === url
                        ) ||
                        ((url.indexOf('?') >= 0) || (url.indexOf('=') >= 0) || (url.indexOf('&') >= 0))
                       ) {
                        $window.location.reload();
                    }
                });
            }
        });
})();
(function () {
    'use strict';

    angular
        .module('app')
        .directive('markNotificationAsRead', function ($location, $window) {
            return function (scope, element, attrs) {
                element.bind('click', function () {

                    debugger;

                    if ((element[0] &&
                         element[0].href 
                        ) ||
                        ((element[0].href.indexOf('?') >= 0) || (element[0].href.indexOf('=') >= 0) || (element[0].href.indexOf('&') >= 0))
                       ) 
                    {
                        if (
                            (element[0].href.indexOf('?action=') > 0) &&
                            (element[0].href.indexOf('&id=') > 0) 
                           )
                        {
                            scope.markAsRead(element[0].href.substring(element[0].href.indexOf('&id=') + 4));
                        }
                    }
                })
            }
        });
})();