'use strict';

angular.module('frop').controller('FropResultPanelCtrl', function ($scope, fropCalculator, fropInputDataStore, $location, $anchorScroll, anchorSmoothScroll) {

	$scope.mustShowPanel = false;
	
	var initPanel = function() {

		var deductibleFraisReels = fropCalculator.calculateFraisReelsCost( $scope.inputData.fiscalPower, $scope.inputData.kilometers, $scope.inputData.foodPrice );
		var deductibleDefault = fropCalculator.calculateDefaultCost( $scope.inputData.income );
		var deductibleDelta = Math.abs( deductibleFraisReels - deductibleDefault );
		var rentableKms = fropCalculator.calculateRentabilityKms($scope.inputData.fiscalPower, $scope.inputData.income, $scope.inputData.foodPrice);
		var rentableIncome = fropCalculator.calculateRentabilityIncome($scope.inputData.fiscalPower, $scope.inputData.kilometers, $scope.inputData.foodPrice);
		var fraisReelsOk = deductibleFraisReels > deductibleDefault;
		
		$scope.result = {
				deductibleFraisReels : deductibleFraisReels,
				deductibleDefault : deductibleDefault,
				deductibleDelta : deductibleDelta,
				rentableKms : rentableKms,
				rentableIncome : rentableIncome,
				fraisReelsOk : fraisReelsOk
		}

//	      $location.hash('resultDiv');
//	      $anchorScroll();
	      //scroll jusqu'au div des resultats
		//SetTimeout pour laisser le div s'afficher avant d'init le graph
    	setTimeout(function() {
    		anchorSmoothScroll.scrollTo('resultDiv');
    	}, 0);
		
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
