var app = angular.module('store');

	app.directive('ratingsDirective',function(){ //Para meter HTML
		return{

			restrict:'E',
			templateUrl:"app/templates/ratings-directive.html"
		}
	});	