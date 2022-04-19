export const mapService = {
    initMap,
    addMarker,
    panTo
}

let gMap;

//init
function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15,
                disableDefaultUI: true,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
                scaleControl: true,
            })
            console.log('Map!', gMap);
        }).then(addListeners)

}

function addMarker(loc) {
    let marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    console.log(loc);
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function addListeners() {
    let infoWindow = new google.maps.InfoWindow()
    gMap.addListener("click", (mapsMouseEvent) => {
        infoWindow.close()
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(
            `
            <h3 class="info-window">New place</h3>
            <form onsubmit="onNewLoc(event)">
                <input type="text" class="location-input" placeholder="Name the place"></input>
                <button class="btn-save-place">Save</button>
            </form>
            `
        );
        infoWindow.open(gMap)
    });
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDU8UTgqxnZjsWDz_WiWNCfxoNU0-rWrmk';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}