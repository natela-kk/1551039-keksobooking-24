const ad = document.querySelector('.ad-form');
const controls = document.querySelectorAll('.ad-form-header, .ad-form__element, .map__filter');
const mapFilters = document.querySelector('.map__filters');
const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');
const MIN_TITLE_LENGTH = 30;
const title = document.querySelector('#title');
const roomNumber = document.querySelector('#room_number');
const guestsNumber = document.querySelector('#capacity');
const price = document.querySelector('#price');
const type = document.querySelector('#type');

const switchState = (boolean) => {
  ad.classList.toggle('ad-form--disabled', boolean);
  mapFilters.classList.toggle('ad-form--disabled', boolean);
  controls.forEach((fieldset) => {
    fieldset.disabled = boolean;
  });
};

title.addEventListener('input', () => {
  const titleLength = title.value.length;

  if (titleLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
});

const validateRoomsCapacity = () => {
  if ((roomNumber.value !== '100' && (Number(guestsNumber.value) > Number(roomNumber.value) || guestsNumber.value === '0')) || (roomNumber.value === '100' && guestsNumber.value !== '0')) {
    guestsNumber.setCustomValidity('Неверное значение');
  } else {
    guestsNumber.setCustomValidity('');
  }
  guestsNumber.reportValidity();
};

guestsNumber.addEventListener('change', () => {
  validateRoomsCapacity();
});
roomNumber.addEventListener('change', () => {
  validateRoomsCapacity();
});

const typePrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const getPrice = () => {
  price.placeholder = typePrice[type.value];
  price.min = typePrice[type.value];
  price.reportValidity();
};
type.addEventListener('change', () => {
  getPrice();
});

checkIn.addEventListener('change', () => {
  checkOut.value = checkIn.value;
});
checkOut.addEventListener('change', () => {
  checkIn.value = checkOut.value;
});
getPrice();
validateRoomsCapacity();

export {switchState};
