var API_KEY = 'AIzaSyDwDELgO5F19_AmDgtchXwwK0QZ8rbTKC8';
function create_marker(_map, element) {
    var marker = new google.maps.Marker({
        position: {
            lat: element.geometry.location.lat,
            lng: element.geometry.location.lng
        },
        map: _map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        icon: {
            url: 'img/supermarket.png',
            scaledSize: new google.maps.Size(30, 30)
        },
        title: element.name
    });
    var _infowindow = new google.maps.InfoWindow({
        size: new google.maps.Size(150, 50)
    });
    google.maps.event.addListener(marker, 'click', function() {
        _infowindow.setContent(element.vicinity);
        _infowindow.open(_map, marker);
    });
}
function show_grocery(_map, lat,lng) {
    var data = {
        lat: lat,
        lng: lng,
        api_key: API_KEY
    };
    $.ajax({
        type: 'POST',
        url: 'main.php',
        data: data,
        dataType: 'json',
        success:function(res) {
            if(res.status) {
                $.each(res.list, function(index,element) {
                    create_marker(_map, element);
                });
            }
            console.log(res.message);
        },
        error: function() {
            console.log('ajax error');
        }
    });
}
$(document).ready(function() {
    
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 15,
        styles: [{featureType: 'poi.business',elementType: 'labels',stylers: [{ visibility: 'off' }]}]
    });
    var infoWindow = new google.maps.InfoWindow({map: map});
    
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            /*infoWindow.setPosition(pos);
            infoWindow.setContent('I\'m HERE!');*/
            map.setCenter(pos);
            var _icon = {
                url: 'img/marker.png',
                scaledSize: new google.maps.Size(30, 30)
            };
            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                draggable: false,
                animation: google.maps.Animation.DROP,
                icon: _icon,
                title: 'I\'m HERE!'
            });
    
    
            show_grocery(map, position.coords.latitude, position.coords.longitude);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    
    
    
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
    }
});

