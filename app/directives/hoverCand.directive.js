var app = angular.module('store');

	app.directive("hoverCand", function(){
		return function (scope, element, attrs){
			element.bind("mouseenter", function(){
				element.addClass("hoverCand");
			});
			element.bind("mouseleave", function(){
				element.removeClass("hoverCand");
			});
		}
	});		