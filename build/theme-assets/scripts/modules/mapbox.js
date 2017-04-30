var sourceData 	= require('./geojson-sources');
var layerData 	= require('./layer-data');

var mapboxMap = (function() {

	var map = null;

  function load () {

    // Grab the map element
    var mapElement = document.getElementById('map');

    // If we have everything available, fire up the map
    if( mapElement ) {
			mapboxgl.accessToken = 'pk.eyJ1IjoidGVhbXRyYWN0YXMiLCJhIjoiY2oyM28zY3NqMDAxMDMzcGJtOXE3anJ6eiJ9.MG1Nm_rqtGCy0CIvfbYK9A';
			map = new mapboxgl.Map({
				container: 'map', // container id
				style: 'mapbox://styles/mapbox/light-v9', //stylesheet location
				center: [-120.1317196, 39.557593], // starting position
				zoom: 9 // starting zoom
			});

      map.on('load', function() {

				// Add source data to the map from config
				if( sourceData.length ) {
					sourceData.forEach( function(source) {
						map.addSource(source);
					});
				}

				// Add layer data to the map from config
				if( layerData.length ) {
					layerData.forEach( function(layer) {
						map.addLayer(layer);
					});
				}

      });

      // Expose the map object once it's ready
      map.on('load', function() {
        window.EventAggregator.emit('mapLoaded', map);

				map.on("mousemove", "ecoregions", function(e) {
					map.setFilter("ecoregions-hover", ["==", "US_L4NAME", e.features[0].properties['US_L4NAME']]);
				});

				map.on("mouseleave", "ecoregions", function(e) {
					map.setFilter("ecoregions-hover", ["==", "US_L4NAME", '']);
				});

      });
    }
  }

  return {
    load: load,
  }

})();

new mapboxMap.load();
