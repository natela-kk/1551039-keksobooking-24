const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.children;
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersSelects =  mapFiltersForm.children;

const switchFormState = (boolean) => {
  adForm.classList.toggle('ad-form--disabled', boolean);
  adFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = boolean;
  });
  mapFiltersSelects.forEach((select) => {
    select.disabled = boolean;
  });
};

export {switchFormState};
