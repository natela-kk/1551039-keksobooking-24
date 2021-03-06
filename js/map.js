import {switchState} from './form.js';
import {render} from './announcement.js';
import {getData} from './server-requests.js';
import {setFilterListener, SIMILAR_AD_COUNT} from './filter.js';
import {switchFilterState} from './main.js';

const InitialCoordinates = {
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

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: PinSizes.mainPinIcon,
  iconAnchor: [PinSizes.mainPinIcon/2, PinSizes.mainPinIcon],
});

const mainPinMarker = L.marker(
  {
    lat: InitialCoordinates.lat,
    lng: InitialCoordinates.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const getSuccessData = (ads) => {
  createPinMarkers(ads.slice(0, SIMILAR_AD_COUNT));
  switchFilterState(false);
  setFilterListener(ads);
};

const map = L.map('map-canvas')
  .on('load', () => {
    switchState(false);
    getData(getSuccessData);
  })
  .setView({
    lat: InitialCoordinates.lat,
    lng: InitialCoordinates.lng,
  }, SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

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
const markerGroup = L.layerGroup().addTo(map);

const createPinMarker = (ad) => {
  const createCustomPopup = () => render(ad);
  const coordinates = ad.location;
  const pinMarker = L.marker(
    {
      lat: coordinates.lat,
      lng: coordinates.lng,
    },
    {
      icon: pinIcon,
    },
  );
  pinMarker.addTo(markerGroup)
    .bindPopup(createCustomPopup());
};

function createPinMarkers(ads) {
  markerGroup.clearLayers();
  ads.forEach((ad) => {
    createPinMarker(ad);
  });
}

export {createPinMarkers, map, InitialCoordinates, SCALE, mainPinMarker, address, DIGITS};
