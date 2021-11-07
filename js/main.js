import {createPinMarker} from './map.js';
// import {setUserFormSubmit} from './form';

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

// setUserFormSubmit();

// setUserFormSubmit(console.log('kek'));
