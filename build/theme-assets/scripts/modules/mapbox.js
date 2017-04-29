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
				style: 'mapbox://styles/teamtractas/cj23qg1ib00032ro8yjzzhxry', //stylesheet location
				center: [-119.889663696289, 38.9693489074707], // starting position
				zoom: 15 // starting zoom
			});
    }
  }

  return {
    load: load,
  }

})();

new mapboxMap.load();
