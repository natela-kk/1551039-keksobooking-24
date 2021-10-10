function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
function getRandomPositiveFloat (min, max, digits) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}

const TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_ARRAY = ['12:00', '13:00', '14:00'];
const CHECKOUT_ARRAY = ['12:00', '13:00', '14:00'];
const ALL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const ALL_PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

function generateFeatures(){
  const features = [];
  const newLength = getRandomInteger(1, ALL_FEATURES.length);
  for (let i = 0; i <= newLength; i++){
    const newFeature = ALL_FEATURES[getRandomInteger(1, ALL_FEATURES.length - 1)];
    if(!features.includes(newFeature)){
      features.push(newFeature);
    }
  } return features;
}

function generatePhotos(){
  const photos = [];
  const newLength = getRandomInteger(1, ALL_PHOTOS.length);
  for (let i = 0; i <= newLength; i++){
    const newPhoto = ALL_PHOTOS[getRandomInteger(1, ALL_PHOTOS.length - 1)];
    if(!photos.includes(newPhoto)){
      photos.push(newPhoto);
    }
  } return photos;
}


 function getAuthorUrl(id){
   const userID = String(id).padStart(2, 0);
   return `img/avatars/user${userID}.png`;
   };


const offer = {};

function createOffer(userID){
  offer.author = {
    avatar: getAuthorUrl(userID),
  };

  const location = {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
  };

  offer.location = location;

  offer.offer = {
    title: 'аренда жилья',
    adress: `${location.lat  }, ${  location.lng}`,
    price: getRandomInteger(0, 10000),
    type: TYPE_ARRAY[getRandomInteger(0, TYPE_ARRAY.length - 1)],
    rooms: getRandomInteger(1, 10),
    guests: getRandomInteger(1, 10),
    checkin: CHECKIN_ARRAY[getRandomInteger(0, CHECKIN_ARRAY.length - 1)],
    checkout: CHECKOUT_ARRAY[getRandomInteger(0, CHECKIN_ARRAY.length - 1)],
    features: generateFeatures(),
    description: 'Большое светлое помещение',
    photos: generatePhotos(),
  };
  return offer;
}



function getOffersArray() {
  const offers =[];
  for(let i = 1; i <= 10; i++){
    offers.push(createOffer(i));
  }
  return offers;
}
getOffersArray();
