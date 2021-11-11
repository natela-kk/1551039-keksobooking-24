import {createPinMarkers} from './map.js';
import {adForm} from './form.js';
import {showMessage} from './form.js';
import {setFilterListener} from './filter.js';
const SIMILAR_AD_COUNT = 10;
const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelector('.map__filter');
const switchFilterState = (boolean) => {
  mapFilters.classList.toggle('ad-form--disabled', boolean);
  mapFilter.disabled = boolean;
};
const getErrorMessage = () => {
  const error = document.createElement('div');
  error.classList.add('catch-error');
  error.textContent = 'Ошибка получения данных';
  const main = document.querySelector('main');
  const promo = main.querySelector('.promo');
  main.insertBefore(error, promo);
};
switchFilterState(true);
fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((ads) => {
    createPinMarkers(ads.slice(0, SIMILAR_AD_COUNT));
    switchFilterState(false);
    setFilterListener(ads);
  })
  .catch(() => {
    getErrorMessage();
  });

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      showMessage(response);
    });
});
export {SIMILAR_AD_COUNT};
export {mapFilters};
