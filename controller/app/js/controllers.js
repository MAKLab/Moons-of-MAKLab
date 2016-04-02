var controllers = angular.module('controllers', []);


controllers.controller('RoverListCtrl', ['$scope', '$location', 'RoverList',
  function($scope, $location, RoverList) {

    var roverList = new RoverList(); // This isn't great, RoverList should be a singleton!

    $scope.ipAddress;

    // The user hit the connect button
    $scope.connectToRover = function() {
      var index = roverList.addRover($scope.ipAddress);
      if (index == -1)
        return;

      var roverUrl = '/rover/' + index;
      $location.path(roverUrl);
    };


    // Debug - clear rover addresses
    $scope._clearAddresses = function() {
      roverList.clearRovers();
    }

  }]);


controllers.controller('RoverCtrl', ['$scope', '$routeParams', 'RoverList',
  function ($scope, $routeParams, RoverList) {
    var roverList = new RoverList(); // This isn't great, RoverList should be a singleton!

    // The rover we are controlling
    var rover = roverList.getRover($routeParams.index);
    if (rover == null) {
      console.log("There is no rover at this index!", $routeParams.index);
    }

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
