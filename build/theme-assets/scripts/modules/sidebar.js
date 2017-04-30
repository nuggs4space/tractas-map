let $ = require('jquery');

// Wait for the mappy map to load
window.EventAggregator.on('mapLoaded', function(map) {
  map.setStyle('mapbox://styles/teamtractas/cj23w5dgs00362rpen7z9zuti');
});

$('.dataset a').click(function(){
  $(this).parent('.dataset').toggleClass('chosen');
});
