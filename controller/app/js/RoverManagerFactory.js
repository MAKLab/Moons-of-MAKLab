'use strict'

/* RoverManagementFactory */

var factories = angular.module('factories', []);

factories.factory('RoverManager', [function RoverManagerFactory() {

  function RoverManager() {
    console.log("RoverManager created");
    
    // Create the Socket
    chrome.sockets.udp.create({}, function(socketInfo) {
    
      // The socket is created, now we can send some data
      var socketId = socketInfo.socketId;
      var arrayBuffer = new ArrayBuffer(12);
      chrome.sockets.udp.send(socketId, arrayBuffer,'127.0.0.1', 1337,
        function(sendInfo) {
          console.log("sent " + sendInfo.bytesSent);
        });
    });

  };

  return RoverManager;
}]);
