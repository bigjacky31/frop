'use strict';

/**
 * @ngdoc function
 * @name frop.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frop app
 */
angular.module('frop')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
