var app = angular.module('app', [
  'ngRoute',
  'controllers',
  'factories'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/rover', {
    templateUrl: 'partials/rover.html',
    controller: 'RoverCtrl'
  }).
  otherwise({
    redirectTo: '/rover'
  });
}]);
