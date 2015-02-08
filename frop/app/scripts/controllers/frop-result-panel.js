'use strict';

angular.module('frop').controller('FropResultPanelCtrl', function ($scope, fropCalculator, fropInputDataStore) {

	$scope.mustShowPanel = false;
	

	$scope.$watch(
			function(){
				return fropInputDataStore.getFropInputData();
			},
			function( value ){
				if( value != null ){
					$scope.model = value;
					alert('blabla');
					$scope.mustShowPanel = true;
				}
			}
	);

});
