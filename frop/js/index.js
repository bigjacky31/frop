function FropFormCtrl($scope) {

	$scope.calculateKilometersCost = function( fiscalPower, kilometers ){
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

	$scope.submit = function() {

		var msg = "";
		msg += "fropIncome : " + $scope.fropIncome + "\n";
		msg += "fropFiscalPower : " + $scope.fropFiscalPower + "\n";
		msg += "fropKilometers : " + $scope.fropKilometers + "\n";
		msg += "fropFoodPrice : " + $scope.fropFoodPrice + "\n";
		msg += "test : " + $scope.calculateKilometersCost( 3, 10000 );

		alert( msg );
	};
}









$(function () {
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
			maxPadding: 0.05,
			plotLines : [{
				value : 17500,
				color : 'green',
				width : 2,
				label : {
					text : 'Rentable'
				}
			}],
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
			data: [[0, 1800], [25000, 1800]]
		}, {
			name: 'Frais réels',
			color: 'rgba(126,86,134,.9)',
			data: [[0, 0], [5000, 1000], [17500, 1800], [20000, 2000], [25000, 3000]]
		}]
	});
});
