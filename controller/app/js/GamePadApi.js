'use strict'

/* GamePadApi */

var gamePadApi = angular.module('GamePadApi', []);

gamePadApi.factory('GamePad', [ function GamePadFactory() {

  function GamePad() {

  };

  var theGamePad = new GamePad();
  return theGamePad;
}]);
