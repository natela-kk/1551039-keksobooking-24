const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const OfferTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const getPopupPhotos = (announcement) => announcement.offer.photos.reduce((previous, current) =>
  `${previous}<img src="${current}" class="popup__photo" width="45" height="40" alt="Фотография жилья"> `, '');

const render = (announcement) => {
  const cardElement = cardTemplate.cloneNode(true);
  const offer = announcement.offer;
  const popupAddress = cardElement.querySelector('.popup__text--address');
  const popupDescription = cardElement.querySelector('.popup__description');
  const popupPhotos = cardElement.querySelector('.popup__photos');
  const popupAvatar = cardElement.querySelector('.popup__avatar');
  cardElement.querySelector('.popup__title').textContent = offer.title;

  if (!offer.address || !offer.address.length) {
    popupAddress.classList.add('hidden');
  } else {
    popupAddress.textContent = offer.address;
  }

  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = OfferTypes[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if (!offer.features || !offer.features.length){
    cardElement.querySelector('.popup__features').classList.add('hidden');
  } else {
    const featuresList = cardElement.querySelectorAll('.popup__feature');
    featuresList.forEach((feature) => {
      const isNecessary =  offer.features.some((offerFeature) => feature.classList.contains(`popup__feature--${offerFeature}`));

      if(!isNecessary){
        feature.remove();
      }
    });
  }
  if (!offer.description || !offer.description.length) {
    popupDescription.classList.add('hidden');
  } else {
    popupDescription.textContent = offer.description;
  }

  if (!offer.photos || !offer.photos.length) {
    popupPhotos.classList.add('hidden');
  } else {
    popupPhotos.innerHTML = getPopupPhotos(announcement);
  }

  if (!announcement.author.avatar || !announcement.author.avatar.length) {
    popupAvatar.classList.add('hidden');
  } else {
    popupAvatar.src = announcement.author.avatar;
  }
  return cardElement;
};
export {render};
