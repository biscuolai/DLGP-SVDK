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