'use strict';

/**
 * @ngdoc function
 * @name titiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the titiApp
 */
angular.module('titiApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
