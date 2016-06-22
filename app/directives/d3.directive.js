var app = angular.module('store');

	app.directive('d3Directive',function(){ //Lineas y rectangulos
		
		function link(scope, element, attr){
			var mobile = false;
			if(screen.width<720){
				mobile = true;
			}

			var createGraphFunction = function(datos,containerSVG,pestania){

				var data = datos;
				var container = containerSVG;
				var w;
				var h;
				var canvasW; //size of canvas al crear "g"
				var canvasH;
				

				
				w = 1000;
				h = 450;
				ajusteHFotos = 45;
				ajusteWFotos = 45;
				canvasW = 700;
				canvasH = 400;

				if(pestania === 3 || pestania === 8 || pestania === 12 || pestania === 13){
					 // 4! Durango Quintana Roo Veracruz Zacatecas
					ajusteYtexto = 0.18;
					ajusteYfoto = 0.135;
					ajusteYrect = 0.29;
					ajusteYcirc = 0.55;
					ajusteRcirc = 7;
					ajusteXtexto = 47;
					ajusteYpartido = 17;
					tamTexto = 18;
				}else if( pestania === 4 || pestania === 5 || pestania === 6 || pestania === 7 || pestania === 10 || pestania === 11){ 
					//5! ACal - Hidalgo - DF - Oaxaca - Puebla - Tamaulipas - Tlaxcala
					ajusteYtexto = 0.16;
					ajusteYfoto = 0.11;
					ajusteYrect = 0.24;
					ajusteYcirc = 0.55;
					ajusteRcirc = 7;
					ajusteXtexto = 47;
					ajusteYpartido = 18;
					tamTexto = 18;
				}else if(pestania === 1 || pestania === 2 || pestania === 9){ 
					//6! Chihuahua - Sinaloa
					ajusteYtexto = 0.15;
					ajusteYfoto = 0.1;
					ajusteYrect = 0.17;
					ajusteYcirc = 0.55;
					ajusteRcirc = 7;
					ajusteXtexto = 47;
					ajusteYpartido = 18;
					tamTexto = 18;
				}
					

				
				
				
				var barPadding = 1;
				//var x1cuadroDer = 0;
				var x1cuadroDer = 0.3*w;
				var sepEntre10 = 96.6666; //Separación entre líneas vert de graf en px
				var sepEntre10 = 116.4; //Separación entre líneas vert de graf en px
				var comienzoHorGraf = 120; //En px, distancia horiz del 0% del grafico
				var comienzoVertGraf = 40; //En px, distancia vert del comienzo grafico

				var internaPartido = false;
				var pieGraph = false;
				
				
				/*----------------------------------------Funciones de transformación --------------------------------*/
				var transTopx = function(por){
					var res = comienzoHorGraf+por*sepEntre10/10; //regla de 3, si el 10% es sepEntre10 (96,66px) cuanto es Res
					if(res>comienzoHorGraf){
						return res;
					}else{return comienzoHorGraf};
				};
				var transTopxAncho = function(por,limInf){
					var res = por*sepEntre10/10;
					if(limInf<0){
						var res2 = res - Math.abs(limInf)*sepEntre10/10;
						return res2;
					}else{
						return res;
					};
				};					

				var transTopxAnchoCirculos = function(por,limInf){
					//var res = comienzoHorGraf + por*sepEntre10/10;
					if(limInf<0){
						//return comienzoHorGraf + por*sepEntre10/10 + (Math.abs(limInf)*sepEntre10/10)/2;
						return comienzoHorGraf + por*sepEntre10/10;
					}else{
						return comienzoHorGraf + por*sepEntre10/10;
					};
				};				
				
				/*----------------------------------------Creacion de Canvas y RECTANGULOS DE AREA --------------------------------*/
				container.attr('viewBox','0 0 750 400').attr("perserveAspectRatio","xMinYMid")
				.append("g")
				.selectAll("rect")
					.data(data)
					.enter()
				    .append("rect")
				    .attr("height",function(){

			            		return 40;

			            }
			        )
				    .attr("width", function(d){
				    	return transTopxAncho(4*d.desv,d.prom-2*d.desv); //Tiene un ancho de 4 DSTD, ajuste de funcion resto 390
				    })			    									// Si el limite inferior es menor a 0 hay que restar lo q esta por debajo de 0 arriba
				    .attr("y", function(d,i){
				    	return comienzoVertGraf+(0.75*h/data.length)*(i+ajusteYrect);
				    }) //Factor comun 
				    	//1er: Comienzo de cuadro; 2do: 75% de h dividido la cant de datos, por ; 3er: ajuste

				    .attr("x", function(d){
				    	return transTopx(d.prom-2*d.desv);
				    })


				    .classed("rectNorm",true)
					.on("mouseover", function() {

						var tempObj = d3.select(this);
						//console.log(tempObj);
					  	mouseoverTooltip();
					  
					  d3.select(this)
					    
					    .classed("rectNorm", false ) 
					    .classed("rectHover", true );
					})					
					.on("mouseout", function() {
					  mouseoutTooltip();
					  d3.select(this)
					   
					    .classed("rectNorm", true ) 
					    .classed("rectHover", false ); 
					})
					.on("mousemove", function(d,i){
						cand_i = d.cand;
						prom_i = d.prom;
						desv_i = d.desv;
						var tempObj = d3.select(this);
						mousemoveTooltip(tempObj, cand_i, prom_i, desv_i);
						}
					);


				/*------------------------------------CIRCULOS PROMEDIO----------------------------------------*/
				container.append("g")//.attr("transform","translate(0,-50)")
					.selectAll("circle")
					.data(data)
					.enter()
					.append("circle")
					.attr("r", ajusteRcirc)
					.attr("stroke","black")
					.attr("stroke-width","2")
					.attr("fill","white")
					.attr("cx",function(d){
						return transTopxAnchoCirculos(d.prom,d.prom-2*d.desv);
					})
					.attr("cy",function(d,i){
						return comienzoVertGraf+(0.75*h/data.length)*(i+ajusteYcirc);
					});
 				
 				/*----------------------------------------LINEAS HORIZONTALES --------------------------------*/	
 					var qLineasHoriz = new Array(data.length+1);
	 			container.append("g")
	 				.selectAll("line")
					.data(qLineasHoriz)	
					.enter()
				    .append("line")
				    .attr("x1",0)
				    .attr("y1",function(d,i){
				    	return 40+i*0.75*h/data.length;
				    })
				    .attr("x2",702)
				    .attr("y2",function(d,i){
				    	return 40+i*0.75*h/data.length;
				    })
				    .classed("lineashor",true);

				/*----------------------------------------NOMBRE DE CANDIDATOS --------------------------------*/
				container.append("g")
					.selectAll("text2")
					.data(data)	
					.enter()
				    .append("text")
				    .attr("x", ajusteXtexto)				    
				    .attr("y", function(d,i){
				    	return i*0.75*h/data.length+h*ajusteYtexto; //1er: Comienzo de cuadro; 2do: 75% de h dividido la cant de datos, por ; 3er: ajuste
				    })
				    .attr("class","stag-book")
				    .attr("style",function(d,i){

				    	
				    	if(d.cand === "Rodríguez Saa"){
				    		return "font-size:"+12+"px;";
				    	}else{
				    		return "font-size:"+tamTexto+"px;"
				    	}

					})
				    .text(function(d){
				    	return d.cand;
				    });

				/*----------------------------------------NOMBRE DE PARTIDOS --------------------------------*/
				container.append("g")
					.selectAll("text3")
					.data(data)	
					.enter()
				    .append("text")
				    .attr("x", ajusteXtexto)				    
				    .attr("y", function(d,i){
				    	return i*0.75*h/data.length+h*ajusteYtexto+ajusteYpartido; //1er: Comienzo de cuadro; 2do: 75% de h dividido la cant de datos, por ; 3er: ajuste
				    })
				    .attr("class","stag-book")
				    .attr("style",function(d,i){

				    	if(d.cand === "Rodríguez Saa"){
				    		return "font-size:"+12+"px;"
				    	}else{
				    		return "font-size:"+tamTexto-5+"px;"
				    	}

					})
				    .text(function(d){
				    	return d.partido;
				    });				    

				/*----------------------------------------FOTOS DE CANDIDATOS --------------------------------*/

				container.append("g").selectAll("image").data(data)
					.enter()
				    .append("svg:image")
			        .attr("xlink:href", function(d,i){
			        	return ""+d.fotos+"";
			        })
			        .attr("x", function(d,i){

			        		return 0;

			        })
			        .attr("y", function(d,i){
			        	return i*0.75*h/data.length+h*ajusteYfoto;
			        })
			        .attr("width", ajusteWFotos)
			        .attr("height", ajusteHFotos)
			        .attr("class","logosCuadros")
			        .attr("id",function(d,i){
			        	return d.cand;
			        })

					
			    /*----------------------------------------LINEAS VERTICALES --------------------------------*/
			 	container.append("g") 
			 		.selectAll("line2")
					.data([1,2,3,4,5,6])	
					.enter()
				    .append("line")
				    .attr("y1",comienzoVertGraf)
				    .attr("x1",function(d,i){
				    	return comienzoHorGraf+i*sepEntre10;

				    })
				    .attr("y2",function(d,i){
				    	return comienzoVertGraf+(h*0.75);
				    })
				    .attr("x2",function(d,i){
				    	return comienzoHorGraf+i*sepEntre10;
				    })
				    .style("stroke","rgba(96, 96, 108, 0.94)")
				    .style("stroke-width",1)
				    .style("stroke-dasharray","2,2");

				/*--------------------------------------RECTANGULO TOOLTIP--------------------------------------*/
				var groupTooltip = container.append("g").style("opacity", 1e-6).attr("id","tooltip-rects");

				var rectTooltip = groupTooltip.append("rect")
					.attr("class", "tooltip2");

				var textTooltip = groupTooltip.append("text");



				/*--------------------------------------  CREO SLIDERS ------------------------------------------*/
				//$(window).on("resize", function() {
				    
					sliders = [];
				    var widthSlider = $('p.mesSlider').width();

				    for(var i = 1;i<=13;i++){

				    	sliderTemp = $('#slider'+i);
					    sliders[i] = new dhtmlXSlider({parent: "slider1", min:-2, max:0,step:1});

				    }
				//}).trigger("resize");






				var updateSlider = function(slider){

						scope.$apply(function(){
							var i = 1;
							while(i <= 13){

								

								if(slider === sliderCandPASO){
									scope.numeroSlider.mesPASO = -slider.getValue();
								}if(slider === slider1){
									scope.numeroSlider.slider1 = -slider.getValue();
								}else if(slider === sliderCandidatos) {
									scope.numeroSlider.mesPV = -slider.getValue();								
								}else if(slider === sliderCandidatosPost) {
									scope.numeroSlider.mesPV = -slider.getValue();								
								}else /*if(slider === sliderFrentes) {
									scope.numeroSlider.mesFrentes = -slider.getValue();								
								}else */if(slider === sliderPasoCABA) {
									scope.numeroSlider.mesPasoCABA = -slider.getValue();								
								}else if(slider === sliderGralCABA) {
									scope.numeroSlider.mesGralCABA = -slider.getValue();								
								}else if(slider === sliderBallotageCABA) {
									scope.numeroSlider.mesBallotageCABA = -slider.getValue();								
								}else if(slider === sliderPasoProv) {
									scope.numeroSlider.mesPasoProv = -slider.getValue();								
								}
							i++;
							}


						});
						


						switch(scope.numeroSlider.mesPasoProv){
					    	case 0:
					    		scope.mesSliderPasoProv = "Agosto";
					    		break;
					    	case 1:
					    		scope.mesSliderPasoProv = "Julio";
					    		break;
					    	case 2:
					    		scope.mesSliderPasoProv = "Junio";
					    		break;						    	
					    	case 3:
					    		scope.mesSliderPasoProv = "Mayo";
					    		break;					    	
					    	default:
					    		scope.mesSliderPasoProv = "Nada";
					    		break;
						}						

				}



				


				for(var i = 1;i<=13;i++){


				    sliders[i].attachEvent("onChange", function(){
						updateSlider(this);
						$('#textoMes'+i).html("Ha cambiado el mes");
						scope.updateGraph(cand1,scope.cand1)  //problema de crear la variable pegando strings
					
					});

				}					
	/*					
				sliderCandPASOpost.attachEvent("onChange", function(){
					updateSlider(this);
					$('#textoCandPASOpost').html(scope.mesSliderPASOpost);
					scope.updateGraph(pydCandPasopost,scope.candPasopost)
					
				});					
				sliderFrentes.attachEvent("onChange", function(){
					updateSlider(this);
					$('#textoFrentes').html(scope.mesSliderFrentes);
					scope.updateGraph(pydFrentes,scope.frentes)
				});				
				sliderCandidatos.attachEvent("onChange", function(){
					updateSlider(this);
					$('#textoCandidatos').html(scope.mesSliderPV);
					scope.updateGraph(promydesvs,scope.candidatos)
				});							



				/*--------------------------------------  DONUT CHART ------------------------------------------*/


				scope.updateGraph = function(datos,containerSVG){

						//alert(scope.mesGraph.mes);
						var data = datos;
						var container = containerSVG;
						var numMes;
						console.log(scope.mesSlider);

						
							w = 1000;
							h = 700;
							ajusteYtexto = 0.1;
							ajusteYfoto = 0.065;
							ajusteYrect = 0.15;
							ajusteYcirc = 47.6;
							ajusteRcirc = 5;
							ajusteXtexto = 12;
							canvasW = 720;
							canvasH = 1000;
							comienzoVertGraf = 63.5;

							//! VER A QMES SE ESTA ACTUALIZANDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
							mesCorresponde = scope.numeroSlider.mesPASO;
						


						container.selectAll("rect")
							.data(data[mesCorresponde])
							.transition()
					  		.attr("width", function(d){
								return transTopxAncho(4*d.desv,d.prom-2*d.desv); //Tiene un ancho de 4 DSTD, ajuste de funcion resto 390
							})			    									// Si el limite inferior es menor a 0 hay que restar lo q esta por debajo de 0 arriba
							.attr("x", function(d){
								return transTopx(d.prom-2*d.desv);
							})
							.duration(1000);

						container.selectAll("circle")
							.data(data[mesCorresponde])
							.transition()
							.attr("cx",function(d){
								return transTopxAnchoCirculos(d.prom,d.prom-2*d.desv);
							})
							.duration(1000);

				};

				scope.createCirculosEncuestas = function(containerSVG, data, index){ //territorio es el numero del container - 1

						var container = containerSVG;
						var datos = data;
						var caba = false;
						
						if(data[index].length-1 === 6){
							ajusteYcirc = 57.6;
							ajusteRcirc = 4;
							comienzoVertGraf = 63.5;
							console.log("Data es: " + data[index]);
						}else if(data[index].length-1 === 5){
							ajusteYcirc = 67.5;
							ajusteRcirc = 4;
							comienzoVertGraf = 77;
							console.log("Data es: " + data[index]);
						}else if(data[index].length-1 === 4){
							ajusteYcirc = 87;
							ajusteRcirc = 4;
							comienzoVertGraf = 82;
							console.log("Data es: " + data[index]);
						}

						

						container.append("g")//.attr("transform","translate(0,-50)")
							.selectAll("circle")
							.data(data[index])
							.enter()
							.append("circle")
							.attr("r", ajusteRcirc)
							.attr("stroke",function(d,i){
								if(caba === true && index === 0){
									return "red";
								}else{
									return "none";
								}
							})
							.attr("stroke-width","2")
							.attr("fill",function(d,i){
								if(caba === true && index === 0){
									return "red";
								}else{
									return "none";
								}
							})
							.attr("class","circProm")
							.attr("cx",function(d){
								return transTopxAnchoCirculos(d);
							})
							.attr("cy",function(d,i){
								return comienzoVertGraf+i*ajusteYcirc;
							});

						container.selectAll(".circProm")
							.transition()
							.attr("stroke",function(d,i){
								if(caba === true && index === 0){
									return "red";
								}else{
									return "grey";
								}
							})
							.attr("stroke-width","2")
							.attr("fill",function(d,i){
								if(caba === true && index === 0){
									return "red";
								}else{
									return "black";

								}
							})
							.duration(300);

							console.log("Data1: "+data[0][0]);
							console.log("Data2: "+data[0][1]);
							if(data[index][0] === 0 && data[index][1] === 0){
								scope.emptyEncuestas = true;
							}else{
								scope.emptyEncuestas = false;
							}

							scope.fichaTec = true;
							scope.fichaTecIndex = index;

				}

				scope.removeCirculosEncuestas = function(containerSVG){
						var container = containerSVG;

						container.selectAll(".circProm")
							.transition()
							.style("opacity",0)
							.duration(300);

						container.selectAll(".circProm").remove();

						scope.emptyEncuestas = false;
						scope.fichaTec = false;
				}



				/*--------------------------------  FUNCIONES DE TOOLTIPS, ETC ----------------------------------*/

				function mouseoverTooltip() {
						
					  groupTooltip.transition()
					    .duration(200)
					    .style("opacity", 1);					  

				};

				function mousemoveTooltip(position, cand_i, prom_i, desv_i) {

						var positionTemp = position;
						var posX = parseInt(positionTemp.attr("x"))+parseInt(positionTemp.attr("width"))+20;
						var posY = parseInt(positionTemp.attr("y"));
						
						var lowerLimTooltip  = parseFloat(prom_i)-2*parseFloat(desv_i);
						var upperLimTooltip  = parseFloat(prom_i)+2*parseFloat(desv_i);
						var promTooltip = prom_i.toFixed(2);
						var posXNSNC;
						var posNSNCVar;

						if(lowerLimTooltip < 0){ //Correción para negativos

							lowerLimTooltip = 0;

						}

					  rectTooltip
					      
					    .attr("x",function(){
 							if(cand_i === 'NS/NC'){
 								var posXNSNC = parseFloat(posX);
 								return posXNSNC-120;
 							}else if(cand_i === 'Larreta'){
 								var posXNSNC = parseFloat(posX);
 								return posXNSNC-200;
 							}else{
 								return posX-10;
 							}

 						})     
 						.attr("y", function(){
 							if(cand_i === 'NS/NC'){
 								var posYNSNC = parseFloat(posY);
 								return posYNSNC-130;
 							}else if(cand_i === 'Larreta'){
 								var posYNSNC = parseFloat(posY);
 								return posYNSNC+50;
 							}else{
 								return posY;
 							}

 						})
					    .attr("height", function(d,i){

					    	if(cand_i === 'Altamira' || cand_i === 'Otros' || cand_i === 'NS/NC' || cand_i === 'FAUNEN'  ){
					    		return 300;
					    	}else{
					    		return 300;
					    	}

					    })
					    .attr("width", 360);

					  textTooltip


					    .attr("height", 150)
					    .attr("width", 50)
					    .text(function(){
					    	if(cand_i === 'Otros'){
					    		return "Otros candidatos obtendrán entre "+lowerLimTooltip.toFixed(2)+"% y "+upperLimTooltip.toFixed(2)+"% de los votos con un 95% de probabilidad y obtienen un promedio de "+promTooltip+"% de los votos.";
					    	}else if (cand_i === 'NS/NC'){
					    		return "Los indecisos oscilan entre "+lowerLimTooltip.toFixed(2)+"% y "+upperLimTooltip.toFixed(2)+"% de los votos con un 95% de probabilidad y tienen un promedio de "+promTooltip+"%.";
					    	}else{
					    		return cand_i+" obtendrá entre "+lowerLimTooltip.toFixed(2)+"% y "+upperLimTooltip.toFixed(2)+"% de los votos con un 95% de probabilidad y obtiene un promedio de "+promTooltip+"% de los votos.";
					    	}
					    })
					    .attr("class","textoTooltip")
					    .attr("x", function(){
 							if(cand_i === 'NS/NC'){
 								posXNSNC = parseFloat(posX);
 								posNSNCVar = true;
 								return posXNSNC;
 								
 							}else if(cand_i === 'Larreta'){
 								posXNSNC = parseFloat(posX)-200;
 								posNSNCVar = true;
 								return posXNSNC-200;
 								
 							}else{
 								/*var posNSNCVar = false;
 								var posX2= posX-20;
 								return posX2;*/ 								
 								posX2 = parseFloat(posX);
 								posNSNCVar = false;
 								return posX2-30;

 							}

 						})     
					    .call(wrap,145,posX,posXNSNC,cand_i)
					    .attr("y", function(){
 							if(cand_i === 'NS/NC'){
 								var posYNSNC = parseFloat(posY);
 								return posYNSNC-110;
 							}else if(cand_i === 'Larreta'){
 								var posYNSNC = parseFloat(posY);
 								return posYNSNC+70;
 							}else{
 								return posY+20;
 							} 							
 						});

				}



				function mouseoutTooltip() {
					  groupTooltip.transition()
					    .duration(200)
					    .style("opacity", 1e-6);
				}

				function wrap(text, width, posX, posXNSNC2, cand_i) {  //Al llamarla, el primer argumento (la selección) esta implicto, cuentan a partir de ahi
					  if(cand_i === 'NS/NC'){
					  	posicionX = posXNSNC2-110;
					  }else if(cand_i === 'Larreta'){
					  	posicionX = posXNSNC2+10;
					  }else{
					  	posicionX = posX;
					  }
					  text.each(function() {
					    var text = d3.select(this),
					        words = text.text().split(/\s+/).reverse(),
					        word,
					        line = [],
					        lineNumber = 0,
					        lineHeight = 1.1, // ems
					        y = text.attr("y"),
					        //dy = parseFloat(text.attr("dy")),
					        dy = 0,
					        tspan = text.text(null).append("tspan").attr("x",posicionX).attr("y", y).attr("dy", dy+ "em");
					    while (word = words.pop()) {
					      line.push(word);
					      tspan.text(line.join(" "));
					      if (tspan.node().getComputedTextLength() > width) {
					        line.pop();
					        tspan.text(line.join(" "));
					        line = [word];
					        tspan = text.append("tspan").attr("x", posicionX).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
					      }
					    }
					  });
				}





				/*----------------------------------------       EJE      --------------------------------*/
				//Create the SVG Viewport
		 		var svgContainer = containerSVG;

				//Create the Scale we will use for the Axis
				var axisScale = d3.scale.linear()
				         .domain([0, 50])
					     .range([0, 0.58*w]); //58% del ancho total, orginialmente era 580px de 1000px
					     //.attr("class","stag");


				//Create the Axis
				var xAxis = d3.svg.axis()
		            		.scale(axisScale)
		            		.tickFormat(function(d){ 
		            			return d + "%"; 
		            		});

				//Create an SVG group Element for the Axis elements and call the xAxis function
				var xAxisGroup = svgContainer.append("g")
							.attr("id","ejeX")
							.attr("transform", "translate(120,15)")
							.attr("class", "stag-light")
		                    .call(xAxis)
		                    .append("text")
							    .attr("transform", "translate(-10,-5)")
								.attr("y", 6)
							    .attr("dy", ".71em")
							    //.style("text-anchor", "end")
							    .attr("class", "stag")
							    .style("font-size", "12px");
							    //.text("Hacé click en los logos para ver las internas");



				var fotos = [0];
				
				var imgs = d3.select("#svgtitulo").attr("width",990).attr("height",90)
		         .selectAll("image").data(fotos);

				}

				/*-----------------Corro las  funciones con los datos y containers que corresponden ---------------*/
			
				for(var i = 0;i<=12;i++){

					createGraphFunction(scope.datos[i],scope.svgs[i+1],i+1); //A svgs hay que sumarle 1 porque el 0 es el mapa

				}
			


			}

		return {
			link:link, //fijarse que aca estoy mandando la fcon de arriba
			restrict:'E'
			//scope: {data: '='}
			
		}

	});