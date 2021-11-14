import './map.js';

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

switchFilterState(true);

export {getErrorMessage, mapFilters, mapFilter, switchFilterState};
