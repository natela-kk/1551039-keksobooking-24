import {getRandomInteger, getRandomPositiveFloat} from './utils.js';

const ACCOMMODATION_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_OPTIONS = ['12:00', '13:00', '14:00'];
const CHECKOUT_OPTIONS = ['12:00', '13:00', '14:00'];
const ALL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const ALL_PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const generateFeatures = () => {
  const features = [];
  const newLength = getRandomInteger(1, ALL_FEATURES.length);
  for (let i = 0; i <= newLength; i++){
    const newFeature = ALL_FEATURES[getRandomInteger(1, ALL_FEATURES.length - 1)];
    if(!features.includes(newFeature)){
      features.push(newFeature);
    }
  }
  return features;
};

const generatePhotos = () => {
  const photos = [];
  const newLength = getRandomInteger(1, ALL_PHOTOS.length);
  for (let i = 0; i <= newLength; i++){
    const newPhoto = ALL_PHOTOS[getRandomInteger(1, ALL_PHOTOS.length - 1)];
    if(!photos.includes(newPhoto)){
      photos.push(newPhoto);
    }
  }
  return photos;
};


const getAuthorUrl = (id) => {
  const userID = String(id).padStart(2, 0);
  return `img/avatars/user${userID}.png`;
};

const createAnnouncement = (userID) => {
  const announcement = {};
  announcement.author = {
    avatar: getAuthorUrl(userID),
  };

  const location = {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
  };

  announcement.location = location;

  announcement.offer = {
    title: 'аренда жилья',
    address: `${location.lat}, ${location.lng}`,
    price: getRandomInteger(0, 10000),
    type: ACCOMMODATION_TYPES[getRandomInteger(0, ACCOMMODATION_TYPES.length - 1)],
    rooms: getRandomInteger(1, 10),
    guests: getRandomInteger(1, 10),
    checkin: CHECKIN_OPTIONS[getRandomInteger(0, CHECKIN_OPTIONS.length - 1)],
    checkout: CHECKOUT_OPTIONS[getRandomInteger(0, CHECKOUT_OPTIONS.length - 1)],
    features: generateFeatures(),
    description: 'Большое светлое помещение',
    photos: generatePhotos(),
  };
  return announcement;
};

const getAnnouncementsList = () => {
  const announcements =[];
  for(let i = 1; i <= 10; i++){
    announcements.push(createAnnouncement(i));
  }
  return announcements;
};
getAnnouncementsList();


export {getAnnouncementsList};
