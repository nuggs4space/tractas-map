let $ = require('jquery');
var ee = require('event-emitter');
window.EventAggregator = ee();

$(document).ready( function() {
	require('./modules/mapbox');
	require('./modules/sidebar');
});
