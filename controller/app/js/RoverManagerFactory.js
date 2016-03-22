'use strict'

/* RoverManagementFactory */

var factories = angular.module('factories', []);

factories.factory('RoverManager', [function RoverManagerFactory() {

  function RoverManager() {
    console.log("RoverManager created");
  };

  return RoverManager;
}]);
