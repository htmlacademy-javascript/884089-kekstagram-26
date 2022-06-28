import {mocks} from './mock-data.js';
// Константы найденых элеметов разметки шndex.html:
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
function getPictureCardTemplate(cardData) {
  const pictureCard = pictureTemplate.cloneNode(true);
  pictureCard.setAttribute('id', cardData.id);
  pictureCard.querySelector('.picture__img').src = cardData['url'];
  pictureCard.querySelector('.picture__likes').textContent = cardData['likes'];
  pictureCard.querySelector('.picture__comments').textContent = cardData.comments.length;
  return pictureCard;
}

// Функция, создания элемента разметки через шаблонную строку заполненого данными:
// 1 вариант function createElementComment (comments){
//   const item = `<li class="social__comment">
//     <img
//     class="social__picture"
//     src="${comments.avatar}"
//     alt="${comments.name}"
//     width="35" height="35">
//     <p class="social__text">${comments.message}</p>
//   </li>`;
//   return item;
// }
// 2 вариант(еле сделал)
function createElementComment ({avatar, name, message}){
  const item = `<li class="social__comment">
    <img
    class="social__picture"
    src="${avatar}"
    src="${avatar}"
    alt="${name}"
    width="35" height="35">
    <p class="social__text">${message}</p>
  </li>`;
  return item;
}

// Ф-я отрисовки маленьких карточек:
export function renderPictures(mocksArr){
  for(let j = 0; j < mocksArr.length; j++){
    const pictureData = getPictureCardTemplate(mocksArr[j]);
    pictures.append(pictureData);
  }
  return pictures;
}
// Ф-я отрисовки большой картинки:
function showBigPicture(data) {
  document.querySelector('body').classList.toggle('modal-open');
  bigPicture.classList.toggle('hidden');
  bigPictureCommentCount.classList.toggle('hidden');
  bigPictureCommentsLoader.classList.toggle('hidden');
  bigPictureCommentsList.textContent = '';
  bigPictureImg.src =  data.url;
  bigPictureLikes.textContent = data.likes;
  bigPictureDescription.textContent = data.description;
  bigPictureCommentsCount.textContent = data.comments.length;

  // console.log(data.comments);
  // Цикл отрисовки списка комментариев:
  for(let i = 0; i < data.comments.length; i++){
    // для первого варианта:
    // const temp = createElementComment(data.comments[i]);
    // для второго варианта:
    const {avatar, name, message} = data.comments[i];
    const temp = createElementComment({avatar, name, message});
    // console.log(temp);
    bigPictureCommentsList.insertAdjacentHTML('afterbegin', temp);
    // Почему не работает так ?
    // bigPictureCommentsList.appendChild(temp);
    // bigPictureCommentsList.textContent(temp);
  }
}
// Ф-я открытия большого изображения по клику на соотвествующее превью:
function onPicturesClick(evt){
  // console.log(evt.target.parentElement);
  const currentPicture = evt.target.parentElement;
  const pictureData = mocks.find((el)=>+currentPicture.id === +el.id);
  // console.log(pictureData);
  showBigPicture(pictureData);
  // console.log(mocks);
}

pictures.addEventListener('click', onPicturesClick);

// Ф-я на закрытие большого фото по клику на крестик:
function onCloseClick(){
  document.querySelector('body').classList.toggle('modal-open');
  bigPicture.classList.toggle('hidden');
  bigPictureCommentCount.classList.toggle('hidden');
  bigPictureCommentsLoader.classList.toggle('hidden');
}
// Ф-я на закрытие большого фото по клавише ESC:
function onPicturesKeydown(evt) {
  if(evt.keyCode === 27){
    document.querySelector('.big-picture').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    bigPictureCommentCount.classList.remove('hidden');
    bigPictureCommentsLoader.classList.remove('hidden');
  }
}

pictures.addEventListener('keydown', onPicturesKeydown);
bigPictureClose.addEventListener('click', onCloseClick);
