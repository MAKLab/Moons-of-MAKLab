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


  // Status
  Rover.prototype.status = function() {
    return $http.get('http://' + this.ip + API_ENDPOINT.url + '/status')
    .then( function(result) {

      if (result.data) {
        console.log('Got status', result.data);
        return true;
      }

      return false;
    });
  };


  // Camera stream
  Rover.prototype.cameraStream = function() {
    return 'http://' + this.ip + '/video_feed';
  };


  // Motor commands
  Rover.prototype.forwardCommand = function(theDistance) {
    return { command: "forward", distance: theDistance };
  };

  Rover.prototype.backCommand = function(theDistance) {
    return { command: "back", distance: theDistance };
  };

  Rover.prototype.leftCommand = function(theDistance) {
    return { command: "left", distance: theDistance };
  };

  Rover.prototype.rightCommand = function(theDistance) {
    return { command: "right", distance: theDistance };
  };


  // Pan/tilt commands
  Rover.prototype.panCommand = function(theDistance) {
    return { command: "pan", distance: theDistance };
  };

  Rover.prototype.tiltCommand = function(theDistance) {
    return { command: "tilt", distance: theDistance };
  };

  Rover.prototype.centerCameraCommand = function() {
    console.log("centerCameraCommand not implemented!");
    return { };
  };


  Rover.prototype.abort = function() {
    console.log("abort not implemented!");
    return false;
  };


  Rover.prototype.sendCommands = function(commands) {
    console.log(this.ip, commands)

    return $http.put('http://' + this.ip + API_ENDPOINT.url + '/instructions', JSON.stringify(commands))
    .then( function(result) {

      if (result.data.success) {
        console.log('Commands acknowledged!');
        return true;
      }

      return false;
    });
  };

  return Rover;

}]);



factories.factory('RoverList', ['Rover', function RoverListFactory(Rover) {

  function RoverList() {
    this.rovers = this.loadRovers();
  }


  RoverList.prototype.loadRovers = function() {
    var storedRovers = localStorage.getItem('rovers');

    if (storedRovers == null)
      return [];

    return JSON.parse(storedRovers);
  }


  RoverList.prototype.saveRovers = function() {
    localStorage.setItem('rovers', JSON.stringify(this.rovers));
  }


  RoverList.prototype.addRover = function(ipAddress) {
    var index = this.rovers.indexOf(ipAddress);
    if (index != -1)
      return index;

    var rover = new Rover(ipAddress);
    if (rover.status()) {
      index = this.rovers.push(ipAddress) - 1;
      this.saveRovers();

      return index;
    }

    return -1;
  }


  RoverList.prototype.clearRovers = function() {
    this.rovers.length = 0;
    this.saveRovers();
  }


  RoverList.prototype.getRover = function(index) {
    if (index < 0 || index >= this.rovers.length) {
      console.log("Rover index out of bounds");
      return null;
    }

    return new Rover(this.rovers[index]);
  }

  var theRoverList = new RoverList();
  return theRoverList;
}]);
