import {mainPinMarker} from './map.js';
import {map} from './map.js';
import {TokyoCoordinates} from './map.js';
import {SCALE} from './map.js';
import {DIGITS} from './map.js';
const MIN_TITLE_LENGTH = 30;
const ad = document.querySelector('.ad-form');
const controls = document.querySelectorAll('.ad-form-header, .ad-form__element, .map__filter');
const mapFilters = document.querySelector('.map__filters');
const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');
const title = document.querySelector('#title');
const roomNumber = document.querySelector('#room_number');
const guestsNumber = document.querySelector('#capacity');
const price = document.querySelector('#price');
const type = document.querySelector('#type');
const address = document.querySelector('#address');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const TypePrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const switchState = (boolean) => {
  ad.classList.toggle('ad-form--disabled', boolean);
  mapFilters.classList.toggle('ad-form--disabled', boolean);
  controls.forEach((fieldset) => {
    fieldset.disabled = boolean;
  });
};

const resetData = () => {
  map.setView({
    lat: TokyoCoordinates.lat,
    lng: TokyoCoordinates.lng,
  }, SCALE);
  mainPinMarker.setLatLng({
    lat: TokyoCoordinates.lat,
    lng: TokyoCoordinates.lng,
  });
  map.closePopup();
  ad.reset();
  address.value = `${mainPinMarker.getLatLng().lat.toFixed(DIGITS)}, ${mainPinMarker.getLatLng().lng.toFixed(DIGITS)}`;
};

ad.addEventListener('reset', (evt) => {
  evt.preventDefault();
  resetData();
});
// document.querySelector('.ad-form__reset').addEventListener('click', () => {
//   ad.reset();

// });

const showMessage = (response) => {
  let message;
  if(response.status === 200) {
    message = successMessageTemplate.cloneNode(true);
    // ad.reset();
    resetData();

  } else {
    message = errorMessageTemplate.cloneNode(true);
  }
  document.body.appendChild(message);
  document.addEventListener('keydown', (evt) => {
    const key = evt.key;
    if (key === 'Escape') {
      message.remove();
    }
  });
  document.body.addEventListener('click', () => {
    message.remove();
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

const getPrice = () => {
  price.placeholder = TypePrice[type.value];
  price.min = TypePrice[type.value];
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
switchState(true);

export {switchState, ad, showMessage};

