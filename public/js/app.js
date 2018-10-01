function initMap() {

    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 4,
            center: {
                lat: 33.7490,
                lng: 84.3880
            }

        });

    google.maps.event.addListener(map, 'click', function (event) {
        addMarker({
            coords: event.latLng
        });
    });

    let markers = [{
            coords: {
                lat: -25.344,
                lng: 131.036
            },
            content: '<h2> City, State </h2>'
        },
        {
            coords: {
                lat: -20.344,
                lng: 101.036
            },
            content: '<h2> City2, State2 </h2>'
        }
    ];

    for (let i = 0; i < markers.length; i++) {
        addMarker(markers[i]);
    };

    function addMarker(props) {
        let marker = new google.maps.Marker({
            position: props.coords,
            map: map
        });
        if (props.content) {
            const infoWindow = new google.maps.InfoWindow({
                content: props.content
            });
            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
        }
    };
}