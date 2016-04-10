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