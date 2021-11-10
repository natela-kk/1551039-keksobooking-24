import {createPinMarkers} from './map.js';
import {SIMILAR_AD_COUNT} from './server-requests.js';
const filterForm = document.querySelector('.map__filters');
const type = filterForm.querySelector('#housing-type');
const price = filterForm.querySelector('#housing-price');
// const roomsNumber = filterForm.querySelector('#housing-rooms');
// const guestsNumber = filterForm.querySelector('#housing-guests');
// const features = filterForm.querySelector('#housing-features');
const priceValue = {
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

const filterOffers = (ads) => {
  type.addEventListener('change', () => {
    if (type.value === 'any') {
      createPinMarkers(ads.slice(0, SIMILAR_AD_COUNT));
    } else {
      const filteredAds = ads.filter((ad) => ad.offer.type === type.value);
      createPinMarkers(filteredAds.slice(0, SIMILAR_AD_COUNT));
    }
  });
  // price.addEventListener('change', () => {
  //   ads.forEach((ad) => {
  //     if(price.value === 'middle') {
  //       if(){}

  //     }
  //   });
  // });
};
export {filterOffers};

