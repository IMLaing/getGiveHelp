var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCZSztzrJQoCzboyW0zj-EwQqfYE7NvjfE'
});

var data = require('./phone.json');
data.forEach(function(element, index, array){
	googleMapsClient.geocode({
	  	address: element.venue+', '+element.city
	}, 

	function(err, response) {
  		if (!err) {
  			if(response.json.results.length > 0){
    			var location = response.json.results[0].geometry.location;
				console.log({
					venue: element.venue,
					city: element.city,
					lat: location.lat,
					lng: location.lng,
					phone: element.phone
				});
			} else {
				console.error('no such location');
			}
  		}
	});
});
// Geocode an address.
/*

var fs = require('fs');
fs.readFile('/etc/passwd', function(err, buf) {
  console.log(buf.toString());
});

*/
