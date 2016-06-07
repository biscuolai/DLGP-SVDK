(function () {
    'use strict';

    angular
        .module('app')
        .run(function ($rootScope, $state, $location, $window, Auth) {

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

                var shouldLogin = toState.data !== undefined
                              && toState.data.requireLogin;

                debugger;

                // wants any private stuff - require login 
                // let's check if user is authenticated
                if (shouldLogin) {

                    var dataPromise = Auth.getData();

                    var isLoggedIn = false;
                    dataPromise.then(function (result) {
                        isLoggedIn = result.data;

                        debugger;

                        if (!isLoggedIn)
                            //&&
                            //(toState.name !== "login" && toState.name !== "dashboard"))
                        {
                            //event.noUpdate = true;

                            var landingUrl = "http://" + $window.location.host + "/Account/Login";
                            $window.location.href = landingUrl;

                            event.preventDefault();

                            return;
                        }
                        // authenticated (previously) comming not to root main
                        //else {

                        //    debugger;

                        //    var shouldGoToMain = ((fromState.name === "" && toState.name !== "dashboard") || (toState.name === "dashboard")) && isLoggedIn;

                        //    if (shouldGoToMain) {
                        //        $state.go('dashboard');

                        //        event.preventDefault();
                        //        event.noUpdate = true;
                        //    }
                        //    else {
                        //        var landingUrl = "http://" + $window.location.host + "/Account/Login";
                        //        $window.location.href = landingUrl;
                        //    }
                        //    return;
                        //}
                    });
                }
                //else {
                //    // UNauthenticated (previously) comming not to root public 
                //    var shouldGoToContact = fromState.name === ""
                //                      && toState.name !== "contact"
                //                      && toState.name !== "login";

                //    if (shouldGoToContact) {
                //        $state.go('contact');
                //        event.preventDefault();
                //        event.noUpdate = true;
                //    }
                //}
            });
        });
})();
