import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
// window.renderLocations = renderLocations

function onInit() {
    renderLocations()
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo(lat = 35.6895, lng = 139.6917) {
    console.log('Panning the Map');
    mapService.panTo(lat, lng);
}

function renderLocations() {
    const locations = locService.getLocs()
        .then(locations => {
            const strHMLs = locations.map(location => {
                return `
            <tr class="flex align-center">
                <td><button onclick=onDeleteLoc(${location.id}) class="btn-delete">x</button></td>
                <td class="location-name">${location.name}</td>
                <td><button onclick="onPanTo(${location.lat}, ${location.lng})" class="btn-go">Go</button></td>
            </tr>   
            `
            }).join('')

            document.querySelector('table').innerHTML = strHMLs
        })

}