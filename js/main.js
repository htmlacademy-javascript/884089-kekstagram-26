// developer.mozilla.org
// (Функция, возвращающая случайное целое число из переданного диапазона включительно).
function getRandomIntInclusive(min, max) {
  if(min < 0){
    throw new Error('Диапазон может быть только положительный, включая ноль');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomIntInclusive(0, 100);

// Функция для проверки максимальной длины строки.
function checkLength(string, maxlength) {
  return string.length < maxlength;
}
checkLength('new string', 4);
