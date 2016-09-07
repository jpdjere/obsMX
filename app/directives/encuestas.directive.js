var app = angular.module('store');

	app.directive('encuestasDirective',function(){ //Para meter HTML
		return{

			restrict:'E',
			templateUrl:"app/templates/encuestas.html"
		}
	});	