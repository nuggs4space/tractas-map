let $ = require('jquery');


// Wait for the mappy map to load
window.EventAggregator.on('mapLoaded', function(map) {
  map.setStyle('mapbox://styles/teamtractas/cj23w5dgs00362rpen7z9zuti');
});

$('.dataset .heading').click(function(){
  $(this).parent('.dataset').toggleClass('chosen');
});

$('.dataset .content li').click(function(){
  $(this).toggleClass('chosen');
});

$('.dataset.parent').click(function(){
	if($(this).hasClass('chosen')){
		$(this).find('.content').slideDown('slow');
	}else{
		$(this).find('.content').slideUp('slow');
	}
});
