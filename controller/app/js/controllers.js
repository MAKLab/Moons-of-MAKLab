var controllers = angular.module('controllers', []);

controllers.controller('RoverCtrl', ['$scope', '$http', 'Rover',
  function ($scope, $http, Rover) {
    $scope.rover = new Rover();
  }]);
