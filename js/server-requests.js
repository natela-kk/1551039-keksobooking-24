import {createPinMarker} from './map.js';
import {ad} from './form.js';
import {showMessage} from './form.js';

fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((announcement) => {
      createPinMarker(announcement);
    });
  })
  .catch(() => {
    const error = document.createElement('div');
    error.classList.add('catch-error');
    error.textContent = 'Ошибка получения данных';
    const main = document.querySelector('main');
    const promo = main.querySelector('.promo');
    main.insertBefore(error, promo);
  });

ad.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      showMessage(response);
    });
});
