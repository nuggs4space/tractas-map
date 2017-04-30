let $ = require('jquery');


// Wait for the mappy map to load
window.EventAggregator.on('mapLoaded', function(map) {
	$('.datasets a').click(function(){
		if($(this).parents('.dataset').hasClass('chosen')){
			map.setLayoutProperty($(this).data('style'), 'visibility', 'none');
		}else{
			map.setLayoutProperty($(this).data('style'), 'visibility', 'visible');
		}
	});
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