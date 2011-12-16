var times =[2.336, 3.947, 5.191, 6.872, 10.216, 13.049, 17.808, 19.558, 22.079, 25.656, 30.128, 32.807, 34.062, 35.656, 38.968, 41.04, 43.401, 45.16, 46.272, 47.759, 50.48, 53.103, 54.414, 55.856, 58.944, 60.22, 62.424, 63.471, 64.897, 66.859, 68.699, 71.392, 72.111, 72.978, 73.831];

$(function() {

	var pop = Popcorn("#voo");
	var trans = $("#voo-transcript");
	
	trans.find("[data-time]").each(function(i) {
		$(this).addClass("vkf-" + i);
	});

	$.each( times, function( i, time ) {
		pop.cue( time, function() {
			trans.animate({
				scrollTop: trans.scrollTop() + trans.find(".vkf-" + i).position().top - 160
			})
			trans.find(".active").removeClass("active");
			trans.find(".vkf-" + i).addClass("active");
		});
	});

});
