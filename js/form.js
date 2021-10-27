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
const gestsNumber = document.querySelector('#capacity');
const gestOptions = gestsNumber.querySelectorAll('option');
roomNumber.addEventListener('change', () => {
  if (roomNumber.value === '3') {
    gestOptions.forEach((option) => {
      option.disabled = false;
      if (option.value === '0') {
        option.disabled = true;
      }
    });
  } else if (roomNumber.value === '2') {
    gestOptions.forEach((option) => {
      option.disabled = false;
      if (option.value === '0' || option.value === '3') {
        option.disabled = true;
      }
    });
  } else if (roomNumber.value === '1') {
    gestOptions.forEach((option) => {
      option.disabled = false;
      if (option.value === '3' || option.value === '2' || option.value === '0') {
        option.disabled = true;
      }
    });
  } else if (roomNumber.value === '100') {
    gestOptions.forEach((option) => {
      option.disabled = false;
      if (option.value === '3' || option.value === '2' || option.value === '1') {
        option.disabled = true;
      }
    });
  }
});

export {switchState};
