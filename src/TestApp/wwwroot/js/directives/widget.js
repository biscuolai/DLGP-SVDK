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