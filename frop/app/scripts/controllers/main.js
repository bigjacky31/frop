'use strict';

/**
 * @ngdoc function
 * @name frop.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frop app
 */
angular.module('frop')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
