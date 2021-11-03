import {switchState} from './form.js';
import {createAnnouncement} from './data.js';
import {render} from './announcement.js';

const address = document.querySelector('#address');
const map = L.map('map-canvas')
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

switchState(false);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

address.value = `${mainPinMarker.getLatLng().lat.toFixed(5)}, ${mainPinMarker.getLatLng().lng.toFixed(5)}`;

mainPinMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});


for(let i = 1; i <= 11; i++) {
  const createCustomPopup = () => render(createAnnouncement(i));
  const lat = createAnnouncement().location.lat;
  const lng = createAnnouncement().location.lng;
  const pinMarker = L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      icon: pinIcon,
    },
  );
  pinMarker.addTo(map)
    .bindPopup(createCustomPopup());
}

export {map};
