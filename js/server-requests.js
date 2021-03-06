import {getErrorMessage} from './main.js';

const API_URL = 'https://24.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(`${API_URL}/data`)
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => {
      getErrorMessage();
    });
};
const sendData = (onSuccess, body) => {
  fetch(API_URL, {method: 'POST', body})
    .then((response) => {
      onSuccess(response);
    });
};

export {getData, sendData};
