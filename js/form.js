const adForm = document.querySelector('.ad-form');
const controls = document.querySelectorAll('.ad-form-header', '.ad-form__element', '.map__filter');
const mapFiltersForm = document.querySelector('.map__filters');

const switchFormState = (boolean) => {
  adForm.classList.toggle('ad-form--disabled', boolean);
  mapFiltersForm.classList.toggle('ad-form--disabled', boolean);
  controls.forEach((fieldset) => {
    fieldset.disabled = boolean;
  });
};

export {switchFormState};
