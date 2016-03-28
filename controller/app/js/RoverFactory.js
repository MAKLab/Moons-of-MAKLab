'use strict'

/* RoverFactory */

var factories = angular.module('factories', ['ngResource']);

factories.constant('API_ENDPOINT', {
  url: '/rover/api/v1.0'
});

factories.factory('Rover', ['$http', 'API_ENDPOINT', function RoverFactory($http, API_ENDPOINT) {

  function Rover(ipAddress) {
    this.ip = ipAddress
  };


  Rover.prototype.cameraStream = function() {
    return 'http://' + this.ip + '/video_feed';
  };

  return Rover;

}]);
