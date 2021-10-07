function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
function getRandomPositiveFloat (a, b, digits) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}

const typeArray = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkinArray = ['12:00', '13:00', '14:00'];
const checkoutArray = ['12:00', '13:00', '14:00'];
const allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const features = [];
function getRandomFeaturesArray(){
  while(features.length < getRandomPositiveInteger(1, allFeatures.length)){
    features.push(allFeatures[getRandomPositiveInteger (0, allFeatures.length - 1)]);
  }
  return features;
}
const allPhotos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const photos = [];
function getRandomPhotosArray(){
  while(photos.length < getRandomPositiveInteger(1, allPhotos.length)){
    photos.push(allPhotos[getRandomPositiveInteger (0, allPhotos.length - 1)]);
  }
  return photos;
}
function getAvatarNumber(){
  const number = getRandomPositiveInteger(1, 10)
  if(number < 10){
    return '0' + number;
  } return number;
}

const object = {};

function UserAdd(){
  object.author = {
    avatar: 'img/avatars/user' + getAvatarNumber() + '.png',
  };

  const location = {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
  };

  object.location = location;

  object.offer = {
    title: 'аренда жилья',
    adress: location.lat + ', ' + location.lng,
    price: getRandomPositiveInteger(0, 10000),
    type: typeArray[getRandomPositiveInteger(0, typeArray.length - 1)],
    rooms: getRandomPositiveInteger(1, 10),
    guests: getRandomPositiveInteger(1, 10),
    checkin: checkinArray[getRandomPositiveInteger(0, checkinArray.length - 1)],
    checkout: checkoutArray[getRandomPositiveInteger(0, checkinArray.length - 1)],
    features: getRandomFeaturesArray(),
    description: 'Большое, светлое помещение',
    photos: getRandomPhotosArray(),
  };
  return object;
}

const array =[];

function getNewArray() {
  while(array.length <= 10){
    array.push(UserAdd());
  }
  return array;
}

getNewArray();

