import {renderPictures} from './render.js';
import {getRandomIntInclusive} from './util.js';
const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFiltersButtons = imgFiltersForm.querySelectorAll('.img-filters__button');
const COUNT_RANDOM_FOTO = 10;
let arrayPreview = [];
const compareCommentsLength = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const getRandomTen = (data) => {
  const newArr = new Set();
  for (let i = 0; newArr.size < COUNT_RANDOM_FOTO; i++) {
    newArr.add(data[getRandomIntInclusive(0, data.length - 1)]);
  }
  return Array.from(newArr);
};

export function saveArrayPreview(takeData){
  arrayPreview = takeData;
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
    renderPictures(arrayPreview.slice().sort(compareCommentsLength));
  }
  filterTarget.classList.add('img-filters__button--active');
}

imgFiltersForm.addEventListener('click',debounce((evt)=>{
  const filterTarget = evt.target;
  changeFilterStatus(filterTarget);
}));

