import {switchState} from './form.js';
import {createAnnouncement} from './data.js';
import {render} from './announcement.js';
const TokyoCoordinates = {
  lat: 35.6895,
  lng: 139.692,
};
const PinSizes = {
  pinIcon: 40,
  mainPinIcon: 52,
};

const SCALE = 10;
const DIGITS = 5;

const address = document.querySelector('#address');
const map = L.map('map-canvas')
  .on('load', () => {
    switchState(false);
  })
  .setView({
    lat: TokyoCoordinates.lat,
    lng: TokyoCoordinates.lng,
  }, SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: PinSizes.mainPinIcon,
  iconAnchor: [PinSizes.mainPinIcon/2, PinSizes.mainPinIcon],
});

const mainPinMarker = L.marker(
  {
    lat: TokyoCoordinates.lat,
    lng: TokyoCoordinates.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: PinSizes.pinIcon,
  iconAnchor: [PinSizes.pinIcon/2, PinSizes.pinIcon],
});

address.value = `${mainPinMarker.getLatLng().lat.toFixed(DIGITS)}, ${mainPinMarker.getLatLng().lng.toFixed(DIGITS)}`;

mainPinMarker.on('moveend', (evt) => {
  const targetCoordinates = evt.target.getLatLng();
  address.value = `${targetCoordinates.lat.toFixed(DIGITS)}, ${targetCoordinates.lng.toFixed(DIGITS)}`;
});

const createPinMarker = (announcement) => {
  const createCustomPopup = () => render(announcement);
  const coordinates = announcement.location;
  const pinMarker = L.marker(
    {
      lat: coordinates.lat,
      lng: coordinates.lng,
    },
    {
      icon: pinIcon,
    },
  );
  pinMarker.addTo(map)
    .bindPopup(createCustomPopup());
};

export {createPinMarker};
