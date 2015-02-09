'use strict';

angular.module('frop').controller('FropFormCtrl', function ($scope, fropCalculator, fropInputDataStore, fiscalPowerList) {

	$scope.model = fropInputDataStore.getFropInputData();
	$scope.fiscalPowerList = fiscalPowerList;

	$scope.submit = function() {
		fropInputDataStore.setFropInputData( $scope.model );
	};
});
