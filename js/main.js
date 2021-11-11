import {getData} from './server-requests.js';
import {setFilterListener} from './filter.js';
import {createPinMarkers} from './map.js';
import {sendSuccessData} from './form.js';
import {SIMILAR_AD_COUNT} from './filter.js';
import {adForm} from './form.js';
import './images.js';


const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelector('.map__filter');

const getErrorMessage = () => {
  const error = document.createElement('div');
  error.classList.add('catch-error');
  error.textContent = 'Ошибка получения данных';
  const main = document.querySelector('main');
  const promo = main.querySelector('.promo');
  main.insertBefore(error, promo);
};

const switchFilterState = (boolean) => {
  mapFilters.classList.toggle('ad-form--disabled', boolean);
  mapFilter.disabled = boolean;
};
const getSuccessData = (ads) => {
  createPinMarkers(ads.slice(0, SIMILAR_AD_COUNT));
  switchFilterState(false);
  setFilterListener(ads);
};
switchFilterState(true);
getData(getSuccessData, new FormData(adForm));
sendSuccessData();

export {getErrorMessage, mapFilters};
