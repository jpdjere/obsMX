var app = angular.module('store');

	app.directive('metodologiaDirective',function(){ //Para meter HTML
		return{

			restrict:'E',
			templateUrl:"app/templates/metodologia-directive.html"
		}
	});