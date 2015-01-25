'use strict';

/**
 * @ngdoc function
 * @name titiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the titiApp
 */
angular.module('titiApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
