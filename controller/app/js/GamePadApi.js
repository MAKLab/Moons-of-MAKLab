'use strict'

/* GamepadApi */

var gamePadApi = angular.module('GamepadApi', []);

gamePadApi.factory('Gamepad', ['$window', function GamepadFactory($window) {

  var requestAnimationFrame = $window.mozRequestAnimationFrame
                              || $window.webkitRequestAnimationFrame
                              || $window.requestAnimationFrame;

  function Gamepad() {

    this.controllers = {};

  };


  Gamepad.prototype.addGamepad = function(gamepad) {
    this.controllers[gamepad.index] = gamepad;
    requestAnimationFrame(updateStatus);
  };


  Gamepad.prototype.removeGamepad = function(gamepad) {
    delete this.controllers[gamepad.index];
  };


  function updateStatus() {
    scanGamepads();

    // ...

    requestAnimationFrame(updateStatus);
  };


  function scanGamepads() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for (var i = 0; i < gamepads.length; i++) {
      if (gamepads[i]) {
        if (!(gamepads[i].index in controllers)) {
          theGamepad.addGamepad(gamepads[i]);
        } else {
          theGamepad.controllers[gamepads[i].index] = gamepads[i];
        }
      }
    }
  };


  var theGamepad = new Gamepad();

  var haveEvents = 'GamepadEvent' in $window;
  var haveWebkitEvents = 'WebKitGamepadEvent' in $window;

  function connectHandler(e) {
    console.log("Gamepad connected!");
    theGamepad.addGamepad(e.gamepad);
  };

  function disconnectHandler(e) {
    console.log("Gamepad disconnected!");
    theGamepad.removeGamepad(e.gamepad);
  };


  if (haveEvents) {
    console.log('Has GamepadEvent');
    $window.addEventListener("gamepadconnected", connectHandler);
    $window.addEventListener("gamepaddisconnected", disconnectHandler);
  } else if (haveWebkitEvents) {
    console.log('Has WebKitGamepadEvent');
    $window.addEventListener("webkitgamepadconnected", connectHandler);
    $window.addEventListener("webkitgamepaddisconnected", disconnectHandler);
  } else {
    console.log('No GamepadEvent or WebKitGamepasEvent !');
    // setInterval(scangamepads, 500);
  }

  return theGamepad;
}]);
