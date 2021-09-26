function getRandomInt(min, max){
  if(min >= 0 && max > min){
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  window.console.warn('Указан неверный диапазон');
  return false;
}
getRandomInt();

function getRandomFraction(min, max, digitsNumber){
  if(min >= 0 && max > min){
    return ((Math.random() * (max - min + 1) + min)).toFixed(digitsNumber);
  }
  window.console.warn('Указан неверный диапазон');
  return false;
}

getRandomFraction();

// Источники:
// 1. https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// 2. https://htmler.ru/2014/08/14/javascript-kolichestvo-znakov-posle-zapyatoy/#:~:text=toFixed%20%E2%80%94%20%D1%8D%D1%82%D0%BE%20%D0%B2%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9%20%D0%B2,%2F%2Fnum_str%3D1538%3B%20num_str%3Dnum.toFixed(2)%3B%20%2F%2Fnum_str%3D1538.98%3B%20num_str%3Dnum.toFixed(5)%3B%20%2F%2Fnum_str%3D1538.98912
