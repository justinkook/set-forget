const geocode = (e) => {
    e.preventDefault();
    let location = document.getElementById('location-input').value
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: 'AIzaSyAQPXz579UmeXLiAqMxez-ud7xJJgnsxaI'
            }
        })
        .then(function (res) {
            console.log(res);

            let formattedAddress = res.data.results[0].formatted_address;
            let formattedAddressOutput =
                `<ul class="list-group"> 
                <li class="list-group-item"> ${formattedAddress}</li>
             </ul>`;

            let addressComponents = res.data.results[0].address_components;
            let addressComponentsOutput = `<ul class="list-group">`;

            for (let i = 0; i < addressComponents.length; i++) {
                addressComponentsOutput +=
                    `<li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>`;
            }

            addressComponentsOutput += `</ul>`;

            let lat = res.data.results[0].geometry.location.lat;
            let lng = res.data.results[0].geometry.location.lng;

            let geometryOutput =
                `<ul class="list-group"> 
                <li class="list-group-item"><strong>Latitude</strong> ${lat}</li>
                <li class="list-group-item"><strong>Longitude</strong> ${lng}</li>
             </ul>`;

            document.getElementById('formatted-address').innerHTML =
                formattedAddressOutput;

            document.getElementById('address-components').innerHTML =
                addressComponentsOutput;

            document.getElementById('geometry').innerHTML =
                geometryOutput;

        })

        .catch(function (err) {
            console.log(err);
        })
};


function initMap() {

    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 4,
            center: {
                lat: 33.7490,
                lng: 84.3880
            }

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

    google.maps.event.addListener(map, 'click', function (event) {
        addMarker({
            coords: event.latLng
        });
    });

    for (let i = 0; i < markers.length; i++) {
        addMarker(markers[i]);
    };
}

const locationForm = document.getElementById('location-form');

locationForm.addEventListener('submit', geocode);