const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

// const bigPicture = document.querySelector('.big-picture');
// const bigPictureClose = document.querySelector('.big-picture__cancel');
// const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
// const bigPictureLikes = bigPicture.querySelector('.likes-count');
// const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');

// Комментарии к изображению:
// const bigPictureCommentsList = bigPicture.querySelector('.social__comments');


// Функция, заполняющая шаблон фотокарточки данными:
export function getPictureCardTemplate(cardData) {
  const pictureCard = pictureTemplate.cloneNode(true);
  pictureCard.querySelector('.picture__img').src = cardData['url'];
  pictureCard.querySelector('.picture__likes').textContent = cardData['likes'];
  pictureCard.querySelector('.picture__comments').textContent = cardData.comments.length;
  return pictureCard;
}
// const createElem = function(comment){
//   const text =document.createElement('p');
//   text.classList.add('social__text');
//   text.textContent = comment['message'];
//   const img = document.createElement('img');
//   img.classList.add('social__picture');
//   img.src = comment['avatar'];
//   const item = document.createElement('li');
//   item.classList.add('social__comment');
//   item.append(img,text);
//   return item;
// };
// console.log(createElem());

// Функция, отрисовывающая фотокарточки на страницу:

export function renderPictureCards(mocksArr, fnFillTemplate) {
  const fotoValue = mocksArr();
  for(let j = 0; j < fotoValue.length; j++){
    const pictureDate = fnFillTemplate(fotoValue[j]);
    // Обработчики на открытие большого фото:
    // pictureDate.addEventListener('click', ()=> {
    //   bigPicture.classList.remove('hidden');
    //   bigPictureCommentsList.textContent = '';
    //   bigPictureImg.src =  fotoValue[j].url;
    //   bigPictureLikes.textContent = fotoValue[j].likes;
    //   bigPictureCommentsCount.textContent = fotoValue[j].comments.length;
    //   for(let k = 0; k < fotoValue[j].comments.length; k++) {
    //     bigPictureCommentsList.append(createElem(fotoValue[j].comments[j]));
    //   }
    // });
    // console.log(fotoValue[j]);
    // console.log(pictureDate);
    pictures.append(pictureDate);
  }
  return pictures;
}

// Обработчики на закрытие большого фото:
// bigPictureClose.addEventListener('click', ()=> {
//   bigPicture.classList.add('hidden');
// });
// -----------------------------------------------------------------------------------------
// export {valueMocks};
// export {pictures};
// export {bigPictureImg};
