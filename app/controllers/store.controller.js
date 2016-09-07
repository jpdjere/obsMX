var app = angular.module('store');

	app.controller('StoreController', ["$scope",function($scope,$window){
		//Traigo la data de data.js
		this.ratings = ratings;
		this.encuestas = encuestas;

		//Meto las encuestas en su array
		$scope.encuestas = [];
		for(var i = 0;i<=12;i++){

			$scope.encuestas[i] = this.encuestas[i];
			
		};
 
		$scope.margins = [0,10,20,30,40,50,60];


		
		//Cargo datos que se cargan en el primer arg de createGraphFunction
		$scope.datos = [];

		for(var i = 0;i<=12;i++){

			$scope.datos[i] = cand[i][0];  //el 0 es por el ultimo mes

		}


		$scope.numeroSlider = {mes1:0,mes2:0,mes3:0,mes4:0,mes5:0,mes6:0,mes7:0,mes8:0,mes9:0,mes10:0,mes11:0,mes12:0,mes13:0};



		//Cargo contenedores de graficos
		$scope.svgs = [];
		$scope.svgs[0] = d3.select("#mapa");  //Defino el 0 como el mapa y cargo a partir del 1
		for(var i = 1;i<=13;i++){
			
			$scope.svgs[i] = d3.select("#svg"+i);
			
		}

		//Cargo contenedores de graficos
		$scope.numeros = numeros;






		$scope.emptyEncuestas = false;
		$scope.fichaTec = false;
		$scope.fichaTecIndex;



		/*
		//Data de encuestas
		$scope.dataPASO = dataPASO;
		$scope.dataPASOpost = dataPASOpost;
		$scope.dataPV = dataPV;
		$scope.dataPVpost = dataPVpost;
		$scope.dataPasoCABA = dataPasoCABA;
		$scope.dataGralCABA = dataGralCABA;
		$scope.dataBallotageCABA = dataBallotageCABA;
		$scope.dataPasoProv = dataPasoProv;
		$scope.dataPasoProvPost = dataPasoProvPost;

		*/

		$scope.mobMenuOn = false;
		$scope.devTest = false;
		$scope.diferenciasPrePaso = false;



	}]);