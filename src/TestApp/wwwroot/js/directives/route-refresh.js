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