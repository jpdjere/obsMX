var i = 0;
while(i<=1){

svg = $("#svg"+i);

	
	var chart = svg,
		aspect = chart.width() / chart.height(),
	    container = chart.parent();

	$(window).on("ready", function() {
	    var targetWidth = container.width();
	    //chart.attr("width", targetWidth);
	    //chart.attr("height", Math.round(targetWidth / aspect));
	    chart.attr("viewBox", "0 0 "+targetWidth+" "+Math.round(targetWidth / aspect));
	}).trigger("ready");

	$(window).on("resize", function() {
	    var targetWidth = container.width();
	    //chart.attr("width", targetWidth);
	    //chart.attr("height", Math.round(targetWidth / aspect));
	    chart.attr("viewBox", "0 0 "+targetWidth+" "+Math.round(targetWidth / aspect));
	}).trigger("resize");

i++;
}

/*
svg1 = $("#svg1");

	
	var chart1 = svg1,
		aspect1 = chart1.width() / chart1.height(),
	    container1 = chart1.parent();

	$(window).on("ready", function() {
	    var targetWidth1 = container1.width();
	    //chart.attr("width", targetWidth);
	    //chart.attr("height", Math.round(targetWidth / aspect));
	    chart1.attr("viewBox", "0 0 "+targetWidth1+" "+Math.round(targetWidth1 / aspect1));
	}).trigger("ready");

	$(window).on("resize", function() {
	    var targetWidth1 = container1.width();
	    //chart.attr("width", targetWidth);
	    //chart.attr("height", Math.round(targetWidth / aspect));
	    chart1.attr("viewBox", "0 0 "+targetWidth1+" "+Math.round(targetWidth1 / aspect1));
	}).trigger("resize");

	*/