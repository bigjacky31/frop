var myModule = angular.module('myModule', []);
angular.module('frop').factory('fropInputDataStore', function() {
	
	var fropInputData = null;
	
	return {
		getFropInputData : function(){
			return fropInputData;
		},
		setFropInputData : function( newFropInputData ){
			fropInputData = angular.copy(newFropInputData);
		}
	};
  
  
});