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


const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const title = document.querySelector('#title');

title.addEventListener('input', () => {
  const titleLength = title.value.length;

  if (titleLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
  } else if (titleLength > MAX_TITLE_LENGTH) {
    title.setCustomValidity(`Удалите лишние ${  titleLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
});

const roomNumber = document.querySelector('#room_number');
const guestsNumber = document.querySelector('#capacity');

const validateRoomsCapacity = () => {
  if ((roomNumber.value !== '100' && (Number(guestsNumber.value) > Number(roomNumber.value) || guestsNumber.value === '0')) || (roomNumber.value === '100' && guestsNumber.value !== '0')) {
    guestsNumber.setCustomValidity('Неверное значение');
  } else {
    guestsNumber.setCustomValidity('');
  }
  guestsNumber.reportValidity();
};
validateRoomsCapacity();

guestsNumber.addEventListener('change', () => {
  validateRoomsCapacity();
});

export {switchState};
