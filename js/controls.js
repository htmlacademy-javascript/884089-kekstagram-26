const groupScales = document.querySelector('.img-upload__scale');
const scaleSmaller =  groupScales.querySelector('.scale__control--smaller');
const scaleBigger =  groupScales.querySelector('.scale__control--bigger');
const inputScale = groupScales.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const MAX_STEP = 25;
let counterValue = 100;
// Ф-я маштабирования изображения:
function onChangeValue(evt){

  const target = evt.target;
  if(target.classList.contains('scale__control--smaller') && counterValue !== MAX_STEP){
    inputScale.value = `${counterValue - MAX_STEP  }%`;
    counterValue = counterValue - MAX_STEP;
  }

  if(target.classList.contains('scale__control--bigger') && counterValue !== 100){
    inputScale.value = `${counterValue + MAX_STEP  }%`;
    counterValue = counterValue + MAX_STEP;
  }
  imgUploadPreview.querySelector('img').style.transform = `scale(${counterValue / 100})`;
}

groupScales.addEventListener('click', onChangeValue);
