// developer.mozilla.org
// (Функция, возвращающая случайное целое число из переданного диапазона включительно).
function getRandomIntInclusive(min, max) {
  if(min < 0){
    // alert('Диапазон может быть только положительный, включая ноль');
    return false;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomIntInclusive(0, 100);

// Функция для проверки максимальной длины строки.
function getLeng(string, maxlength) {
  if(string.length > maxlength){
    // alert('Комментарий не проходит по длине');
    return false;
  }
  // alert('Комментарий проходит по длине');
  return true;
}
getLeng('new string', 4);
