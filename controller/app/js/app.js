var app = angular.module('app', [
  'ngRoute',
  'controllers',
  'factories',
  'GamepadApi'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/rover/:index', {
    templateUrl: 'partials/rover.html',
    controller: 'RoverCtrl'
  }).
  when('/rovers', {
    templateUrl: 'partials/rover-list.html',
    controller: 'RoverListCtrl'
  }).
  otherwise({
    redirectTo: '/rovers'
  });
}]);
