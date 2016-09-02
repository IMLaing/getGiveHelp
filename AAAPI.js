var geocoder, AAMap, volunteerMap;


function geoCheck(){
    if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function(position) {
               AAMap.setCenter({lat:position.coords.latitude, lng:position.coords.longitude});
               volunteerMap.setCenter({lat:position.coords.latitude, lng:position.coords.longitude});
               }); 
        } else {
      console.log('no geolocation is available');
    }
}
geoCheck();



function Deg2Rad( deg ) {
       return deg * Math.PI / 180;
    }

function Haversine( lat1, lon1, lat2, lon2 )
    {
        var R = 6372.8; // Earth Radius in Kilometers

        var dLat = Deg2Rad(lat2-lat1);  
        var dLon = Deg2Rad(lon2-lon1);  

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                        Math.cos(Deg2Rad(lat1)) * Math.cos(Deg2Rad(lat2)) * 
                        Math.sin(dLon/2) * Math.sin(dLon/2);  
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; 

        // Return Distance in Kilometers
        return d;
    }
// var distance = google.maps.geometry.spherical.computeDistanceBetween(AAMarker, );
var searchURL = function(venue){
  var encodedVenue = encodeURIComponent(venue + ' AA');
  // encodedURIComponent encodes a string to be URL ready
  //var cleanVenue = venue.replace(/[^\w\s]/gi, '');
  return "https://www.google.com/#q=" + encodedVenue;
};

function initMap() {
   geocoder = new google.maps.Geocoder();
   var myLatLng = {lat: 37.77, lng: -71.06};
   var mapOptions = {
    zoom: 8,
    center: myLatLng,
    disableDefaultUI: true
    };
  
    if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function(position) {
            myLatLng = {lat:position.coords.latitude, lng:position.coords.longitude};
          });
    }

  AAMap = new google.maps.Map(document.getElementById('map'), mapOptions);
  //volunteerMap = new google.maps.Map(document.getElementById('map2'), mapOptions);

   $.getJSON('./geocoded.json', function(data){
      var closestLocations = _(data).sortBy(function(e){
        return Haversine(e.lat, e.lng, myLatLng.lat, myLatLng.lng);
        });
        $('#getHelpLocButton').empty();
    console.log('empty #getHelpLocButton'); 
      closestLocations.slice(0,5).forEach(function(element, index, array){
          var AAMarker = new google.maps.Marker({
            map: AAMap,
            position: {lat: element.lat, lng:element.lng}
         });
          /*var volunteerMarker = new google.maps.Marker({
            map: volunteerMap,
            position: {lat: element.lat, lng:element.lng}
         });*/    
    console.log('marker added at AAMap and volunteerMap');
         $('#getHelpLocMenu').append(
          '<li><a href="'+ searchURL(element.venue) +'" ><button class="getHelpLocButton">'+ element.venue +'<br>'+ element.city +'</button></a></li>'
          );
    console.log('append html');
      });
      $('.getHelpLocButton').addClass('myButton');
    console.log('added class myButton after created DOM element');  
    });
}


 /*$.getJSON('./geocoded.json', function(data){
    data.forEach(function(element, index, array){
    var AAMarker = new google.maps.Marker({
        map: AAMap,
        position: {lat: element.lat, lng:element.lng}
      });
    var volunteerMarker = new google.maps.Marker({
        map: volunteerMap,
        position: {lat: element.lat, lng:element.lng}
      });
    });
  });*/
/*=function codeAddress(){
    var address = document.getElementById('address').value;
    geocoder.geocode( {'address':address}, function(results, status) {
     if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }

  });
  }*/

  /*
take origin point and compare to the AA meeting location
distanceFunction takes 2 points, sorts by distance, show first 5

  */