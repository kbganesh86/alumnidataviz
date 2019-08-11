function initMap() {
  var map = new google.maps.Map(
      document.getElementById('map'),
      {center: {lat: 13.0827, lng: 80.2707}, zoom: 5});
  var input = document.getElementById('pac-input');

  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.bindTo('bounds', map);

  // Specify just the place data fields that you need.
  autocomplete.setFields(['place_id', 'geometry', 'name', 'formatted_address']);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);

  var geocoder = new google.maps.Geocoder;

  var marker = new google.maps.Marker({map: map});
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    var place = autocomplete.getPlace();

    if (!place.place_id) {
      return;
    }
    geocoder.geocode({'placeId': place.place_id}, function(results, status) {
      if (status !== 'OK') {
        window.alert('Geocoder failed due to: ' + status);
        return;
      }

      map.setZoom(3);
      map.setCenter(results[0].geometry.location);

      // Set the position of the marker using the place ID and location.
      marker.setPlace(
          {placeId: place.place_id, location: results[0].geometry.location});

      marker.setVisible(true);

      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-id'].textContent = place.place_id;
      infowindowContent.children['place-address'].textContent =
          results[0].formatted_address;

      infowindow.open(map, marker);
    });
  });
  
 
  var ganeshCoords = [{
      lat: 13.0827,
      lng: 80.2707
    }, //Chennai
    {
      lat: 32.7767,
      lng: -96.7970
    }, //Dallas

    {
      lat: 12.9716,
      lng: 77.5946
    }, //Bangalore

    {
      lat: 51.5074,
      lng: 0.1278
    }, //London

  ]

  var vijayCoords = [{
      lat: 13.0827,
      lng: 80.2707
    }, //Chennai
    {
      lat: 19.0760,
      lng: 72.8777
    }, // Bombay
    {
      lat: 43.6532,
      lng: -79.3832
    } //Toronto
  ];


  var vijayPath = new google.maps.Polyline({
    path: vijayCoords,
    geodesic: true,
    strokeColor: '#AB0000',
    strokeOpacity: 2.0,
    strokeWeight: 1.
  });

 var ganeshPath = new google.maps.Polyline({
    path: ganeshCoords,
    geodesic: true,
    strokeColor: '#AB00FF',
    strokeOpacity: 2.0,
    strokeWeight: 1.
  });

  vijayPath.setMap(map);
  ganeshPath.setMap(map);

}
