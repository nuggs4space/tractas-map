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
				center: [-119.889663696289, 38.9693489074707], // starting position
				zoom: 4 // starting zoom
			});

      map.on('load', function(){
        map.addSource('counties', {
          type: 'geojson',
          data: 'assets/geodata/counties.geojson'
        });
        map.addLayer({
          'id': 'counties',
          'type': 'vector',
          'source': 'counties',
          'layout': {
            'visibility': 'none'
          }
        });
      });

      // Expose the map object once it's ready
      map.on('load', function() {
        window.EventAggregator.emit('mapLoaded', map);
      });
    }
  }

  return {
    load: load,
  }

})();

new mapboxMap.load();
