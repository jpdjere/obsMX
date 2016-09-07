					function loadDataForDonut(partido){
						var donutDataINT = new Array();
						var donutDataTotal = new Array();
						var donutDataNombres = new Array();

						var donutDataFULL = new Array();

						
						console.log("3 PASO: loadDataForDonut (dsIgual): -------->"+ internaPartido);

						if(partido === 'FR'){
							for(i=0;i<1;i++){
								donutDataINT.push(interna[0][i].interna);
								donutDataTotal.push(interna[0][i].total);
								donutDataNombres.push(interna[0][i].cand);
							}
							
							donutDataFULL.push(donutDataINT);
							donutDataFULL.push(donutDataTotal);
							donutDataFULL.push(donutDataNombres);
							console.log("Data interna ----> : " +donutDataFULL);
							return donutDataFULL;
						
						}else if(partido === 'FPV'){
							for(i=1;i<6;i++){
								donutDataINT.push(interna[0][i].interna);
								donutDataTotal.push(interna[0][i].total);
								donutDataNombres.push(interna[0][i].cand);
							}
							
							donutDataFULL.push(donutDataINT);
							donutDataFULL.push(donutDataTotal);
							donutDataFULL.push(donutDataNombres);
							console.log("Data interna ----> : " +donutDataFULL);
							
							return donutDataFULL;
						

						}else if(partido === 'PRO'){
							for(i=6;i<9;i++){
								donutDataINT.push(interna[0][i].interna);
								donutDataTotal.push(interna[0][i].total);
								donutDataNombres.push(interna[0][i].cand);
							}
							console.log("Data interna ----> : " +donutDataFULL);
							donutDataFULL.push(donutDataINT);
							donutDataFULL.push(donutDataTotal);
							donutDataFULL.push(donutDataNombres);
							return donutDataFULL;
						

						}else if(partido === 'FAUNEN'){
							for(i=9;i<12;i++){
								donutDataINT.push(interna[0][i].interna);
								donutDataTotal.push(interna[0][i].total);
								donutDataNombres.push(interna[0][i].cand);
							}
							console.log("Data interna ----> : " +donutDataFULL);
							donutDataFULL.push(donutDataINT);
							donutDataFULL.push(donutDataTotal);
							donutDataFULL.push(donutDataNombres);
							return donutDataFULL;
						
						}else if(partido === 'PJ'){
							for(i=12;i<13;i++){
								donutDataINT.push(interna[0][i].interna);
								donutDataTotal.push(interna[0][i].total);
								donutDataNombres.push(interna[0][i].cand);
							}
							console.log("Data interna ----> : " +donutDataFULL);
							donutDataFULL.push(donutDataINT);
							donutDataFULL.push(donutDataTotal);
							donutDataFULL.push(donutDataNombres);
							return donutDataFULL;
						

						}else if(partido === 'FIT'){
							for(i=13;i<14;i++){
								donutDataINT.push(interna[0][i].interna);
								donutDataTotal.push(interna[0][i].total);
								donutDataNombres.push(interna[0][i].cand);
							}
							console.log("Data interna ----> : " +donutDataFULL);
							donutDataFULL.push(donutDataINT);
							donutDataFULL.push(donutDataTotal);
							donutDataFULL.push(donutDataNombres);
							return donutDataFULL;
						
						}else if(partido === 'Otros'){
							for(i=14;i<15;i++){
								donutDataINT.push(interna[0][i].interna);
								donutDataTotal.push(interna[0][i].total);
								donutDataNombres.push(interna[0][i].cand);
							}
							console.log("Data interna ----> : " +donutDataFULL);
							donutDataFULL.push(donutDataINT);
							donutDataFULL.push(donutDataTotal);
							donutDataFULL.push(donutDataNombres);
							return donutDataFULL;
						
						}else if(partido === 'NS/NC'){
							for(i=15;i<16;i++){
								donutDataINT.push(interna[0][i].interna);
								donutDataTotal.push(interna[0][i].total);
								donutDataNombres.push(interna[0][i].cand);
							}
							console.log("Data interna ----> : " +donutDataFULL);
							donutDataFULL.push(donutDataINT);
							donutDataFULL.push(donutDataTotal);
							donutDataFULL.push(donutDataNombres);
							return donutDataFULL;
						};

					}

					var createDonutChart = function(partido,tempObj){

						if(pieGraph !== false){
							console.log(pieGraph);
							$('#texto').remove();
							pieGraph.remove();
						}
						

						donutChart
						.append("g").attr("id","texto")
						.append("text")
						.attr("class","stag")
						.attr("x",-210)
						.attr("y",-170)
						.text("Colocá el mouse sobre el gráfico para ver los candidatos");


						var radius = Math.min(500, 600) / 2;

						var color = createColorsScales(partido);			

						var pie = d3.layout.pie()
						    .sort(null);

						var arc = d3.svg.arc()
						    .innerRadius(radius - 140)
						    .outerRadius(radius - 105);

						//console.log("Justo antes: "+scope.dataDonutVE);

						pieGraph = donutChart.append("g").attr("id","pie-graph");			

						var path = pieGraph.selectAll("path")
						    .data(pie(scope.dataDonutVE[0]))
						  .enter().append("path")
						    .attr("fill", function(d, i) { return color(i); })
						    .attr("d", arc);/*
						    .transition().duration(500)
							.attrTween('d', function(d) {
							     var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
							     return function(t) {
							         d.endAngle = i(t);
							       return arc(d);
							     }
							});*/

						path.on('mouseover', function(d,i) {

							var candidatoTooltip;                          
							var totalTooltip;                          

				            /*-----------------ESCONDO TODAS LAS FOTOS INTERNAS-----------------*/


				            switch (i) {
							    case 0:
							    	if(partido==='FPV'){
							    		candidatoTooltip = '  Daniel  <br />Scioli';
							    		totalTooltip = interna[0][1].total;
							    		
							    	}else if(partido==='FR'){
							    		candidatoTooltip = 'Sergio <br /> Massa';
							    		totalTooltip = interna[0][0].total;
							    		$('#fotoInt0').css("display","block");
							    	}else if(partido==='PRO'){
							    		candidatoTooltip = 'Mauricio Macri';
							    		totalTooltip = interna[0][6].total;
							    		$('#fotoInt0').css("display","block");
							    	}else if(partido==='FAUNEN'){
							    		candidatoTooltip = 'Julio  <br />Cobos';
							    		totalTooltip = interna[0][10].total;
							    		$('#fotoInt0').css("display","block");
							    	}else if(partido==='FIT'){
							    		candidatoTooltip = 'Jorge Altamira';
							    		totalTooltip = interna[0][13].total;
							    		$('#fotoInt0').css("display","block");
							    	}else if(partido==='PJ'){
							    		candidatoTooltip = 'José M.  <br />De la Sota';
							    		totalTooltip = interna[0][12].total;
							    		$('#fotoInt0').css("display","block");
							    	}else if(partido==='Otros'){
							    		candidatoTooltip = 'Otros';
							    		totalTooltip = interna[0][14].total;
							    		$('#fotoInt0').css("display","block");
							    	}else if(partido==='NS/NC'){
							    		candidatoTooltip = 'NS/NC';
							    		totalTooltip = interna[0][15].total;
							    		$('#fotoInt0').css("display","block");
							    	};
							        
							        break;
							    case 1:
							    	if(partido==='FPV'){
							    		candidatoTooltip = 'Florencio Randazzo';
							    		totalTooltip = interna[0][2].total;
							    		$('#fotoInt1').css("display","block");
							    	}else if(partido==='PRO'){
							    		candidatoTooltip = 'Elisa <br />Carrió';
							    		totalTooltip = interna[0][7].total;
							    		$('#fotoInt0').css("display","block");
							    	}else if(partido==='FAUNEN'){
							    		candidatoTooltip = 'Hermes Binner';
							    		totalTooltip = interna[0][11].total;
							    		$('#fotoInt0').css("display","block");
							    	}							    	
							        break;
							    case 2:
							    	if(partido==='FPV'){
							    		candidatoTooltip = 'Sergio Urribarri';
							    		totalTooltip = interna[0][3].total;
							    		$('#fotoInt1').css("display","block");
							    	}else if(partido==='FAUNEN'){
							    		candidatoTooltip = 'Otros <br /> FAUNEN';
							    		totalTooltip = interna[0][12].total;
							    		$('#fotoInt0').css("display","block");
							    	}else if(partido==='PRO'){
							    		candidatoTooltip = 'Ernesto <br /> Sanz';
							    		totalTooltip = interna[0][9].total;
							    		$('#fotoInt0').css("display","block");
							    	}	
							        
							        break;
							    case 3:
							        if(partido==='FPV'){
							    		candidatoTooltip = 'Julían Domínguez';
							    		totalTooltip = interna[0][4].total;
							    		$('#fotoInt1').css("display","block");
							    	}
							        break;
							    case 4:
							        if(partido==='FPV'){
							    		candidatoTooltip = 'Otros  <br />FPV';
							    		$('#fotoInt1').css("display","block");
							    	}
							        break;
							    case 5:
							        
							        break;
							    case 6:
							        
							        break;
							}

				            etiquetasInternas.html(
				            	
				            	"<div style=\"font-size:25px;margin-bottom:8px\"><center>"+candidatoTooltip+"</center></div>"+
				            	"<div style=\"font-size:17px;margin-bottom:4px\"><center>Sobre interna de "+partido+": "+(d.data*100).toFixed(2) + '%</center></div>'+
				            	"<div style=\"font-size:17px;\"><center>Sobre el total de PASO: "+(totalTooltip*100).toFixed(2) + '%</center></div>'
				            	
				            	
				            	);
				            etiquetasInternas.style('display', 'block');                         
				          });

						path.on('mouseout', function() {
	          				etiquetasInternas.style('display', 'none');
	          				/*for(i=0;i<16;i++){
				            	$('#fotoInt'+i).hide();
				            }*/
	         			});



						/*if(partido !== internaPartido){ //al hacer click en otro, se selecciona el nuevo partido
							internaPartido = partido;
						}*/
	         			
					}


					function createColorsScales(partido){
						switch (partido) {
						    case 'FPV':
								var color = d3.scale.ordinal()
								    .domain([0,1,2,3,4])
								    .range(["#082568","rgba(13, 49, 132,0.94)","#365BB0","#5777C0","#ADC6FF"]);/*"#ADC6FF"*/
								return color;
						    case 'FR':
								var color = d3.scale.ordinal()
								    .domain([0])
								    .range(["rgba(237, 21, 21, 0.94)"]);
								return color;
						    case 'PRO':
								var color = d3.scale.ordinal()
								    .domain([0,1])
								    .range(["rgb(226, 226, 36)","rgb(231, 168, 32)","#C4B633"]);
								return color;
						    case 'FAUNEN':
								var color = d3.scale.ordinal()
								    .domain([0,1,2,3])
								    .range(["#540033","#720045","#A7166E","#B33983"]);
								return color;
						    case 'FIT':
								var color = d3.scale.ordinal()
								    .domain([0])
								    .range(["rgb(173, 3, 3)"]);
								return color;
						    case 'PJ':
								var color = d3.scale.ordinal()
								    .domain([0])
								    .range(["rgb(58, 140, 54)"]);
								return color;
						    case 'Otros':
								var color = d3.scale.ordinal()
								    .domain([0])
								    .range(["rgb(0, 0, 0)"]);
								return color;    
						    case 'NS/NC':
								var color = d3.scale.ordinal()
								    .domain([0])
								    .range(["rgba(0, 0, 0, 0.38)"]);
								return color;
						}

					}
