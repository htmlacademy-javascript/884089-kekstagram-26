import {mocks} from './mock-data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
//Ф-ия генерации объектов фотокарточки из модуля mock-data.js:
const valueMocks = mocks();
//Ф-ия отрисовки фотокарточек на странице с использованием данных из ф-и генерации:
valueMocks.forEach(({url,likes,comments})=>{
  const pictureCard = pictureTemplate.cloneNode(true);
  pictureCard.querySelector('.picture__img').src = url;
  pictureCard.querySelector('.picture__likes').textContent = likes;
  pictureCard.querySelector('.picture__comments').textContent = comments.length;
  pictures.append(pictureCard);
});

export {valueMocks};
export {pictures};

