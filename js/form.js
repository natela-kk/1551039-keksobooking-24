const ad = document.querySelector('.ad-form');
const controls = document.querySelectorAll('.ad-form-header, .ad-form__element, .map__filter');
const mapFilters = document.querySelector('.map__filters');

const switchState = (boolean) => {
  ad.classList.toggle('ad-form--disabled', boolean);
  mapFilters.classList.toggle('ad-form--disabled', boolean);
  controls.forEach((fieldset) => {
    fieldset.disabled = boolean;
  });
};

export {switchState};
