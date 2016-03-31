var controllers = angular.module('controllers', []);


controllers.controller('RoverListCtrl', ['$scope', '$location', 'Rover',
  function($scope, $location, Rover) {

    var rovers = localStorage.getItem('rovers');
    if (rovers != null) {
      // We need to parse the rovers
      rovers = JSON.parse(rovers);
    } else {
      // Create an empty array
      rovers = [];
    }

    var saveRoverList = function() {
      var roversString = JSON.stringify(rovers);
      console.log("Saving rovers:", roversString);
      localStorage.setItem('rovers', roversString);
    };

    $scope.ipAddress;

    // The user hit the connect button
    $scope.connectToRover = function() {
      var rover = new Rover($scope.ipAddress);
      if (rover.status()) {
        var index = rovers.indexOf($scope.ipAddress);
        if (index == -1) {
          index = rovers.push($scope.ipAddress) - 1;
          saveRoverList();
        }

        var roverUrl = '/rover/' + index;
        $location.path(roverUrl);
        return;
      }
    };


    // Debug - clear rover addresses
    $scope._clearAddresses = function() {
      localStorage.removeItem('rovers');
      rovers = [];
    }

  }]);


controllers.controller('RoverCtrl', ['$scope', '$routeParams', 'Rover',
  function ($scope, $routeParams, Rover) {
    // The rover we are controlling
    var roverAddresses = JSON.parse(localStorage.getItem('rovers'));
    var rover = new Rover(roverAddresses[$routeParams.index]);

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
