import {getAnnouncementsList} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarAnnouncments = getAnnouncementsList();
const cardsList = document.querySelector('.map__canvas');
const renderOffer = () => {
  const cardElement = cardTemplate.cloneNode(true);
  const offer = similarAnnouncments[1].offer;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  if (!offer.address || !offer.address.length) {
    cardElement.querySelector('.popup__text--address').classList.add('hidden');
  } else { cardElement.querySelector('.popup__text--address').textContent = offer.address;
  }
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;

  const getOfferType = () => {
    switch (offer.type) {
      case 'flat':
        return 'Квартира';
      case 'bungalow':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      case 'hotel':
        return 'Отель';
    }
  };
  if (!offer.type || !offer.type.length) {
    cardElement.querySelector('.popup__type').classList.add('hidden');
  } else { cardElement.querySelector('.popup__type').textContent = getOfferType();
  }
  if (!offer.rooms || !offer.rooms || !offer.guests ||!offer.guests.length) {
    cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
  } else { cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }
  if (!offer.checkin || !offer.checkin.length || !offer.checkout || !offer.checkout.length) {
    cardElement.querySelector('.popup__text--time').classList.add('hidden');
  } else { cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  }
  if (!offer.features || !offer.features.length){
    cardElement.querySelector('.popup__features').classList.add('hidden');
  } else {cardElement.querySelector('.popup__features').textContent = offer.features;
  }
  if (!offer.description || !offer.description.length) {
    cardElement.querySelector('.popup__description').classList.add('hidden');
  } else {cardElement.querySelector('.popup__description').textContent = offer.description;
  }

  const getPopupPhotos = () => offer.photos.reduce((previous, current) =>
    `${previous}<img src="${current}" class="popup__photo" width="45" height="40" alt="Фотография жилья"> `, '');

  if (!offer.photos || !offer.photos.length) {
    cardElement.querySelector('.popup__photos').classList.add('hidden');
  } else {cardElement.querySelector('.popup__photos').innerHTML = getPopupPhotos();
  }
  if (!similarAnnouncments[1].author.avatar || !similarAnnouncments[1].author.avatar.length) {
    cardElement.querySelector('.popup__avatar').classList.add('hidden');
  } else {cardElement.querySelector('.popup__avatar').src = similarAnnouncments[1].author.avatar;
  }
  cardsList.appendChild(cardElement);
};
renderOffer();
export {cardsList};
