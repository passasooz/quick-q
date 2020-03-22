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
            url: IMG_MARKET,
            scaledSize: new google.maps.Size(30, 30)
        },
        title: element.name
    });
    var _infowindow = new google.maps.InfoWindow({
        size: new google.maps.Size(150, 50)
    });
    google.maps.event.addListener(marker, 'click', function() {
        //_infowindow.setContent(element.name + '<br>' + element.vicinity + '<br>' + element.time_spent + (typeof element.now != "undefined" ? '<br>' + element.now : ''));
        _infowindow.setContent(element.name + '<br>' + element.vicinity + '<br><strong>' + element.now + '</strong>' + (typeof element.time_spent != "undefined" ? '<br><strong>' + element.time_spent + '</strong>' : ''));
        _infowindow.open(_map, marker);
    });
}
function show_grocery(_map, lat,lng) {
    var data = {
        location: lat+','+lng
    };
    $.ajax({
        type: 'POST',
        url: ABSOLUTE_URL + '/places',
        data: data,
        dataType: 'json',
        success:function(res) {
            if(res.status) {
                $.each(res.list, function(index,element) {
                    create_marker(_map, element);
                });
            } else {
                console.log(res.message);
            }
        },
        error: function() {
            console.log('ajax error');
        }
    });
}
$(document).ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 14,
        styles: [{featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }]}]
    });
    var infoWindow = new google.maps.InfoWindow({map: map});
    
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: 45.6932773,//position.coords.latitude,
                lng: 9.6638595//position.coords.longitude
            };
            /*infoWindow.setPosition(pos);
            infoWindow.setContent('I\'m HERE!');*/
            map.setCenter(pos);
            var _icon = {
                url: IMG_ME,
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
    
    
            //show_grocery(map, position.coords.latitude, position.coords.longitude);
            show_grocery(map, 45.6932773, 9.6638595);
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

// !4m8!1m2!2m1!1sHotel!3m4!1s0x131a20eda9d7000f:0xf58b792fe85dcbef!8m2!3d37.8940921!4d13.1138134