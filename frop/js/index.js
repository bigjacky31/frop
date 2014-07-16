$(function () {
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
			data: [[0, 1800], [25000, 1800]]
		}, {
			name: 'Frais r�els',
			color: 'rgba(126,86,134,.9)',
			data: [[0, 0], [5000, 1000], [17500, 1800], [20000, 2000], [25000, 3000]]
		}]
	});
});
