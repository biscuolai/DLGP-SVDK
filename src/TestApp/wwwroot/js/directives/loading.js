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

        debugger;

        return directive;
    }

})();