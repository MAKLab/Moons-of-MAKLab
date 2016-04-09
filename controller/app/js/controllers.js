var controllers = angular.module('controllers', []);


controllers.controller('RoverListCtrl', ['$scope', '$location', 'RoverList',
  function($scope, $location, RoverList) {

    $scope.ipAddress;

    $scope.rovers = RoverList.rovers;

    // The user hit the connect button
    $scope.connectToIP = function() {
      var index = RoverList.addRover($scope.ipAddress);
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
      RoverList.clearRovers();
    }

  }]);


controllers.controller('RoverCtrl', ['$scope', '$routeParams', 'RoverList',
  function ($scope, $routeParams, RoverList) {

    // The rover we are controlling
    var rover = RoverList.getRover($routeParams.index);
    if (rover == null) {
      console.log("There is no rover at this index!", $routeParams.index);
    }

    // Toggles whether we send a list of commands, or direct commands
    var sendDirectCommands = false;

    
    $scope.DistanceTypes = { NotSet: 1, Time: 2, Angle: 3 };
    $scope.distanceType = $scope.DistanceTypes.NoteSet;


    // The command currently being edited
    $scope.currentCommand = null;
    $scope.distance = 0;

    // The command list
    var commandList = [];
    $scope.commandList = commandList;


    var addCommand = function(command) {
      if (sendDirectCommands) {
        commandList.push(command);

        if (rover.sendCommands(commandList)) {
          commandList.length = 0;
	  $scope.distaceType = $scope.DistanceTypes.NotSet;
	}

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
      //if ($scope.distanceType == $scope.DistanceTypes.Time)
      //  currentCommand.distance = $scope.distance * 10;
      //else
        currentCommand.distance = $scope.distance;
      
      commandList.push(currentCommand);

      $scope.currentCommand = null;
      $scope.distance = 0;
      $scope.distaceType = $scope.DistanceTypes.NotSet;
    };


    // Provide the camera stream to the HTML
    $scope.cameraStream = rover.cameraStream();


    // Motor controls
    $scope.forward = function(distance) {
      $scope.distaceType = $scope.DistanceTypes.Time;
      addCommand(rover.forwardCommand(distance));
    };

    $scope.back = function(distance) {
      $scope.distaceType = $scope.DistanceTypes.Time;
      addCommand(rover.backCommand(distance));
    };

    $scope.left = function(distance) {
      $scope.distaceType = $scope.DistanceTypes.Angle;
      addCommand(rover.leftCommand(distance));
    };

    $scope.right = function(distance) {
      $scope.distaceType = $scope.DistanceTypes.Angle;
      addCommand(rover.rightCommand(distance));
    };


    // Pan/Tilt controls
    $scope.pan = function(distance) {
      $scope.distaceType = $scope.DistanceTypes.Angle;
      addCommand(rover.panCommand(distance));
    };

    $scope.tilt = function(distance) {
      $scope.distaceType = $scope.DistanceTypes.Angle;
      addCommand(rover.tiltCommand(distance));
    };

    $scope.centerCamera = function() {
      $scope.distaceType = $scope.DistanceTypes.Angle;
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
