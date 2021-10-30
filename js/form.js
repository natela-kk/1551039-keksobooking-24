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
const title = document.querySelector('#title');

title.addEventListener('input', () => {
  const titleLength = title.value.length;

  if (titleLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
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


guestsNumber.addEventListener('change', () => {
  validateRoomsCapacity();
});
roomNumber.addEventListener('change', () => {
  validateRoomsCapacity();
});

const price = document.querySelector('#price');
const type = document.querySelector('#type');


type.addEventListener('change', () => {
  if (type.value === 'bungalow') {
    price.setAttribute('min', 0);
    price.setAttribute('placeholder', 0);
  } else if (type.value === 'flat') {
    price.setAttribute('min', 1000);
    price.setAttribute('placeholder', 1000);
  } else if (type.value === 'hotel') {
    price.setAttribute('min', 3000);
    price.setAttribute('placeholder', 3000);
  } else if (type.value === 'house') {
    price.setAttribute('min', 5000);
    price.setAttribute('placeholder', 5000);
  } else if (type.value === 'palace') {
    price.setAttribute('min', 10000);
    price.setAttribute('placeholder', 10000);
  }
  price.reportValidity();
});

const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');

checkIn.addEventListener('change', () => {
  checkOut.value = checkIn.value;
});
checkOut.addEventListener('change', () => {
  checkIn.value = checkOut.value;
});
if (type.value === 'flat') {
  price.setAttribute('min', 1000);
}
validateRoomsCapacity();

export {switchState};
