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
        map.addLayer({
          'id': 'ecoregions',
          'type': 'fill',
          'source': {
            'type': 'geojson',
            'data': 'assets/geodata/ecoregions.geojson'
          },
          'layout': {
            'visibility': 'none'
          },
          'paint': {
            'fill-color': {
              'property': 'US_L4CODE',
              'type': 'categorical',
              'stops': [
                ['13aa', '#3366CC'],
                ['13h', '#DC3912'],
                ['13j', '#FF9900'],
                ['13k', '#109618'],
                ['13l', '#990099'],
                ['13x', '#0099C6'],
                ['5b', '#DD4477'],
                ['5c', '#66AA00'],
                ['5f', '#B82E2E'],
                ['80d', '#22AA99'],
                ['80g', '#AAAA11'],
                ['80j', '#329262']
              ]
            },
            'fill-opacity': .35
          },
        });

        /*
        map.addLayer({
          'id': 'elevation',
          'source': {
            'type': 'raster',
            'data': 'assets/geodata/elevation.tif'
          },
          'layout': {
            'visibility': 'none'
          },
          'paint': {
            'fill-color': '#ff0000',
            'fill-opacity': .35
          }
        });
        */

        map.addSource('parks', {
          'type': 'geojson',
          'data': 'http://data-washoe.opendata.arcgis.com/datasets/e3e91a767f43427495bbf1c79906403f_6.geojson?where=&geometry={"xmin":-14656705.296645248,"ymin":4568085.6007849015,"xmax":-11914756.218000134,"ymax":5301881.072322398,"spatialReference":{"wkid":102100}}'
        });

				map.addLayer({
					"id": "ecoregions-hover",
					"type": "fill",
					"source": "ecoregions",
					"layout": {},
					"paint": {
						"fill-color": "#000",
						"fill-opacity": .15
					},
					"filter": ["==", "US_L4NAME", ""]
				});

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
