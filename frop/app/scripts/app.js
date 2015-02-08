'use strict';

/**
 * @ngdoc overview
 * @name frop
 * @description
 * # frop
 *
 * Main module of the application.
 */
angular.module('frop', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/frop-page.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  
  .directive('staticInclude', function($http, $templateCache, $compile) {
	    return function(scope, element, attrs) {
	        var templatePath = attrs.staticInclude;
	        $http.get(templatePath, { cache: $templateCache }).success(function(response) {
	            var contents = element.html(response).contents();
	            $compile(contents)(scope);
	        });
	    };
	});
