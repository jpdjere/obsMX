var app = angular.module('store');

app.directive('difsDirective',['$sce',function($sce){ //Para meter HTML$

		return{

			restrict:'E',
			controller: function($scope,$http,$sce){

				$scope.dataGraf = []; // Contienen objetos que contienen MES y DATO
				$scope.diferenciasGraf = [];
				$scope.check = [];

				$scope.dataGrafPost = []; // Contienen objetos que contienen MES y DATO
				$scope.diferenciasGrafPost = [];
				$scope.check = [];

				function Par(date,diferencia) //objecto Par constructor
				{
					this.date=date;
					this.diferencia=diferencia;
				}

				function createData(mes,dataGraf,diferenciasGraf,antesodps){

					var fechasTemp;
					if(antesodps === 0){
						fechasTemp = fechasPost;
					}else{
						fechasTemp = fechas;
					}
					
					tuva = dataGraf.push(new Par(fechasTemp[mes],diferenciasGraf[mes]));
					console.log("------------------");
					console.log(dataGraf[mes]);
					console.log(dataGraf[mes].date);
					console.log(dataGraf[mes].diferencia);
					console.log("------------------");
				}				
				
				$scope.createGraph = function(antesodps){



					var myFormatters = d3.locale({
					  "decimal": ".",
					  "thousands": ",",
					  "grouping": [3],
					  "currency": ["$", ""],
					  "dateTime": "%a %b %e %X %Y",
					  "date": "%m/%d/%Y",
					  "time": "%H:%M:%S",
					  "periods": ["AM", "PM"],
					  "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
					  "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
					  "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
					  "shortMonths": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
					});
					

					d3.time.format = myFormatters.timeFormat;

					var arrData;
					var x = d3.time.scale()
					    .range([0, 350]);

					var xAxis;

					if(antesodps === 0){
						arrData = $scope.dataGrafPost;
						xAxis = d3.svg.axis()
						    .scale(x)
						    .orient("bottom")
						    .tickFormat(myFormatters.timeFormat("%e-%b"))
						    .ticks(d3.time.days,16)
					}else{
						arrData = $scope.dataGraf;
						xAxis = d3.svg.axis()
						    .scale(x)
						    .orient("bottom")
						    .tickFormat(myFormatters.timeFormat("%b"))
						    .ticks(7)
					}
					
					/*var arrData = [
					    ["2012-1",200],
					    ["2012-2", 300], 
					    ["2012-3", 150]];
					    */
					     
					var margin = {top: 20, right: 20, bottom: 30, left: 50},
					    width = 960 - margin.left - margin.right,
					    height = 500 - margin.top - margin.bottom;

					var parseDate = d3.time.format("%Y-%m-%d").parse;
					//var parseDate = myFormatters.timeFormat("d-m-Y").parse;


					var y = d3.scale.linear()
					    .range([250, 0]);

					/*var xAxis = d3.svg.axis()
					    .scale(x)
					    .orient("bottom")
					    //.tickFormat(myFormatters.timeFormat("%e-%b"))
					    .tickFormat(myFormatters.timeFormat("%b"))
					    //.ticks(fechas.length)
					    .ticks(7)
					    //.tickFormat(d3.time.format("%e-%B"));*/

					var yAxis = d3.svg.axis()
					    .scale(y)
					    .orient("left")
					    .tickFormat(function(d) { 
					    	var prob = d*100; 
					    	var prob2=prob.toFixed(1); 
					    	return prob2 + "%"; 
					    });

					var line;
					var dataTemp = arrData.map(function(d) {
					    return {
					       date: parseDate(d.date),
					       close: d.diferencia
					    };

					    console.log("Data temp---------------------->:"+dataTemp);
					 		    

					});

					var line = d3.svg.line()
						    .x(function(d) { return x(d.date); })
						    .y(function(d) { return y(d.close); })
						    .interpolate("linear");

					var svgNombre;
					if(antesodps === 0){
						d3.select("#containerPost").html('');
						svgNombre = "#containerPost";
					}else{
						d3.select("#container").html('');
						svgNombre = "#container";
					}

					
					var svg;

					/*---------------------------TRANSFORMACION GRAFICO PARA MOBILE--------------------------*/
					if(screen.width<720){
					svg = d3.select(svgNombre).append("svg")
						.attr("width", "100%")
					    .attr("height", "100%")
					    .attr("viewBox","45 -5 230 280")
						.attr("preserveAspectRatio","xMidYMid")
						.append("g")
					    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

					}else{
					svg = d3.select(svgNombre).append("svg")
						.attr("width", "100%")
					    .attr("height", "100%")
					    .append("g")
					    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

					}
					/*-------------------------------------------------------------------------------------------*/	

	

					
					var limiteFechaInf=d3.min(dataTemp, function(d) { return d.date; });
					var limiteFechaSup=d3.max(dataTemp, function(d) { return d.date; });					

					var limitePorcInf=d3.min(dataTemp, function(d) { return d.close; });
					var limitePorcSup=d3.max(dataTemp, function(d) { return d.close; });

					//limiteFechaInf.setDate(limiteFechaInf.getDate());
					//console.log("Fecha Inf---------->: "+limiteFechaInf);
					//console.log("Fecha Sup---------->: "+limiteFechaSup);
					limiteFechaInf.setDate(limiteFechaInf.getDate() - 5);
					limiteFechaSup.setDate(limiteFechaSup.getDate() +15);

					var diferencia_limites = limitePorcSup - limitePorcInf;
					if(diferencia_limites<0.01){
						limitePorcInf=limitePorcInf-0.001;
						limitePorcSup=limitePorcSup+0.001;					
					}else{
						limitePorcInf=limitePorcInf-0.01;
						limitePorcSup=limitePorcSup+0.01;
					}

					/*console.log("------------------------------------");
					console.log("Minimo:" +limiteFechaInf);
					console.log("Maximo:" +limiteFechaSup);
					*/
					
					x.domain([limiteFechaInf,limiteFechaSup]);
					y.domain([limitePorcInf,limitePorcSup]);
					//x.domain([d3.min(dataTemp, function(d) { return d.date; })-1, d3.max(dataTemp, function(d) { return d.date; })+1]);
					//y.domain(d3.extent(dataTemp, function(d) { return d.close; }));

					svg.append("g")
					    .attr("class", "x axis")
					    .attr("transform", "translate(0," + 250 + ")")
					    .call(xAxis);

					svg.append("g")
					    .attr("class", "y axis")
					    .call(yAxis)
					  .append("text")
					    .attr("transform", "rotate(-90)")
					    .attr("y", 6)
					    .attr("dy", ".71em")
					    .style("text-anchor", "end")
					    .style("font-family", "stag")
					    .text("Probabilidad (%)");

					var path = svg.append("path")
					    .datum(dataTemp)
					    .attr("class", "line")
					    .attr("d", line(dataTemp))

					var totalLength = path.node().getTotalLength()-10;
					console.log("Path Length----->" +path.node().getTotalLength());

					path.attr("stroke-dasharray", totalLength + " " + totalLength)
						.attr("stroke-dashoffset", totalLength)
						.transition()
						  .duration(550)
						  .ease("linear")
						  .attr("stroke-dashoffset", 0);
     				 
 					svg.on("click", function(){
				      path      
				        .transition()
				        .duration(550)
				        .ease("linear")
				        .attr("stroke-dashoffset", totalLength);
				    })	
 				}

 				//TERMINA $scope.createGraph





				$scope.createCompDif = function(antesodps){
						

						/*-------------------------------------------POST-----------------------------------------------------------------------------------*/
						/*-------------------------------------------POST-----------------------------------------------------------------------------------*/
						/*-------------------------------------------POST-----------------------------------------------------------------------------------*/
						/*-------------------------------------------POST-----------------------------------------------------------------------------------*/
						/*-------------------------------------------POST-----------------------------------------------------------------------------------*/
						/*-------------------------------------------POST-----------------------------------------------------------------------------------*/
					if(antesodps === 0){

						if($scope.izqIndexPost === 0 && $scope.derIndexPost === 1){//Scioli-Macri
							$scope.compDifPost = 0;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						} 
						if($scope.izqIndexPost === 1 && $scope.derIndexPost === 0){//Macri-Scioli
							$scope.compDifPost = 6;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}


						if($scope.izqIndexPost === 0 && $scope.derIndexPost === 2){//Scioli-Massa
							$scope.compDifPost = 1;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						} 
						if($scope.izqIndexPost === 2 && $scope.derIndexPost === 0){//Massa-Scioli
							$scope.compDifPost = 7;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}


						if($scope.izqIndexPost === 1 && $scope.derIndexPost === 2){//Macri-Massa
							$scope.compDifPost = 2;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						} 
						if($scope.izqIndexPost === 2 && $scope.derIndexPost === 1){//Massa-Macri
							$scope.compDifPost = 8;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}


						if($scope.izqIndexPost === 0 && $scope.derIndexPost === 3){//Scioli-Cobos
							$scope.compDifPost = 3;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						} 
						if($scope.izqIndexPost === 3 && $scope.derIndexPost === 0){//Cobos-Scioli
							$scope.compDifPost = 9;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}


						if($scope.izqIndexPost === 1 && $scope.derIndexPost === 3){//Macri-Cobos
							$scope.compDifPost = 4;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						} 
						if($scope.izqIndexPost === 3 && $scope.derIndexPost === 1){//Cobos-Macri
							$scope.compDifPost = 10;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}

						if($scope.izqIndexPost === 2 && $scope.derIndexPost === 3) {//Massa-Cobos
							$scope.compDifPost = 5;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						}
						if($scope.izqIndexPost === 3 && $scope.derIndexPost === 2){//Cobos-Massa
							$scope.compDifPost = 11;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';


						}
						/*---------------------------DELCAÑO VS TODOS---------------------*/

						if($scope.izqIndexPost === 0 && $scope.derIndexPost === 4) {//Scioli-DelCaño
							$scope.compDifPost = 12;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						}
						if($scope.izqIndexPost === 4 && $scope.derIndexPost === 0){//DelCaño-Scioli
							$scope.compDifPost = 16;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}						
						if($scope.izqIndexPost === 1 && $scope.derIndexPost === 4) {//Macri-DelCaño
							$scope.compDifPost = 13;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						}
						if($scope.izqIndexPost === 4 && $scope.derIndexPost === 1){//DelCaño-Macri
							$scope.compDifPost = 17;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}							
						if($scope.izqIndexPost === 2 && $scope.derIndexPost === 4) {//Massa-DelCaño
							$scope.compDifPost = 14;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						}
						if($scope.izqIndexPost === 4 && $scope.derIndexPost === 2){//DelCaño-Massa
							$scope.compDifPost = 18;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}							
						if($scope.izqIndexPost === 3 && $scope.derIndexPost === 4) {//Cobos-DelCaño
							$scope.compDifPost = 15;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						}
						if($scope.izqIndexPost === 4 && $scope.derIndexPost === 3){//DelCaño-Cobos
							$scope.compDifPost = 19;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}					



						/*-------------------------------RODRIGUEZ SAA Y NSNC-------------------------*/
						if($scope.izqIndexPost === 0 && $scope.derIndexPost === 5) {//Scioli-Rodríguez Saa
							$scope.compDifPost = 20;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						}
						if($scope.izqIndexPost === 5 && $scope.derIndexPost === 0){//Rodríguez Saa-Scioli
							$scope.compDifPost = 29;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}
						if($scope.izqIndexPost === 0 && $scope.derIndexPost === 6) {//Scioli-NSNC
							$scope.compDifPost = 21;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						}
						if($scope.izqIndexPost === 6 && $scope.derIndexPost === 0){//NSNC-Scioli
							$scope.compDifPost = 30;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}


						if($scope.izqIndexPost === 1 && $scope.derIndexPost === 5) {//Macri-Rodríguez Saa
							$scope.compDifPost = 22;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						}
						if($scope.izqIndexPost === 5 && $scope.derIndexPost === 1){//Rodríguez Saa-Macri
							$scope.compDifPost = 31;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}
						if($scope.izqIndexPost === 1 && $scope.derIndexPost === 6) {//Macri-NSNC
							$scope.compDifPost = 23;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						}
						if($scope.izqIndexPost === 6 && $scope.derIndexPost === 1){//NSNC-Macri
							$scope.compDifPost = 32;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}


						if($scope.izqIndexPost === 2 && $scope.derIndexPost === 5) {//Massa-Rodríguez Saa
							$scope.compDifPost = 24;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						}
						if($scope.izqIndexPost === 5 && $scope.derIndexPost === 2){//Rodríguez Saa-Massa
							$scope.compDifPost = 33;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}					
						if($scope.izqIndexPost === 2 && $scope.derIndexPost === 6) {//Massa-NSNC
							$scope.compDifPost = 25;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						}
						if($scope.izqIndexPost === 6 && $scope.derIndexPost === 2){//NSNC-Massa
							$scope.compDifPost = 34;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}

						if($scope.izqIndexPost === 3 && $scope.derIndexPost === 5) {//Cobos-Rodríguez Saa
							$scope.compDifPost = 26;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						}
						if($scope.izqIndexPost === 5 && $scope.derIndexPost === 3){//Rodríguez Saa-Cobos
							$scope.compDifPost = 35;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}					
						if($scope.izqIndexPost === 3 && $scope.derIndexPost === 6) {//Cobos-NSNC
							$scope.compDifPost = 27;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						}
						if($scope.izqIndexPost === 6 && $scope.derIndexPost === 3){//NSNC-Cobos
							$scope.compDifPost = 36;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}					


						if($scope.izqIndexPost === 5 && $scope.derIndexPost === 6) {//Rodríguez Saa-NSNC
							$scope.compDifPost = 28;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						}
						if($scope.izqIndexPost === 6 && $scope.derIndexPost === 5){//NSNC-Rodríguez Saa
							$scope.compDifPost = 37;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}					

						/*-------------------------------ALTAMIRA VS OTROS Y NSNC-------------------------*/
						if($scope.izqIndexPost === 4 && $scope.derIndexPost === 5) {//DelCaño-Rodríguez Saa
							$scope.compDifPost = 38;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						}
						if($scope.izqIndexPost === 4 && $scope.derIndexPost === 6){//DelCaño-NSNC
							$scope.compDifPost = 39;
							$scope.tempPost = '{{difsPost[0][compDifPost].'+$scope.ventajaPost+' | percentage}}';
						}					
						if($scope.izqIndexPost === 5 && $scope.derIndexPost === 4) {//Rodríguez Saa-DelCaño
							$scope.compDifPost = 40;
							$scope.tempPost = "{{difsPost[0][compDifPost]."+$scope.ventajaPost+" | percentage}}";
						}
						if($scope.izqIndexPost === 6 && $scope.derIndexPost === 4){//NSNC-DelCaño
							$scope.compDifPost = 41;
							$scope.tempPost = '{{difsPost[0][compDif].'+$scope.ventajaPost+' | percentage}}';
						}



						/*-------------------------------------------PRE-----------------------------------------------------------------------------------*/
						/*-------------------------------------------PRE-----------------------------------------------------------------------------------*/
						/*-------------------------------------------PRE-----------------------------------------------------------------------------------*/
						/*-------------------------------------------PRE-----------------------------------------------------------------------------------*/
						/*-------------------------------------------PRE-----------------------------------------------------------------------------------*/
						/*-------------------------------------------PRE-----------------------------------------------------------------------------------*/


					}else{
						if($scope.izqIndex === 0 && $scope.derIndex === 1){//Massa-Scioli
							$scope.compDif = 0;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						} 
						if($scope.izqIndex === 1 && $scope.derIndex === 0){//Scioli-Massa
							$scope.compDif = 6;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}


						if($scope.izqIndex === 0 && $scope.derIndex === 2){//Massa-Macri
							$scope.compDif = 1;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						} 
						if($scope.izqIndex === 2 && $scope.derIndex === 0){//Macri-Massa
							$scope.compDif = 7;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}


						if($scope.izqIndex === 1 && $scope.derIndex === 2){//Scioli-Macri
							$scope.compDif = 2;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						} 
						if($scope.izqIndex === 2 && $scope.derIndex === 1){//Macri-Scioli
							$scope.compDif = 8;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}


						if($scope.izqIndex === 0 && $scope.derIndex === 3){//Massa-Cobos
							$scope.compDif = 3;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						} 
						if($scope.izqIndex === 3 && $scope.derIndex === 0){//Cobos-Massa
							$scope.compDif = 9;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}


						if($scope.izqIndex === 1 && $scope.derIndex === 3){//Scioli-Cobos
							$scope.compDif = 4;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						} 
						if($scope.izqIndex === 3 && $scope.derIndex === 1){//Cobos-Scioli
							$scope.compDif = 10;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}

						if($scope.izqIndex === 2 && $scope.derIndex === 3) {//Macri-Cobos
							$scope.compDif = 5;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						}
						if($scope.izqIndex === 3 && $scope.derIndex === 2){//Cobos-Macri
							$scope.compDif = 11;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}
						/*---------------------------ALTMIRA VS TODOS---------------------*/
						/*---------------------------ALTMIRA VS TODOS---------------------*/
						/*---------------------------ALTMIRA VS TODOS---------------------*/
						/*---------------------------ALTMIRA VS TODOS---------------------*/
						/*---------------------------ALTMIRA VS TODOS---------------------*/
						/*---------------------------ALTMIRA VS TODOS---------------------*/
						if($scope.izqIndex === 0 && $scope.derIndex === 4) {//Massa-Altamira
							$scope.compDif = 12;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						}
						if($scope.izqIndex === 4 && $scope.derIndex === 0){//Altamira-Massa
							$scope.compDif = 16;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}						
						if($scope.izqIndex === 1 && $scope.derIndex === 4) {//Scioli-Altamira
							$scope.compDif = 13;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						}
						if($scope.izqIndex === 4 && $scope.derIndex === 1){//Altamira-Scioli
							$scope.compDif = 17;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}							
						if($scope.izqIndex === 2 && $scope.derIndex === 4) {//Macri-Altamira
							$scope.compDif = 14;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						}
						if($scope.izqIndex === 4 && $scope.derIndex === 2){//Altamira-Macri
							$scope.compDif = 18;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}							
						if($scope.izqIndex === 3 && $scope.derIndex === 4) {//Cobos-Altamira
							$scope.compDif = 15;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						}
						if($scope.izqIndex === 4 && $scope.derIndex === 3){//Altamira-Cobos
							$scope.compDif = 19;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}					



						/*-------------------------------OTROS Y NSNC-------------------------*/
						if($scope.izqIndex === 0 && $scope.derIndex === 5) {//Massa-Otros
							$scope.compDif = 20;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						}
						if($scope.izqIndex === 5 && $scope.derIndex === 0){//Otros-Massa
							$scope.compDif = 29;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}
						if($scope.izqIndex === 0 && $scope.derIndex === 6) {//Massa-NSNC
							$scope.compDif = 21;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						}
						if($scope.izqIndex === 6 && $scope.derIndex === 0){//NSNC-Massa
							$scope.compDif = 30;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}


						if($scope.izqIndex === 1 && $scope.derIndex === 5) {//Scioli-Otros
							$scope.compDif = 22;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						}
						if($scope.izqIndex === 5 && $scope.derIndex === 1){//Otros-Scioli
							$scope.compDif = 31;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}
						if($scope.izqIndex === 1 && $scope.derIndex === 6) {//Scioli-NSNC
							$scope.compDif = 23;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						}
						if($scope.izqIndex === 6 && $scope.derIndex === 1){//NSNC-Scioli
							$scope.compDif = 32;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}


						if($scope.izqIndex === 2 && $scope.derIndex === 5) {//Macri-Otros
							$scope.compDif = 24;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						}
						if($scope.izqIndex === 5 && $scope.derIndex === 2){//Otros-Macri
							$scope.compDif = 33;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}					
						if($scope.izqIndex === 2 && $scope.derIndex === 6) {//Macri-NSNC
							$scope.compDif = 25;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						}
						if($scope.izqIndex === 6 && $scope.derIndex === 2){//NSNC-Macri
							$scope.compDif = 34;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}

						if($scope.izqIndex === 3 && $scope.derIndex === 5) {//Cobos-Otros
							$scope.compDif = 26;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						}
						if($scope.izqIndex === 5 && $scope.derIndex === 3){//Otros-Cobos
							$scope.compDif = 35;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}					
						if($scope.izqIndex === 3 && $scope.derIndex === 6) {//Cobos-NSNC
							$scope.compDif = 27;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						}
						if($scope.izqIndex === 6 && $scope.derIndex === 3){//NSNC-Cobos
							$scope.compDif = 36;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}					


						if($scope.izqIndex === 5 && $scope.derIndex === 6) {//Otros-NSNC
							$scope.compDif = 28;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						}
						if($scope.izqIndex === 6 && $scope.derIndex === 5){//NSNC-Otros
							$scope.compDif = 37;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}					

						/*-------------------------------ALTAMIRA VS OTROS Y NSNC-------------------------*/
						if($scope.izqIndex === 4 && $scope.derIndex === 5) {//Altamira-Otros
							$scope.compDif = 38;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						}
						if($scope.izqIndex === 4 && $scope.derIndex === 6){//Altamira-NSNC
							$scope.compDif = 39;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}					
						if($scope.izqIndex === 5 && $scope.derIndex === 4) {//Otros-Altamira
							$scope.compDif = 40;
							$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
						}
						if($scope.izqIndex === 6 && $scope.derIndex === 4){//NSNC-Altamira
							$scope.compDif = 41;
							$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
						}

					}


				if(antesodps !== 0){  //si es distinto de 0, osea para PRE PASO


					/*--------------------------------------------------PRE PASO-----------------------------------*/
					var checkIzq = 0;
					var checkDer = 0;
					for(var i = 0; i<7; i++){
						if($scope.izq[i] === true){
							
							checkIzq++;
						}
						if($scope.der[i] === true){		
							
							checkDer++;
						}
					}

					if(checkIzq === 7 || checkDer === 7){
						//Si no están los dos lados seleccionados, borra temp
						$scope.temp = ' ';
						$scope.texto_underGraph = '';
						$scope.dataGraf.length = 0;
						$scope.diferenciasGraf.length = 0;

					}else{
						//Si están los dos seleccionados, carga la data para el gráfico

						this.compDiftemp = $scope.compDif;
						$scope.dataGraf.length = 0;
						$scope.diferenciasGraf.length = 0;

						/*
						function Par(date,diferencia) //objecto Par constructor
						{
							this.date=date;
							this.diferencia=diferencia;
						}

						function createData(mes){
							
							//Esta función no devuelve nada, solo carga la data en dataGraf
							tuva = $scope.dataGraf.push(new Par(fechas[mes],$scope.diferenciasGraf[mes]));
							console.log("------------------");
							console.log($scope.dataGraf[0]);
							console.log($scope.dataGraf[0].date);
							console.log($scope.dataGraf[0].diferencia);
							
							
						}
						*/
						

						if($scope.ventaja === 's0'){
							for(var i = diferencias.length-1; i>=0; i--){
								console.log("compDiftemp: "+this.compDiftemp);
								console.log(diferencias[i][this.compDiftemp].s0);
							    $scope.diferenciasGraf.push(
							   		diferencias[i][this.compDiftemp].s0
							   	);
							   	$scope.text4text_underGraph = " ganarle a "
							}
						}else if ($scope.ventaja === 's3'){				
							for(var i = diferencias.length-1; i>=0; i--){
								console.log("compDiftemp: "+this.compDiftemp);
								console.log(diferencias[i][this.compDiftemp].s3);
							    $scope.diferenciasGraf.push(
							   		diferencias[i][this.compDiftemp].s3
							   	);
							   	$scope.text4text_underGraph = " sacarle 3 puntos a "
							}
						}else if ($scope.ventaja === 's5'){							
							for(var i = diferencias.length-1; i>=0; i--){
								console.log("compDiftemp: "+this.compDiftemp);
								console.log(diferencias[i][this.compDiftemp].s5);
							    $scope.diferenciasGraf.push(
							   		diferencias[i][this.compDiftemp].s5
							   	);
							   	$scope.text4text_underGraph = " sacarle 5 puntos a "
							}
						}else if ($scope.ventaja === 's10'){						
							for(var i = diferencias.length-1; i>=0; i--){
								console.log("compDiftemp: "+this.compDiftemp);
								console.log(diferencias[i][this.compDiftemp].s10);
							    $scope.diferenciasGraf.push(
							   		diferencias[i][this.compDiftemp].s10
							   	);
							   	$scope.text4text_underGraph = " sacarle 10 puntos a "
							}
						}
					

						for(var i = 0; i<diferencias.length;i++){
							
							createData(i,$scope.dataGraf,$scope.diferenciasGraf,antesodps);
						}

						

						/*--------------------Creo el texto que va bajo el gráfico --------------------------*/
						$scope.texto_underGraph = " "+$scope.datosTotales[$scope.izqIndex].nombComp+ " tiene "+$scope.temp+" de probabilidad de " + $scope.text4text_underGraph+ $scope.datosTotales[$scope.derIndex].nombComp + " en la elección general";
				

					} //ciera else 1

				}else{

					/*--------------------------------------------------POST PASO-----------------------------------*/
					var checkIzqPost = 0;
					var checkDerPost = 0;
					for(var i = 0; i<7; i++){
						if($scope.izqPost[i] === true){
							
							checkIzqPost++;
						}
						if($scope.derPost[i] === true){		
							
							checkDerPost++;
						}
					}

					if(checkIzqPost === 7 || checkDerPost === 7){
						//Si no están los dos lados seleccionados, borra temp
						$scope.tempPost = ' ';
						$scope.texto_underGraphPost = '';
						$scope.dataGrafPost.length = 0;
						$scope.diferenciasGrafPost.length = 0;

					}else{ //abre else2
						//Si están los dos seleccionados, carga la data para el gráfico

						this.compDiftemp = $scope.compDifPost;
						$scope.dataGrafPost.length = 0;
						$scope.diferenciasGrafPost.length = 0;
						//console.log("Con los dos, comnpdifpost es: "+$scope.compDifPost);

						/*
						function Par(date,diferencia) //objecto Par constructor
						{
							this.date=date;
							this.diferencia=diferencia;
						}

						function createData(mes){
							
							tuva = $scope.dataGrafPost.push(new Par(fechas[mes],$scope.diferenciasGrafPost[mes]));
							/*console.log("------------------");
							console.log($scope.dataGraf[0]);
							console.log($scope.dataGraf[0].date);
							console.log($scope.dataGraf[0].diferencia);
							
						}
						*/

						

						if($scope.ventajaPost === 's0'){
							for(var i = diferenciasPost.length-1; i>=0; i--){
								console.log("i es: " + i+ " compDiftemp: "+this.compDiftemp);
								console.log(diferenciasPost[i][this.compDiftemp].s0);
							    $scope.diferenciasGrafPost.push(
							   		diferenciasPost[i][this.compDiftemp].s0
							   	);
							   	$scope.text4text_underGraphPost = " ganarle a "
							}
						}else if ($scope.ventajaPost === 's3'){				
							for(var i = diferenciasPost.length-1; i>=0; i--){
								console.log("compDiftemp: "+this.compDiftemp);
								console.log(diferenciasPost[i][this.compDiftemp].s3);
							    $scope.diferenciasGrafPost.push(
							   		diferenciasPost[i][this.compDiftemp].s3
							   	);
							   	$scope.text4text_underGraphPost = " sacarle 3 puntos a "
							}
						}else if ($scope.ventajaPost === 's5'){							
							for(var i = diferenciasPost.length-1; i>=0; i--){
								console.log("compDiftemp: "+this.compDiftemp);
								console.log(diferenciasPost[i][this.compDiftemp].s5);
							    $scope.diferenciasGrafPost.push(
							   		diferenciasPost[i][this.compDiftemp].s5
							   	);
							   	$scope.text4text_underGraphPost = " sacarle 5 puntos a "
							}
						}else if ($scope.ventajaPost === 's75'){							
							for(var i = diferenciasPost.length-1; i>=0; i--){
								console.log("compDiftemp: "+this.compDiftemp);
								console.log(diferenciasPost[i][this.compDiftemp].s75);
							    $scope.diferenciasGrafPost.push(
							   		diferenciasPost[i][this.compDiftemp].s75
							   	);
							   	$scope.text4text_underGraphPost = " sacarle 7.5 puntos a "
							}
						}else if ($scope.ventajaPost === 's10'){						
							for(var i = diferenciasPost.length-1; i>=0; i--){
								console.log("compDiftemp: "+this.compDiftemp);
								console.log(diferenciasPost[i][this.compDiftemp].s10);
							    $scope.diferenciasGrafPost.push(
							   		diferenciasPost[i][this.compDiftemp].s10
							   	);
							   	$scope.text4text_underGraphPost = " sacarle 10 puntos a "
							}
						}else if ($scope.ventajaPost === 's15'){						
							for(var i = diferenciasPost.length-1; i>=0; i--){
								console.log("compDiftemp: "+this.compDiftemp);
								console.log(diferenciasPost[i][this.compDiftemp].s15);
							    $scope.diferenciasGrafPost.push(
							   		diferenciasPost[i][this.compDiftemp].s15
							   	);
							   	$scope.text4text_underGraphPost = " sacarle 15 puntos a "
							}
						}
					

						for(var i = 0; i<diferenciasPost.length;i++){
							
							createData(i,$scope.dataGrafPost,$scope.diferenciasGrafPost,antesodps);
						}						

						/*--------------------Creo el texto que va bajo el gráfico --------------------------*/
						$scope.texto_underGraphPost = " "+$scope.datosTotalesPost[$scope.izqIndexPost].nombComp+ " tiene "+$scope.tempPost+" de probabilidad de " + $scope.text4text_underGraphPost+ $scope.datosTotalesPost[$scope.derIndexPost].nombComp + " en la elección general";
					

					} //ciera else
				}
				
				$scope.createGraph(antesodps); //borrè el anteriopr y decido que gràfico borro y creo con el paràmetro
				} //cierra funcion


				//TERMINA $scope.createCompDif

				


				$scope.cambiovalorizq = function(index,antesodps){
					
					if(antesodps === 0){ //POST
						$scope.izqIndexPost = index;
						for(var i=0;i<$scope.data.length;i++){
							if(i === index){
								$scope.izqPost[index] = !$scope.izqPost[index];																
							}else{
								$scope.izqPost[i] = true;
							}
							if($scope.derPost[index] === false){
								$scope.derPost[index] = !$scope.derPost[index];	
							}		
						}
					}else{ //PRE-PASO
						$scope.izqIndex = index;
						for(var i=0;i<$scope.data.length;i++){
							if(i === index){
								$scope.izq[index] = !$scope.izq[index];																
							}else{
								$scope.izq[i] = true;
							}
							if($scope.der[index] === false){
								$scope.der[index] = !$scope.der[index];	
							}		
						}
					}

					$scope.createCompDif(antesodps);

				}

				$scope.cambiovalorder = function(index,antesodps){
					
				if(antesodps === 0){ //POST					
					$scope.derIndexPost = index;
					for(var i=0;i<$scope.data.length;i++){
						if(i === index){
							$scope.derPost[index] = !$scope.derPost[index];
						}else{

							$scope.derPost[i] = true;
						}
						if($scope.izqPost[index] === false){
							$scope.izqPost[index] = !$scope.izqPost[index];	
						}	
					}
				}else{
					$scope.derIndex = index;
					for(var i=0;i<$scope.data.length;i++){
						if(i === index){
							$scope.der[index] = !$scope.der[index];
						}else{

							$scope.der[i] = true;
						}
						if($scope.izq[index] === false){
							$scope.izq[index] = !$scope.izq[index];	
						}	
					}					
				}


					$scope.createCompDif(antesodps);

				}

			},
			templateUrl:"app/templates/difs-directive.html"
		}
	}]);