var controllers = angular.module('controllers', []);

controllers.controller('RoverCtrl', ['$scope', '$http',
  function ($scope, $http) {

  }]);


controllers.controller('RoverListCtrl', ['$scope', '$http', 'RoverManager',
  function($scope, $http, RoverManager) {
    var manager = RoverManager();
  }]);
