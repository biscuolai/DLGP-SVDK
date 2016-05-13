(function () {
    'use strict';

    angular
        .module('app')
        .controller('dataService', ['$scope', dataService]);

    dataService.get(uri).then(function (data) {

        $scope.testimonials = data;

        $scope.totalItems = $scope.testimonials.length;
        $scope.currentPage = 1;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function () {
            console.log('Page changed to: ' + $scope.currentPage);
        }
    });

})();