'use strict';

angular.module('frop').controller('FropResultPanelCtrl', function ($scope, fropCalculator, fropInputDataStore, $location, $anchorScroll, anchorSmoothScroll) {

	$scope.mustShowPanel = false;
	
	var initPanel = function() {

		var deductibleFraisReels = fropCalculator.calculateFraisReelsCost( $scope.inputData.fiscalPower, $scope.inputData.kilometers );
		var deductibleDefault = fropCalculator.calculateDefaultCost( $scope.inputData.income );
		var deductibleDelta = Math.abs( deductibleFraisReels - deductibleDefault );
		var rentableKms = fropCalculator.calculateRentabilityKms($scope.inputData.fiscalPower, $scope.inputData.income);
		var rentableIncome = fropCalculator.calculateRentabilityIncome($scope.inputData.fiscalPower, $scope.inputData.kilometers);
		var fraisReelsOk = deductibleFraisReels > deductibleDefault;
		
		$scope.result = {
				deductibleFraisReels : deductibleFraisReels,
				deductibleDefault : deductibleDefault,
				deductibleDelta : deductibleDelta,
				rentableKms : rentableKms,
				rentableIncome : rentableIncome,
				fraisReelsOk : fraisReelsOk
		}

	      //scroll jusqu'au div des resultats
//	      $location.hash('resultDiv');
//	      $anchorScroll();
		anchorSmoothScroll.scrollTo('resultDiv');
		
	};

	$scope.$watch(
			function(){
				return fropInputDataStore.getFropInputData();
			},
			function( value ){
				if( value != null ){
					$scope.inputData = value;
//					alert('blabla');
					$scope.mustShowPanel = true;
					initPanel();
				}
			}
	);

});
