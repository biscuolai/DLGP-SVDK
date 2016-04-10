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