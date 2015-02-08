'use strict';

angular.module('frop').controller('FropFormCtrl', function ($scope, fropCalculator, fropInputDataStore) {

	$scope.model = fropInputDataStore.getFropInputData();



	$scope.submit = function() {

		var msg = "";
		msg += "fropIncome : " + $scope.model.fropIncome + "\n";
		msg += "fropFiscalPower : " + $scope.model.fropFiscalPower + "\n";
		msg += "fropKilometers : " + $scope.model.fropKilometers + "\n";
		msg += "fropFoodPrice : " + $scope.model.fropFoodPrice + "\n";
		
		
		fropInputDataStore.setFropInputData( $scope.model );
		

		var fraisReelsCost = fropCalculator.calculateFraisReelsCost( $scope.fropFiscalPower, $scope.fropKilometers );
		var defaultCost = fropCalculator.calculateDefaultCost( $scope.fropIncome );
		var rentabilityKms = fropCalculator.calculateRentabilityKms($scope.fropFiscalPower, $scope.fropIncome);

		msg += "calculateFraisReelsCost : " + fraisReelsCost + "\n";
		msg += "calculateDefaultCost : " + defaultCost + "\n";
		msg += "calculateRentabilityKms : " + rentabilityKms + "\n";

		alert( msg );

		//TODO A FAIRE
		if( fraisReelsCost > defaultCost ){
			$('#result-sentence').html('<strong>Pour vous, il est plus int�ressant de passer au frais r�els. Blablabla blablabla</strong>');
		}
		else{
			$('#result-sentence').html('<strong>Pour vous, c\'est nul</strong>');
		}



	};
});
