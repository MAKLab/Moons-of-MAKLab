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


  // Motor commands
  Rover.prototype.forwardCommand = function(distance) {
    return { "command": "forward", "distance": distance };
  };

  Rover.prototype.backCommand = function(distance) {
    return { "command": "back", "distance": distance };
  };

  Rover.prototype.leftCommand = function(distance) {
    return { "command": "left", "distance": distance };
  };

  Rover.prototype.rightCommand = function(distance) {
    return { "command": "right", "distance": distance };
  };


  // Pan/tilt commands
  Rover.prototype.panCommand = function(distance) {
    return { "command": "pan", "distance": distance };
  };

  Rover.prototype.tiltCommand = function(distance) {
    return { "command": "tilt", "distance": distance };
  };

  Rover.prototype.centerCameraCommand = function() {
    console.log("centerCameraCommand not implemented!");
    return { };
  };


  Rover.prototype.abort = function() {
    console.log("abort not implemented!");
  };


  Rover.prototype.sendCommands = function(commands) {
    console.log(this.ip, commands)
    return true;
  };

  return Rover;

}]);
