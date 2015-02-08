var myModule = angular.module('myModule', []);
angular.module('frop').factory('fropCalculator', function() {
	
	return {
		calculateFraisReelsCost : function( fiscalPower, kilometers ){
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
		},
		
		calculateDefaultCost : function(income){
			return income * 0.1;
		},
		
		calculateRentabilityKms : function( fiscalPower, income ){
			//Calcul de la borne max
			var defaultCost = this.calculateDefaultCost( income )
			var borneMax = 100000;


			//Calcul par dichotomie
			var borneMin = 0;
			var goOn = true;
			var borneMiddle = ( borneMin + borneMax ) / 2;

			while( borneMax - borneMin > 1 ){
				if( defaultCost > this.calculateFraisReelsCost( fiscalPower, borneMiddle ) ){
					borneMin = borneMiddle;
				}
				else{
					borneMax = borneMiddle;
				}
				borneMiddle = ( borneMin + borneMax ) / 2;
			}
			return borneMiddle;
		}
	};
  
  
});