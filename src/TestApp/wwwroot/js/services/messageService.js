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