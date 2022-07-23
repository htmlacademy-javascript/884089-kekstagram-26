import {renderPictures} from './render.js';
import {getRandomIntInclusive} from './util.js';
const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFiltersButtons = imgFiltersForm.querySelectorAll('.img-filters__button');
let arrayPreview = [];
const compareCommentsLength = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;
// console.log(arrayPreview.sort());
// const debounce = (callback, timeoutDelay = 500) => {
//   let timeoutId;
//   return (...rest) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
//   };
// };

const getRandomTen = (data) => {
  const newArr = new Set();
  for (let i = 0; newArr.size < 10; i++) {
    newArr.add(data[getRandomIntInclusive(0, data.length - 1)]);
  }
  return Array.from(newArr);
};

export function saveArrayPreview(takeData){
  arrayPreview = takeData;
  console.log(arrayPreview);
}

// Ф-я смены состояния фильтра:
export function changeFilterStatus(filterTarget){
  for(const imgFiltersButton of imgFiltersButtons){
    imgFiltersButton.classList.remove('img-filters__button--active');
  }
  if(filterTarget.id === 'filter-default'){
    document.querySelectorAll('.picture').forEach((elem)=>{
      elem.remove();
    });
    renderPictures(arrayPreview);
  }
  if(filterTarget.id === 'filter-random'){
    document.querySelectorAll('.picture').forEach((elem)=>{
      elem.remove();
    });
    renderPictures(getRandomTen(arrayPreview));
  }
  if(filterTarget.id === 'filter-discussed'){
    document.querySelectorAll('.picture').forEach((elem)=>{
      elem.remove();
    });
    // for(let i = 0; i < arrayPreview.length; i++){
    //   if(arrayPreview[0].comments.length < arrayPreview[i].comments.length)
    //   {arrayPreview[0].comments.length = arrayPreview[i].comments.length;}
    // }
    // return arrayPreview.slice().sort(compareCommentsLength);
    renderPictures(arrayPreview.slice().sort(compareCommentsLength));
  }
  filterTarget.classList.add('img-filters__button--active');
}
// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example


imgFiltersForm.addEventListener('click',(evt)=>{
  const filterTarget = evt.target;
  changeFilterStatus(filterTarget);
  // debounce (changeFilterStatus(filterTarget));
});
// debounce(changeFilterStatus(filterTarget));
// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example


