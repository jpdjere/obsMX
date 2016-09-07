var app = angular.module('store');

	app.controller('TabsController', ["$scope",function($scope,$window) {
        this.tab = 1;
   

        this.isSet = function(checkTab) {
          return this.tab === checkTab;
        };

        this.setTab = function(activeTab) {
          this.tab = activeTab;

        };

        $scope.numeroSlider.mes = 0;


      }]);