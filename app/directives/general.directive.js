var app = angular.module('store');

app.directive('generalDirective',['$sce',function($sce){ //Para meter HTML$

		return{

			restrict:'E',
			controller: function($scope,$http,$sce){

			$scope.estado = {id:0,name:"",data:[]};
			$scope.estado.name = "Aguascalientes"


			//Map dimensions (in pixels)
			var width = 600,
			    height = 378;

			//Map projection
			var projection = d3.geo.mercator()
			    .scale(1032.2520088666774)
			    .center([-102.54673767089835,23.9520140252885]) //projection center
			    .translate([width/2,height/2]) //translate to center the map in view

			//Generate paths based on projection
			var path = d3.geo.path()
			    .projection(projection);

			//Create a tooltip, hidden at the start
			var tooltip = d3.select("#map").append("div").attr("class","tooltipMap");

			//Create an SVG
			var svg = d3.select("#map").append("svg")
				.attr("id","svg0")
			   // .attr("width", width)
			   // .attr("height", height)
			    .attr("viewBox", "0 0 600 378")
			    .attr("perserveAspectRatio","xMinYMid");

			//Group for the map features
			var features = svg.append("g")
			    .attr("class","features");

			//Create choropleth scale
			var color = d3.scale.quantize()
			    .domain([0,1])
			    .range(d3.range(3).map(function(i) { return "q" + i + "-3"; }));



			d3.json("maps/mapaMXCorregido.geojson",function(error,geodata) {
			  if (error) return console.log(" error viejaaaa"); //unknown error, check the console

			  //Create a path for each map feature in the data
			  features.selectAll("path")
			    .data(geodata.features)
			    .enter()
			    .append("path")
			    .attr("d",path)
			    .attr("class", function(d) { return (typeof color(d.properties.FID) == "string" ? color(d.properties.FID) : ""); })
			    .on("mouseover",function(d){

			    	
			    	hoveredPath = d3.select(this);

			    	if(d.properties.FID === 1){
			    		showTooltip(d);
			    		hoveredPath.style('fill','#205E8C');
			    		
			    		$scope.$apply(function() {  //Sin este apply la actualizacion de estadoData no se refleja en el ng-repeat del panel de abajo
				    		$scope.estado.id = selectState(d.properties.name.toString())-1;  //Resto uno. Recordar que esta desfazado el nuero del TAB con el objeto Datos
				    		$scope.estado.name = d.properties.name.toString();
				    		//if($scope.estado.id = 4){$scope.estado.name = "Ciudad de México"};
				    		
				    		$scope.width = "calc(100%/$scope.estado.data["+$scope.estado.id+"].length)";
				    		
			    		});
			    				    	
			    		
			    	}
			    })
			    .on("mousemove",moveTooltip)
			    .on("mouseout",function(d){

			    	hideTooltip();
			    	hoveredPath = d3.select(this);
			    	
			    	if(d.properties.FID === 1){
			    		hoveredPath.style('fill','#3182BD');			    	
			    	}
			    })
			    .on("click",clicked);

			});
			

			// Add optional onClick events for features here
			// d.properties contains the attributes (e.g. d.properties.name, d.properties.population)
			function clicked(d,i) {			

			}

			//Position of the tooltip relative to the cursor
			var tooltipOffset = {x: -136, y: -290};

			//Create a tooltip, hidden at the start
			function showTooltip(d) {
			  moveTooltip();

			  tooltip.style("display","block")
			      .text(d.properties.name);
			}

			//Move the tooltip to track the mouse
			function moveTooltip() {

			 	tooltip.style("top",(d3.mouse(document.body)[1]+tooltipOffset.y)+"px")
			      .style("left",(d3.mouse(document.body)[0]+tooltipOffset.x)+"px");
			}

			//Create a tooltip, hidden at the start
			function hideTooltip() {
			  tooltip.style("display","none");
			}

			function selectState(state){
				switch(state){
					case "Aguascalientes": return 1; break;
					case "Chihuahua": return 2; break;
					case "Durango": return 3; break;
					case "Hidalgo": return 4; break;
					case "Ciudad de Mexico": return 5; break;
					case "Oaxaca": return 6; break;
					case "Puebla": return 7; break;
					case "Quintana Roo": return 8; break;
					case "Sinaloa": return 9; break;
					case "Tamaulipas": return 10; break;
					case "Tlaxcala": return 11; break;
					case "Veracruz": return 12; break;
					case "Zacatecas": return 13; break;

				}
			}


			},
			templateUrl:"app/templates/general-directive.html"
			

			
		}
	}]);