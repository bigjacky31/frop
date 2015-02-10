'use strict';

angular.module('frop').controller('FropFormCtrl', function ($scope, fropCalculator, fropInputDataStore, fiscalPowerList) {

	$scope.model = {
			
	}
	$scope.fiscalPowerList = fiscalPowerList;

	$scope.isSubmitEnabled = function(){
		return ! $scope.fropForm.$pristine || $scope.fropForm.$invalid;
	}
	
	$scope.submit = function() {
		fropInputDataStore.setFropInputData( $scope.model );
	};
});
