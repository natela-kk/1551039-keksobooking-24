import {getErrorMessage} from './main.js';

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
const sendData = (onSuccess, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {method: 'POST', body})
    .then((response) => {
      onSuccess(response);
    });
};

export {getData, sendData};
