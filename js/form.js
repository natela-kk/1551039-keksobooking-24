import {mainPinMarker} from './map.js';
import {map} from './map.js';
import {InitialCoordinates} from './map.js';
import {SCALE} from './map.js';
import {DIGITS} from './map.js';
import {sendData} from './server-requests.js';
const MIN_TITLE_LENGTH = 30;
const adForm = document.querySelector('.ad-form');
const controls = document.querySelectorAll('.ad-form-header, .ad-form__element');
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
  adForm.classList.toggle('ad-form--disabled', boolean);
  controls.forEach((fieldset) => {
    fieldset.disabled = boolean;
  });
};

const resetData = () => {
  map.setView({
    lat: InitialCoordinates.lat,
    lng: InitialCoordinates.lng,
  }, SCALE);
  mainPinMarker.setLatLng({
    lat: InitialCoordinates.lat,
    lng: InitialCoordinates.lng,
  });
  map.closePopup();
  adForm.reset();
  address.value = `${mainPinMarker.getLatLng().lat.toFixed(DIGITS)}, ${mainPinMarker.getLatLng().lng.toFixed(DIGITS)}`;
};

document.querySelector('.ad-form__reset').addEventListener('click', (evt) => {
  evt.preventDefault();
  resetData();
});

let message;
const closeMessageEscape = (evt) => {
  const key = evt.key;
  if (key === 'Escape') {
    message.remove();
    document.removeEventListener('keydown', closeMessageEscape);
  }
};

const closeMessage = () => {
  message.remove();
  document.removeEventListener('click', closeMessage);
};

const sendSuccessData = (response) => {
  if(response.status === 200) {
    message = successMessageTemplate.cloneNode(true);
    resetData();

  } else {
    message = errorMessageTemplate.cloneNode(true);
  }
  document.body.appendChild(message);
  document.addEventListener('keydown', closeMessageEscape);
  document.addEventListener('click', closeMessage);
};


title.addEventListener('input', () => {
  const titleLength = title.value.length;
  title.setCustomValidity(titleLength < MIN_TITLE_LENGTH ? `Ещё ${MIN_TITLE_LENGTH - titleLength} симв.` : '');
  title.reportValidity();
});

const validateRoomsCapacity = () => {
  guestsNumber.setCustomValidity('');
  if ((roomNumber.value !== '100' && (Number(guestsNumber.value) > Number(roomNumber.value) || guestsNumber.value === '0')) || (roomNumber.value === '100' && guestsNumber.value !== '0')) {
    guestsNumber.setCustomValidity('Неверное значение');
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

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData();
});
getPrice();
validateRoomsCapacity();
switchState(true);

export {switchState, adForm, sendSuccessData};

