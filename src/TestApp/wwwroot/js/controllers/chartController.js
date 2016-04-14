(function () {
    'use strict';

    angular
        .module('app')
        .controller('chartController', ['$scope', chartController]);

    function chartController($scope) {

        $scope.title = 'chartController';

        $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
          [65, 59, 80, 81, 56, 55, 40],
          [28, 48, 40, 19, 86, 27, 90]
        ];


        //$scope.labels2 = ['Download Sales', 'Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
        //$scope.data2 = [300, 500, 100, 40, 120];
        //$scope.type2 = 'PolarArea';

        //$scope.toggle = function () {
        //    $scope.type2 = $scope.type2 === 'PolarArea' ? 'Pie' : 'PolarArea';
        //};

    }
})();
