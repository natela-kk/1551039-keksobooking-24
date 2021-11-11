import {getErrorMessage} from './main.js';
const formData = new FormData(evt.target);
const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => {
      getErrorMessage();
    });
};
const sendData = (onSuccess) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      onSuccess(response);
    });
};

export {getData, sendData};
