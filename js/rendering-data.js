const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCommentCount = bigPicture.querySelector('.social__comment-count');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

// Комментарии к изображению:
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');


// Функция, заполняющая шаблон фотокарточки данными:
export function getPictureCardTemplate(cardData) {
  const pictureCard = pictureTemplate.cloneNode(true);
  pictureCard.querySelector('.picture__img').src = cardData['url'];
  pictureCard.querySelector('.picture__likes').textContent = cardData['likes'];
  pictureCard.querySelector('.picture__comments').textContent = cardData.comments.length;
  return pictureCard;
}
const createElem = function(comments){
  const items = [];
  for(let k = 0;k < comments.length; k++){
    const text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = comments[k].message;
    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comments[k].avatar;
    img.alt = comments[k].name;
    const item = document.createElement('li');
    item.classList.add('social__comment');
    item.append(img,text);
    items.push(item);
  }
  return items;
};

// Функция, отрисовывающая фотокарточки на страницу:

export function renderPictureCards(mocksArr, fnFillTemplate) {
  const fotoValue = mocksArr();
  for(let j = 0; j < fotoValue.length; j++){
    const pictureDate = fnFillTemplate(fotoValue[j]);
    // console.log(fotoValue[j]);
    // Обработчики на открытие большого фото:
    pictureDate.addEventListener('click', ()=> {
      document.querySelector('body').classList.toggle('modal-open');
      bigPicture.classList.toggle('hidden');
      bigPictureCommentCount.classList.toggle('hidden');
      bigPictureCommentsLoader.classList.toggle('hidden');
      bigPictureCommentsList.textContent = '';
      bigPictureImg.src =  fotoValue[j].url;
      bigPictureLikes.textContent = fotoValue[j].likes;
      bigPictureDescription.textContent = fotoValue[j].description;
      bigPictureCommentsCount.textContent = fotoValue[j].comments.length;
      // bigPictureImg.src =  pictureDate.querySelector('.picture__img').src;
      // bigPictureLikes.textContent = pictureDate.querySelector('.picture__info').querySelector('.picture__likes').textContent;
      // bigPictureCommentsCount.textContent = pictureDate.querySelector('.picture__info').querySelector('.picture__comments').textContent;
      const temp = createElem(fotoValue[j].comments);
      // console.log(temp[0]);
      for(let i = 0; i < temp.length; i++){
        bigPictureCommentsList.append(temp[i]);
        // console.log(temp[i]);
      }

      document.addEventListener('keydown', (evt)=> {
        if(evt.keyCode===27){
          document.querySelector('body').classList.toggle('modal-open');
          bigPicture.classList.toggle('hidden');
          bigPictureCommentCount.classList.toggle('hidden');
          bigPictureCommentsLoader.classList.toggle('hidden');
        }
      });
    });
    pictures.append(pictureDate);

    // console.log(pictureDate);
  }
  return pictures;
}

// Обработчики на закрытие большого фото:
bigPictureClose.addEventListener('click', ()=> {
  document.querySelector('body').classList.toggle('modal-open');
  bigPicture.classList.toggle('hidden');
  bigPictureCommentCount.classList.toggle('hidden');
  bigPictureCommentsLoader.classList.toggle('hidden');
});
