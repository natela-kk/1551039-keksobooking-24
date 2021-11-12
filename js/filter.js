import {createPinMarkers} from './map.js';
import {mapFilters} from './main.js';
import {debounce} from './utils/debounce.js';
const DEFAULT_VALUE = 'any';
const SIMILAR_AD_COUNT = 10;

const filterForm = document.querySelector('.map__filters');
const type = filterForm.querySelector('#housing-type');
const price = filterForm.querySelector('#housing-price');
const roomsNumber = filterForm.querySelector('#housing-rooms');
const guestsNumber = filterForm.querySelector('#housing-guests');
const features = filterForm.querySelector('#housing-features');
const PriceValue = {
  any: {
    min: 0,
    max: Infinity,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  low: {
    min: 0,
    max: 10000,
  },
  high: {
    min: 50000,
    max: Infinity,
  },
};
const filterType = (ad) => type.value === DEFAULT_VALUE || type.value === ad.offer.type;
const filterRooms = (ad) => roomsNumber.value === DEFAULT_VALUE || Number(roomsNumber.value) === ad.offer.rooms;
const filterPrice = (ad) => ad.offer.price > PriceValue[price.value].min && ad.offer.price < PriceValue[price.value].max;
const filterGuests = (ad) => guestsNumber.value === DEFAULT_VALUE || Number(guestsNumber.value) === ad.offer.guests;
const filterFeatures = (ad) => {
  const checkedFeatures = Array.from(features.querySelectorAll('input[type="checkbox"]:checked'));
  if (!ad.offer.features && checkedFeatures.length > 0) {
    return false;
  }
  return checkedFeatures.every((feature) => ad.offer.features.includes(feature.value));
};

const filterOffers = (ads) => ads.filter((ad) => filterType(ad) && filterRooms(ad) && filterPrice(ad) && filterGuests(ad) && filterFeatures(ad)).slice(0, SIMILAR_AD_COUNT);

const getFilteredPins = (ads) => {
  const filteredOffers = filterOffers(ads);
  createPinMarkers(filteredOffers);
};

const setFilterListener = (ads) => {
  mapFilters.addEventListener('change', debounce(() => getFilteredPins(ads)));
  mapFilters.addEventListener('reset', debounce(() => getFilteredPins(ads)));
};

export {setFilterListener, SIMILAR_AD_COUNT};

