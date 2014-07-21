function FropFormCtrl($scope) {

	$scope.calculateFraisReelsCost = function( fiscalPower, kilometers ){
		//Bareme 2014
		// cf http://www.service-public.fr/actualites/003037.html
		if( fiscalPower <= 3 ){
			if( kilometers <= 5000 ){ return kilometers * 0.408; }
			else if( kilometers <= 20000 ){ return kilometers * 0.244 + 820; }
			else{ return kilometers * 0.285; }
		}
		else if( fiscalPower == 4 ){
			if( kilometers <= 5000 ){ return kilometers * 0.491; }
			else if( kilometers <= 20000 ){ return kilometers * 0.276 + 1077; }
			else{ return kilometers * 0.330; }
		}
		else if( fiscalPower == 5 ){
			if( kilometers <= 5000 ){ return kilometers * 0.540; }
			else if( kilometers <= 20000 ){ return kilometers * 0.303 + 1182; }
			else{ return kilometers * 0.362; }
		}
		else if( fiscalPower == 6 ){
			if( kilometers <= 5000 ){ return kilometers * 0.565; }
			else if( kilometers <= 20000 ){ return kilometers * 0.318 + 1238; }
			else{ return kilometers * 0.380; }
		}
		else{
			if( kilometers <= 5000 ){ return kilometers * 0.592; }
			else if( kilometers <= 20000 ){ return kilometers * 0.335 + 1282; }
			else{ return kilometers * 0.399; }
		}
	};

	$scope.calculateDefaultCost = function(income){
		return income * 0.1;
	};

	$scope.calculateRentabilityKms = function( fiscalPower, income ){
		//Calcul de la borne max
		var defaultCost = $scope.calculateDefaultCost( income )
		var borneMax = 100000;


		//Calcul par dichotomie
		var borneMin = 0;
		var goOn = true;
		var borneMiddle = ( borneMin + borneMax ) / 2;

		while( borneMax - borneMin > 1 ){
			if( defaultCost > $scope.calculateFraisReelsCost( fiscalPower, borneMiddle ) ){
				borneMin = borneMiddle;
			}
			else{
				borneMax = borneMiddle;
			}
			borneMiddle = ( borneMin + borneMax ) / 2;
		}
		return borneMiddle;
	};


	$scope.submit = function() {

		var msg = "";
		msg += "fropIncome : " + $scope.fropIncome + "\n";
		msg += "fropFiscalPower : " + $scope.fropFiscalPower + "\n";
		msg += "fropKilometers : " + $scope.fropKilometers + "\n";
		msg += "fropFoodPrice : " + $scope.fropFoodPrice + "\n";

		var fraisReelsCost = $scope.calculateFraisReelsCost( $scope.fropFiscalPower, $scope.fropKilometers );
		var defaultCost = $scope.calculateDefaultCost( $scope.fropIncome );
		var rentabilityKms = $scope.calculateRentabilityKms($scope.fropFiscalPower, $scope.fropIncome);

		msg += "calculateFraisReelsCost : " + fraisReelsCost + "\n";
		msg += "calculateDefaultCost : " + defaultCost + "\n";
		msg += "calculateRentabilityKms : " + rentabilityKms + "\n";


		//TODO A FAIRE
		if( fraisReelsCost > defaultCost ){
			$('.well p').html('Pour vous, il est plus intéressant de passer au frais réels. Blablabla blablabla');
		}
		else{
			$('.well p').html('Pour vous, c\'est nul');
		}



		alert( msg );



		$('#chart-div').highcharts({
			chart: {
				type: 'area'
			},
			title: {
				text: 'Frais réels... Ou pas !'
			},
			credits: {
				enabled: false
			},
			exporting: {
				enabled: false 
			},

			xAxis: {
				title: {
					enabled: true,
					text: 'Kilomètres'
				},
				labels: {
					formatter: function() {
						return this.value +' km';
					}
				},
				plotLines : [
				             {
				            	 value : rentabilityKms,
				            	 color : 'green',
				            	 width : 2,
				            	 label : {
				            		 text : 'Rentable'
				            	 }
				             },
				             {
				            	 value : $scope.fropKilometers,
				            	 color : 'red',
				            	 width : 2,
				            	 label : {
				            		 text : 'Votre kilométrage'
				            	 }
				             }
				             ],
				             showLastLabel: true
			},
			yAxis: {
				title: {
					text: 'Déductible'
				},
				labels: {
					formatter: function() {
						return this.value + ' €';
					}
				},
				lineWidth: 2
			},
			legend: {
				enabled: false
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br/>',
				pointFormat: '{point.x} km: {point.y} €'
			},
			plotOptions: {
				spline: {
					marker: {
						enable: false
					}
				}
			},
			series: [{
				name: '10%',
				color: 'rgba(165,170,217,1)',
				data: [[0, defaultCost], [30000, defaultCost]]
			}, {
				name: 'Frais réels',
				color: 'rgba(126,86,134,.9)',
				//TODO sort data
				data: [
				       [0, 0], 
				       [rentabilityKms, $scope.calculateFraisReelsCost($scope.fropFiscalPower, rentabilityKms)],
				       [5000, $scope.calculateFraisReelsCost($scope.fropFiscalPower, 5000)], 
				       [20000, $scope.calculateFraisReelsCost($scope.fropFiscalPower, 20000)], 
				       [30000, $scope.calculateFraisReelsCost($scope.fropFiscalPower, 30000)]
				       
				       ]
			}]
		});
	};
}
