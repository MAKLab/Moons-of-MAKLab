var controllers = angular.module('controllers', []);

controllers.controller('RoverCtrl', ['$scope', '$http', 'Rover',
  function ($scope, $http, Rover) {
    // The rover we are controlling
    var rover = new Rover('192.168.0.7:5000');

    // Toggles whether we send a list of commands, or direct commands
    var sendDirectCommands = true;

    // The command list
    var commandList = [];

    var addCommand = function(command) {
      if (sendDirectCommands) {
        commandList.push(command);

        if (rover.sendCommands(commandList))
          commandList.length = 0;

      } else {
        commandList.push(command);
      }
    };

    // Provide the camera stream to the HTML
    $scope.cameraStream = rover.cameraStream();


    // Motor controls
    $scope.forward = function(distance) {
      addCommand(rover.forwardCommand(distance));
    };

    $scope.back = function(distance) {
      addCommand(rover.backCommand(distance));
    };

    $scope.left = function(distance) {
      addCommand(rover.leftCommand(distance));
    };

    $scope.right = function(distance) {
      addCommand(rover.rightCommand(distance));
    };


    // Pan/Tilt controls
    $scope.pan = function(distance) {
      addCommand(rover.panCommand(distance));
    };

    $scope.tilt = function(distance) {
      addCommand(rover.tiltCommand(distance));
    };

    $scope.centerCamera = function() {
      addCommand(rover.centerCameraCommand());
    };


    // Houston, we have a problem...
    $scope.abort = function() {
      rover.abort();
    };

    $scope.sendCommands = function() {
      if (sendDirectCommands || commandList.length == 0)
        return;

      if (rover.sendCommands(commandList))
        commandList.length = 0;
    };
  }]);
