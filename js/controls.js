const groupScales = document.querySelector('.img-upload__scale');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const inputEffectLevelValue = imgUploadEffectLevel.querySelector('.effect-level__value');
const sliderEffectLevel = imgUploadEffectLevel.querySelector('.effect-level__slider');
const inputScale = groupScales.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectList = document.querySelector('.effects__list');
const MAX_STEP = 25;
let counterValue = 100;


noUiSlider.create(sliderEffectLevel, {
  start: [100],
  step: 1,
  range: {
    'min': [0],
    'max': [100]
  }
});

// Ф-я работы слайдера интенсивности фильтров:
sliderEffectLevel.noUiSlider.on('update', (values, handle)=> {
  inputEffectLevelValue.value = values[handle];
  for(const effectItem of effectList.children) {

    if(effectItem.querySelector(':checked') && effectItem.querySelector(':checked').value === 'chrome'){
      imgUploadPreview.style.filter = `grayscale(${inputEffectLevelValue.value / 100})`;
    }
    if(effectItem.querySelector(':checked') && effectItem.querySelector(':checked').value === 'sepia'){
      imgUploadPreview.style.filter = `sepia(${inputEffectLevelValue.value / 100})`;
    }
    if(effectItem.querySelector(':checked') && effectItem.querySelector(':checked').value === 'marvin'){
      imgUploadPreview.style.filter = `invert(${inputEffectLevelValue.value}%)`;
    }
    if(effectItem.querySelector(':checked') && effectItem.querySelector(':checked').value === 'phobos'){
      imgUploadPreview.style.filter = `blur(${(inputEffectLevelValue.value / 100) * 3}px)`;
    }
    if(effectItem.querySelector(':checked') && effectItem.querySelector(':checked').value === 'heat'){
      imgUploadPreview.style.filter = `brightness(${inputEffectLevelValue.value / 100})`;
    }
  }
});


// Ф-я наложения фильтров на изображение:
function onChangeFilter(evt){
  const target = evt.target;
  imgUploadPreview.removeAttribute('style');
  imgUploadPreview.style.transform = `scale(${counterValue / 100})`;
  sliderEffectLevel.noUiSlider.set(100);
  if(target.id === 'effect-none'){
    imgUploadPreview.removeAttribute('class');
    imgUploadEffectLevel.classList.add('hidden');
  } else {
    imgUploadEffectLevel.classList.remove('hidden');
  }
  if(target.id === 'effect-chrome'){
    imgUploadPreview.removeAttribute('class');
    imgUploadPreview.classList.add('effects__preview--chrome');
  }
  if(target.id === 'effect-sepia'){
    imgUploadPreview.removeAttribute('class');
    imgUploadPreview.classList.add('effects__preview--sepia');
  }
  if(target.id === 'effect-marvin'){
    imgUploadPreview.removeAttribute('class');
    imgUploadPreview.classList.add('effects__preview--marvin');
  }
  if(target.id === 'effect-phobos'){
    imgUploadPreview.removeAttribute('class');
    imgUploadPreview.classList.add('effects__preview--phobos');
  }
  if(target.id === 'effect-heat'){
    imgUploadPreview.removeAttribute('class');
    imgUploadPreview.classList.add('effects__preview--heat');
  }
}

effectList.addEventListener('change', onChangeFilter);

// Ф-я маштабирования изображения:
export function onChangeScale(evt){

  const target = evt.target;
  if(target.classList.contains('scale__control--smaller') && counterValue !== MAX_STEP){
    inputScale.value = `${counterValue - MAX_STEP  }%`;
    counterValue = counterValue - MAX_STEP;
  }

  if(target.classList.contains('scale__control--bigger') && counterValue !== 100){
    inputScale.value = `${counterValue + MAX_STEP  }%`;
    counterValue = counterValue + MAX_STEP;
  }
  imgUploadPreview.style.transform = `scale(${counterValue / 100})`;
}

groupScales.addEventListener('click', onChangeScale);
