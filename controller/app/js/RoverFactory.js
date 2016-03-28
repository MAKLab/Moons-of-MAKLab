'use strict'

/* RoverFactory */

var factories = angular.module('factories', []);

factories.constant('API_ENDPOINT', {
  port: 5000,
  url: '/rover/api/v1.0'
});

factories.factory('Rover', [function RoverFactory($http, API_ENDPOINT) {

  function Rover() {
    this.ip = '192.168.0.7'
  };


  Rover.prototype.cameraStream = function() {
    return this.ip + ':5000/video_feed';
  };

  return Rover;

}]);
