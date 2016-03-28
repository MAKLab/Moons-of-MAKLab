var controllers = angular.module('controllers', []);

controllers.controller('RoverCtrl', ['$scope', '$http', 'Rover',
  function ($scope, $http, Rover) {
    $scope.rover = new Rover('192.168.0.7:5000');
  }]);
