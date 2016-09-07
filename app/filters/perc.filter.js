var app = angular.module('store');

	app.filter('percentage', ['$filter', function ($filter) {
  		return function (input, decimals) {
  			if(input > 0.9999){
  				return $filter('number')(input * 100, 0) + '%';
  			}else if(input > 0 && input < 0.1){
  				return $filter('number')(input * 100, 1) + '%';
   			}else {
  				return $filter('number')(input * 100, 1) + '%';
   			}
  		};
	}]);	

  app.filter('object2Array', ['$filter', function ($filter) {
    return function(input) {
      var out = []; 
      for(i in input){
        out.push(input[i]);
      }
      return out;
    }
  }])