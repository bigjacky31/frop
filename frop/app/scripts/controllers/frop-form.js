'use strict';

angular.module('frop').controller('FropFormCtrl', function ($scope, fropCalculator, fropInputDataStore, fiscalPowerList) {

	$scope.showErrors = false;
	$scope.model = {
			
	}
	$scope.fiscalPowerList = fiscalPowerList;

	$scope.isSubmitEnabled = function(){
		return ! $scope.fropForm.$pristine && $scope.fropForm.$valid;
	}
	
	$scope.submit = function() {
		if( $scope.fropForm.$valid ){
			fropInputDataStore.setFropInputData( $scope.model );
		}
		else{
			$scope.showErrors = true;
		}
	};
});
