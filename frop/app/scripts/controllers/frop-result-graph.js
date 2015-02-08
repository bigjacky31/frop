'use strict';

angular.module('frop').controller('FropResultGraphCtrl', function ($scope, fropCalculator, fropInputDataStore) {

	var inputData = null;

	var sortSerie = function( serie ){
		var sortedSerie = [];

		for( var i = 0 ; i < serie.length ; i++ ){
			var curPoint = serie[i];
			var goOn = true;
			for( var j = 0 ; goOn && j < sortedSerie.length ; j++ ){
				var curSortedPoint = sortedSerie[j];
				if( curPoint[0] < curSortedPoint[0] ){
					sortedSerie.splice(j, 0, curPoint);
					goOn = false;
				}
			}
			if( goOn ){
				sortedSerie.push(curPoint);
			}
		}

		return sortedSerie;
	};


	var initGraph = function(){
		

		var fraisReelsCost = fropCalculator.calculateFraisReelsCost( inputData.fiscalPower, inputData.kilometers );
		var defaultCost = fropCalculator.calculateDefaultCost( inputData.income );
		var rentabilityKms = fropCalculator.calculateRentabilityKms(inputData.fiscalPower, inputData.income);


		//Calcul des points � afficher pour la courbe des frais r�els
		var fraisReelsSerieData = [
		                           [0, 0], 
		                           [rentabilityKms, fropCalculator.calculateFraisReelsCost(inputData.fiscalPower, rentabilityKms)],
		                           [5000, fropCalculator.calculateFraisReelsCost(inputData.fiscalPower, 5000)], 
		                           [20000, fropCalculator.calculateFraisReelsCost(inputData.fiscalPower, 20000)], 
		                           [30000, fropCalculator.calculateFraisReelsCost(inputData.fiscalPower, 30000)]
		                           ];

		//Tri des points � afficher pour la courbe des frais r�els 
		fraisReelsSerieData = sortSerie( fraisReelsSerieData );



		$('#chart-div').highcharts({
			chart: {
				type: 'area'
			},
			title: {
				text: 'Frais r�els... Ou pas !'
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
					text: 'Kilom�tres'
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
				            		 text : 'Votre kilom�trage'
				            	 }
				             }
				             ],
				             showLastLabel: true
			},
			yAxis: {
				title: {
					text: 'D�ductible'
				},
				labels: {
					formatter: function() {
						return this.value + ' �';
					}
				},
				lineWidth: 2
			},
			legend: {
				enabled: false
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br/>',
				pointFormat: '{point.x} km: {point.y} �'
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
				name: 'Frais r�els',
				color: 'rgba(126,86,134,.9)',
				//TODO sort data
				data : fraisReelsSerieData
			}]
		});
	};

	$scope.mustShowPanel = false;
	$scope.$watch(
			function(){
				return fropInputDataStore.getFropInputData();
			},
			function( value ){
				if( value != null ){
					inputData = value;
					$scope.mustShowPanel = true;
					initGraph();
				}
			}
	);






});
