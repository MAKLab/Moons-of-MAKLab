var controllers = angular.module('controllers', []);


controllers.controller('RoverListCtrl', ['$scope', '$location', 'RoverList',
  function($scope, $location, RoverList) {

    var roverList = new RoverList(); // This isn't great, RoverList should be a singleton!

    $scope.ipAddress;

    $scope.rovers = roverList.rovers;

    // The user hit the connect button
    $scope.connectToIP = function() {
      var index = roverList.addRover($scope.ipAddress);
      if (index == -1)
        return;

      this.connectToRover(index);
    };


    // The user hit an existing rover button
    $scope.connectToRover = function(index) {
      // TODO: check the rover is online

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
    var sendDirectCommands = false;

    // The command currently being edited
    $scope.currentCommand = null;
    $scope.distance = 0;

    // The command list
    var commandList = [];
    $scope.commandList = commandList;


    var addCommand = function(command) {
      if (sendDirectCommands) {
        commandList.push(command);

        if (rover.sendCommands(commandList))
          commandList.length = 0;

      } else {
        $scope.currentCommand = command;
        $('#distanceModal').modal('show');
      }
    };


    $scope.confirmDistance = function() {
      $('#distanceModal').modal('hide');

      if ($scope.currentCommand == null)
        return;

      var currentCommand = $scope.currentCommand;
      currentCommand.distance = $scope.distance;
      commandList.push(currentCommand);

      $scope.currentCommand = null;
      $scope.distance = 0;
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
