var layerData = [

	// Amphibians data
	{
		'id': 'amphibians',
		'type': 'symbol',
		'source': {
			'type': 'geojson',
			'data': 'assets/geodata/amphibians.geojson'
		},
		'layout':{
			'text-field': 'A',
			'visibility': 'none'
		}
	},

	// Birds data
	{
		'id': 'birds',
		'type': 'symbol',
		'source': {
			'type': 'geojson',
			'data': 'assets/geodata/birds.geojson'
		},
		'layout':{
			'text-field': 'B',
			'visibility': 'none'
		}
	},

	// California Big Horns
	{
		'id': 'ca-bighorns',
		'type': 'fill',
		'source': {
			'type': 'geojson',
			'data': 'assets/geodata/ca-bighorns.geojson'
		},
		'layout': {
			'visibility': 'none'
		},
		"paint": {
			"fill-color": "rgba(35, 132, 67, .35)",
			"fill-outline-color": "#000"
		},
	},

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
		'layout': {
			'visibility': 'none'
		},
		"paint": {
			"fill-color": "#000",
			"fill-opacity": .15
		},
		"filter": ["==", "US_L4NAME", ""]
	},

	// Fish data
	{
		'id': 'fish',
		'type': 'symbol',
		'source': {
			'type': 'geojson',
			'data': 'assets/geodata/fish.geojson'
		},
		'layout':{
			'text-field': 'F',
			'visibility': 'none'
		}
	},

	// Mammals data
	{
		'id': 'mammals',
		'type': 'symbol',
		'source': {
			'type': 'geojson',
			'data': 'assets/geodata/mammals.geojson'
		},
		'layout':{
			'text-field': 'M',
			'visibility': 'none'
		}
	},

	// Mule Deer Layer
	{
		'id': 'mule-deer',
		'type': 'fill',
		'source': {
			'type': 'geojson',
			'data': 'assets/geodata/mule-deer.geojson'
		},
		'layout': {
			'visibility': 'none'
		},
		"paint": {
			"fill-color": "rgba(174, 1, 126, .35)",
			"fill-outline-color": "#000"
		},
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
			'fill-color': 'rgba(116, 206, 129, .35)',
			"fill-outline-color": "#84EB93"
		},
	},

	// Parks hover data
	{
		'id': 'parks-hover',
		'type': 'fill',
		'source': 'parks',
		'layout': {
			'visibility': 'none'
		},
		"paint": {
			'fill-color': '#000',
			"fill-opacity": .15,
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
		'layout': {
			'visibility': 'none'
		},
		"paint": {
			'fill-color': {
				'property': 'ward_num',
				'type': 'categorical',
				'stops': [
					['1', '#84EB93'],
					['2', '#78D585'],
					['3', '#6CC078'],
					['4', '#5FAA6A'],
					['5', '#53945C']
				]
			},
			'fill-opacity': .35
		},
	},

	// Reno wards hover layer
	{
		'id': 'reno-wards-hover',
		'type': 'fill',
		'source': 'reno-wards',
		"paint": {
			'fill-color': {
				'property': 'ward_num',
				'type': 'categorical',
				'stops': [
					['1', '#84EB93'],
					['2', '#78D585'],
					['3', '#6CC078'],
					['4', '#5FAA6A'],
					['5', '#53945C']
				]
			},
			'fill-opacity': .50
		},
		'layout': {
			'visibility': 'none'
		},
		"filter": ["==", "ward", ""],
	},

	// Reptile data
	{
		'id': 'reptiles',
		'type': 'symbol',
		'source': {
			'type': 'geojson',
			'data': 'assets/geodata/reptiles.geojson'
		},
		'layout':{
			'text-field': 'R',
			'visibility': 'none'
		}
	},

	// Watershed layer
	{
		'id': 'watershed',
		'type': 'fill',
		'source': {
			'type': 'geojson',
			'data': 'assets/geodata/watershed.geojson'
		},
		'layout': {
			'visibility': 'none'
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
		'layout': {
			'visibility': 'none'
		},
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
