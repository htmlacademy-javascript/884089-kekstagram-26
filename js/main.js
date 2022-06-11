// developer.mozilla.org
// Функция, возвращающая случайное целое число из переданного диапазона включительно.
function getRandomIntInclusive(a, b) {
  if(a < 0){
    throw new Error('Диапазон может быть только положительный, включая ноль');
  }
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Функция для проверки максимальной длины строки.
function checkLength(string, maxlength) {
  return string.length < maxlength;
}

checkLength('new string', 4);

// Число сгенерированных объектов:
const COUNT_FOTO_CARDS = 25;

const MESAGGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const AUTHORS = [
  'Вася Пупкин',
  'Дюша Метёлкин',
  'Иван Василич',
  'Товарищ Саахов',
  'Шурик',
  'Тапок Убийца'
];

// Ф-я получения индекса элемента:
function getRandom (elements) {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
}

// Ф-я создания объекта фотокарточки
function createCard() {
  return {
    id: getRandomIntInclusive(1, 25),
    url: `photos/${  getRandomIntInclusive(1, 25)  }.jpg`,
    description: 'Какое то фото..',
    likes: getRandomIntInclusive(15, 200),
    comments: [
      {
        id:getRandomIntInclusive(1, 100),
        avatar: `img/avatar-${ getRandomIntInclusive(1, 6) }.svg`,
        message: getRandom(MESAGGES),
        name: getRandom(AUTHORS),
      },
      {
        id:getRandomIntInclusive(1, 100),
        avatar: `img/avatar-${ getRandomIntInclusive(1, 6) }.svg`,
        message: getRandom(MESAGGES),
        name: getRandom(AUTHORS),
      },
      {
        id:getRandomIntInclusive(1, 100),
        avatar: `img/avatar-${ getRandomIntInclusive(1, 6) }.svg`,
        message: getRandom(MESAGGES),
        name: getRandom(AUTHORS),
      },
      {
        id:getRandomIntInclusive(1, 100),
        avatar: `img/avatar-${ getRandomIntInclusive(1, 6) }.svg`,
        message: getRandom(MESAGGES),
        name: getRandom(AUTHORS),
      },
    ],
  };
}

// eslint-disable-next-line no-unused-vars
const listElemets = Array.from({length: COUNT_FOTO_CARDS}, createCard);
