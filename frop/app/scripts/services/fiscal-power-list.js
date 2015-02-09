angular.module('frop').factory('fiscalPowerList', function() {

	var fiscalPowerList = [
	                       { value : 3, label : "<= 3 CV" },
	                       { value : 4, label : "4 CV" },
	                       { value : 5, label : "5 CV" },
	                       { value : 6, label : "6 CV" },
	                       { value : 7, label : ">= 7 CV" }
	                       ];

	return fiscalPowerList;



});