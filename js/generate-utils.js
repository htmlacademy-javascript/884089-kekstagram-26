import {getRandomIntInclusive, getRandom} from './general-utils.js';
import {COUNT_FOTO_CARDS, MESAGGES, AUTHORS} from './data.js';

// Ф-я создания массива-объекта коментариев:
function getComments () {
  const comment = [];
  for(let j = 1; j < getRandomIntInclusive(1, 6); j++) {
    comment.push({id: j, avatar: `img/avatar-${ j }.svg`, message: getRandom(MESAGGES), name: getRandom(AUTHORS),});
  }
  return comment;
}

// Ф-я создания объекта фотокарточки
function createCard(i) {
  return {
    id: i,
    url: `photos/${  i  }.jpg`,
    description: 'Какое то фото..',
    likes: getRandomIntInclusive(15, 200),
    comments: getComments(),
  };
}
// Создания массива из 25 объектов фотокарточки:
const photoElements = [];
for(let i = 1; i <= COUNT_FOTO_CARDS; i++){
  photoElements.push(createCard(i));
}

export {photoElements};
