let $ = require('jquery');


// Wait for the mappy map to load
window.EventAggregator.on('mapLoaded', function(map) {
	$('.datasets a').click(function(){
		// get the parent element
		var p = $(this).parent('li');
		if(!p.length){
			p = $(this).parents('.dataset');
		}

		// get the datasets from the data-set attribute
		var datasets = $(this).data('set').split(',');

		// determine whether we are hiding or showing the data layer
		if(p.hasClass('chosen')){
			$.each(datasets, function(index, dataset){
				// hide the dataset
				map.setLayoutProperty(dataset, 'visibility', 'none');
			});
		}else{
			$.each(datasets, function(index, dataset){
				// show the dataset
				map.setLayoutProperty(dataset, 'visibility', 'visible');
			});
		}
	});
});

// shows a chosen state for items in the sidebar
$('.dataset .heading').click(function(){
  $(this).parent('.dataset').toggleClass('chosen');
});

// shows a chosen state for sub-items in the sidebar
$('.dataset .content li').click(function(){
  $(this).toggleClass('chosen');
});

// causes the sub-items panel in the sidebar to slide open/closed
$('.dataset.parent').click(function(){
	if($(this).hasClass('chosen')){
		$(this).find('.content').slideDown('slow');
	}else{
		$(this).find('.content').slideUp('slow');
	}
});