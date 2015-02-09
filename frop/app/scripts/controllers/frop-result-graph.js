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
		
		//Calcul de l'abscisse max du graphe :
		//2 lignes verticales sont à tracer : celle des kms rentables et celle des kms saisis
		//
		//Regle : 
		// -> On prends la distance entre l'axe des ordonnées et la premiere ligne.
		// -> On ajoute cette distance à la deuxieme ligne pour obtenir l'abscisse max
		// -> On arrondit l'abscisse max aux 5000 kms superieur
		var distance = Math.min( rentabilityKms, inputData.kilometers );
		var absMax = Math.max( rentabilityKms, inputData.kilometers ) + distance;
		absMax = Math.ceil(absMax / 5000) * 5000;
		
		var fraisReelsSerieData = [];
		for( var curAbs = 0 ; curAbs <= absMax ; curAbs += 5000 ){
			fraisReelsSerieData.push( [curAbs, fropCalculator.calculateFraisReelsCost(inputData.fiscalPower, curAbs)] );
		}
		
		//On ajoute le point de croisement
		fraisReelsSerieData.push( [rentabilityKms, fropCalculator.calculateFraisReelsCost(inputData.fiscalPower, rentabilityKms)] );
		
		//On ajoute le point du km saisi
		fraisReelsSerieData.push( [inputData.kilometers, fraisReelsCost] );

		//Tri des points a afficher pour la courbe des frais r�els 
		fraisReelsSerieData = sortSerie( fraisReelsSerieData );

		
		//Pour la droite de l'option par défaut, on trace de 0 à absMax
		var defaultSerieData = [[0, defaultCost], [absMax, defaultCost]];
		
		var verticalInputKmsColor;
		if( fraisReelsCost > defaultCost ){
			verticalInputKmsColor = '#3c763d';
		}
		else{
			verticalInputKmsColor = '#a94442';
		}


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
				            	 color : 'black',
				            	 width : 2,
				            	 label : {
				            		 text : 'Rentable'
				            	 }
				             },
				             {
				            	 value : inputData.kilometers,
				            	 color : verticalInputKmsColor,
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
				color: '#a94442',
				data: defaultSerieData
			}, {
				name: 'Frais réels',
				color: '#3c763d',
				//TODO sort data
				data : fraisReelsSerieData
			}]
		});
	};

	
	
	

	$scope.mustShowPanel = false;
	
	//Watch sur fropInputDataStore pour setter mustShowPanel
	$scope.$watch(
			function(){
				return fropInputDataStore.getFropInputData();
			},
			function( value ){
				if( value != null ){
					inputData = value;
					$scope.mustShowPanel = true;
					
					//SetTimeout pour laisser le div s'afficher avant d'init le graph
		        	setTimeout(function() {
						initGraph();
		        	}, 0);
				}
			}
	);

});
