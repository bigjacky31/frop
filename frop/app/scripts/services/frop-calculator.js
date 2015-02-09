angular.module('frop').factory('fropCalculator', function() {
	
	return {
		calculateFraisReelsCost : function( fiscalPower, kilometers ){
			//Bareme 2014
			// cf http://www.service-public.fr/actualites/003037.html
			var res = 0;
			if( fiscalPower.value <= 3 ){
				if( kilometers <= 5000 ){ res = kilometers * 0.408; }
				else if( kilometers <= 20000 ){ res = kilometers * 0.244 + 820; }
				else{ res = kilometers * 0.285; }
			}
			else if( fiscalPower.value == 4 ){
				if( kilometers <= 5000 ){ res = kilometers * 0.491; }
				else if( kilometers <= 20000 ){ res = kilometers * 0.276 + 1077; }
				else{ res = kilometers * 0.330; }
			}
			else if( fiscalPower.value == 5 ){
				if( kilometers <= 5000 ){ res = kilometers * 0.540; }
				else if( kilometers <= 20000 ){ res = kilometers * 0.303 + 1182; }
				else{ res = kilometers * 0.362; }
			}
			else if( fiscalPower.value == 6 ){
				if( kilometers <= 5000 ){ res = kilometers * 0.565; }
				else if( kilometers <= 20000 ){ res = kilometers * 0.318 + 1238; }
				else{ res = kilometers * 0.380; }
			}
			else if( fiscalPower.value == 7 ){
				if( kilometers <= 5000 ){ res = kilometers * 0.592; }
				else if( kilometers <= 20000 ){ res = kilometers * 0.335 + 1282; }
				else{ res = kilometers * 0.399; }
			}
			return Math.round( res );
		},
		
		calculateDefaultCost : function(income){
			return Math.round( income * 0.1 );
		},
		
		calculateRentabilityKms : function( fiscalPower, income ){
			//Calcul de la borne max
			var defaultCost = this.calculateDefaultCost( income )
			var borneMax = 1000000;


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
			return Math.round( borneMiddle );
		},
		
		

		
		calculateRentabilityIncome : function( fiscalPower, kms ){
			//Calcul de la borne max
			var borneMax = 10000000;
			var fraisReelsCost = this.calculateFraisReelsCost( fiscalPower, kms );

			//Calcul par dichotomie
			var borneMin = 0;
			var goOn = true;
			var borneMiddle = ( borneMin + borneMax ) / 2;

			while( borneMax - borneMin > 1 ){
				var defaultCost = this.calculateDefaultCost( borneMiddle )
				if( defaultCost < fraisReelsCost ){
					borneMin = borneMiddle;
				}
				else{
					borneMax = borneMiddle;
				}
				borneMiddle = ( borneMin + borneMax ) / 2;
			}
			return Math.round( borneMiddle );
		}
	};
  
  
});