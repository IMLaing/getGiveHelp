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

function initMap() {
   geocoder = new google.maps.Geocoder();
   var myLatLng = {lat: 42.36, lng: -71.06};
   var mapOptions = {
    zoom: 8,
    center: myLatLng,
    disableDefaultUI: true
  };
  
  AAMap = new google.maps.Map(document.getElementById('map'), mapOptions);
  volunteerMap = new google.maps.Map(document.getElementById('map2'), mapOptions);

  $.getJSON('./geocoded.json', function(data){
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
  });
}


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