const groupScales = document.querySelector('.img-upload__scale');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const inputScale = groupScales.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const MAX_STEP = 25;
let counterValue = 100;
const effectList = document.querySelector('.effects__list');


// Ф-я наложения фильтров на изображение:
function onChangeFilter(evt){
  const target = evt.target;
  if(target.id === 'effect-none'){
    imgUploadPreview.querySelector('img').removeAttribute('class');
    imgUploadEffectLevel.classList.add('hidden');
  } else {
    imgUploadEffectLevel.classList.remove('hidden');
  }
  if(target.id === 'effect-chrome'){
    imgUploadPreview.querySelector('img').removeAttribute('class');
    imgUploadPreview.querySelector('img').classList.add('effects__preview--chrome');
  }
  if(target.id === 'effect-sepia'){
    imgUploadPreview.querySelector('img').removeAttribute('class');
    imgUploadPreview.querySelector('img').classList.add('effects__preview--sepia');
  }
  if(target.id === 'effect-marvin'){
    imgUploadPreview.querySelector('img').removeAttribute('class');
    imgUploadPreview.querySelector('img').classList.add('effects__preview--marvin');
  }
  if(target.id === 'effect-phobos'){
    imgUploadPreview.querySelector('img').removeAttribute('class');
    imgUploadPreview.querySelector('img').classList.add('effects__preview--phobos');
  }
  if(target.id === 'effect-heat'){
    imgUploadPreview.querySelector('img').removeAttribute('class');
    imgUploadPreview.querySelector('img').classList.add('effects__preview--heat');
  }
}

effectList.addEventListener('change', onChangeFilter);

// Ф-я маштабирования изображения:
function onChangeScale(evt){

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

groupScales.addEventListener('click', onChangeScale);
