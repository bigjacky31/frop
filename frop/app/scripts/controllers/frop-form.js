'use strict';

angular.module('frop').controller('FropFormCtrl', function ($scope, fropCalculator, fropInputDataStore) {

	$scope.model = fropInputDataStore.getFropInputData();

	$scope.submit = function() {
		fropInputDataStore.setFropInputData( $scope.model );
	};
});
