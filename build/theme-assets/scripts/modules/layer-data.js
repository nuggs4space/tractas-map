var layerData = [
	// Ecoregions
	{
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
	},

	// Ecoregions hover layer
	{
		"id": "ecoregions-hover",
		"type": "fill",
		"source": "ecoregions",
		"layout": {},
		"paint": {
			"fill-color": "#000",
			"fill-opacity": .15
		},
		"filter": ["==", "US_L4NAME", ""]
	},

	// Parks data
	{
		'id': 'parks',
		'type': 'fill',
		'source': {
			'type': 'geojson',
			'data': 'assets/geodata/parks.geojson'
		},
		'layout': {
			'visibility': 'none'
		},
		"paint": {
			'fill-color': '#74CE81',
			"fill-opacity": .35
		},
	},

	// Parks hover data
	{
		'id': 'parks-hover',
		'type': 'fill',
		'source': 'parks',
		'layout': {},
		"paint": {
			'fill-color': '#000',
			"fill-opacity": .15
		},
		"filter": ["==", "NAME", ""]
	},

	// Reno wards Layer
	{
		'id': 'reno-wards',
		'type': 'fill',
		'source': {
			'type': 'geojson',
			'data': 'assets/geodata/reno-wards.geojson'
		},
		"paint": {
			"fill-color": "rgba(252, 146, 114, .35)",
			"fill-outline-color": "#000"
		},
	},

	// Reno wards hover layer
	{
		'id': 'reno-wards-hover',
		'type': 'fill',
		'source': 'reno-wards',
		"paint": {
			"fill-color": "rgba(0, 0, 0, .15)",
		},
		"filter": ["==", "ward", ""],
	},

	// Watershed layer
	{
		'id': 'watershed',
		'type': 'fill',
		'source': {
			'type': 'geojson',
			'data': 'assets/geodata/watershed.geojson'
		},
		"paint": {
			"fill-color": "rgba(8, 64, 129, .35)",
			"fill-outline-color": "#000"
		},
	},

	// Watershed layer Hover
	{
		'id': 'watershed-hover',
		'type': 'fill',
		'source': 'watershed',
		"paint": {
			"fill-color": "rgba(0, 0, 0, .15)",
		},
		"filter": ["==", "DS573_WBDH", ""],
	},

	// Image data
	// {
	// 	"id": "elevation",
	// 	"type": "raster",
	// 	"source": {
	// 		'type': 'image',
	// 		'url': 'assets/geodata/radar.gif',
	// 		"coordinates": [
	// 			 [-80.425, 46.437],
	// 			 [-71.516, 46.437],
	// 			 [-71.516, 37.936],
	// 			 [-80.425, 37.936]
	// 		]
	// 	},
	// 	"paint": {"raster-opacity": 0.85}
	// },

];

module.exports = layerData;
