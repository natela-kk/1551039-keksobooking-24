import {switchState} from './form.js';
import {createAnnouncement} from './data.js';
import {render} from './announcement.js';
const TOKYO_COORDINATES = {
  lat: 35.6895,
  lng: 139.692,
};
const PIN_SIZES = {
  pinIcon: 40,
  mainPinIcon: 52,
};
const PIN_ANCHORS = {
  pinIcon: [20, 40],
  mainPinIcon: [26, 52],
};
const SCALE = 10;
const DIGITS = 5;

const address = document.querySelector('#address');
const map = L.map('map-canvas')
  .on('load', () => {
    switchState(false);
  })
  .setView({
    lat: TOKYO_COORDINATES.lat,
    lng: TOKYO_COORDINATES.lng,
  }, SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: PIN_SIZES.mainPinIcon,
  iconAnchor: PIN_ANCHORS.mainPinIcon,
});

const mainPinMarker = L.marker(
  {
    lat: TOKYO_COORDINATES.lat,
    lng: TOKYO_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: PIN_SIZES.pinIcon,
  iconAnchor: PIN_ANCHORS.pinIcon,
});

address.value = `${mainPinMarker.getLatLng().lat.toFixed(DIGITS)}, ${mainPinMarker.getLatLng().lng.toFixed(DIGITS)}`;

mainPinMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const createPinMarker = (i) => {
  const announcement = createAnnouncement(i);
  const createCustomPopup = () => render(announcement);
  const latLng = announcement.location;
  const pinMarker = L.marker(
    {
      lat: latLng.lat,
      lng: latLng.lng,
    },
    {
      icon: pinIcon,
    },
  );
  pinMarker.addTo(map)
    .bindPopup(createCustomPopup());
};
for(let i = 1; i <= 11; i++) {
  createPinMarker(i);
}

export {map};
