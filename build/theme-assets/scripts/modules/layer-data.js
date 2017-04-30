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


];

module.exports = layerData;
