const form = document.querySelector('.img-upload__form');
const editFormImg = form.querySelector('.img-upload__overlay');
const fieldUpload = form.querySelector('#upload-file');
const closeEditFormImg = form.querySelector('#upload-cancel');
const imgUploadPreview = form.querySelector('.img-upload__preview');
const fieldHashtag = form.querySelector('.text__hashtags');
const fieldDescription = form.querySelector('.text__description');
const sliderEffectLevel = document.querySelector('.effect-level__slider');

const pristine = new Pristine(form,{
  classTo:'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass:'text__error'
});

const onFormSubmit = (evt)=>{
  evt.preventDefault();
  if(pristine.validate()){
    form.submit();
  }
};

form.addEventListener('submit', onFormSubmit);


const textLengthComments = (value) => {
  if( value.length <= 140 || !value.length){
    return true;
  }
};

pristine.addValidator(
  fieldDescription,
  textLengthComments,
  'длина комментария не может составлять больше 140 символов',
  1,
  true
);

const isNoRepeats = (value)=>{
  if(value === '') {
    return true;
  }
  value.trim().toLowerCase().split(' ').every((element, index, arr) => arr.indexOf(element) === index);
};

pristine.addValidator(
  fieldHashtag,
  isNoRepeats,
  'один и тот же хэш-тег не может быть использован дважды,#ХэшТег и #хэштег считаются одним и тем же тегом',
  3,
  true
);

const isMaxLengthCorrect = (value) => value.trim().split(' ').length < 5 ;

pristine.addValidator(
  fieldHashtag,
  isMaxLengthCorrect,
  'нельзя указать больше пяти хэш-тегов',
  2,
  true
);


const hashtagValidator = (value)=> {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  if(!value.length){
    return true;
  }
  return value.trim().split(' ').every((element) => re.test(element));
};

pristine.addValidator(
  fieldHashtag,
  hashtagValidator,
  'хэш-тег начинается с символа #,от 2 до 20 символов включая #, и не может содержать пробелы, спецсимволы (#, @, $ и т. п.)',
  4,
  true
);

// Ф-я скрытия формы редактирования изображения:
function closeEditForm(){
  editFormImg.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imgUploadPreview.querySelector('img').removeAttribute('style');
  imgUploadPreview.querySelector('img').removeAttribute('class');
  sliderEffectLevel.noUiSlider.set(100);
  imgUploadPreview.querySelector('img').value = '';
}

function onEditCloseClick(){
  closeEditForm();
  closeEditFormImg.removeEventListener('click', onEditCloseClick);
}

closeEditFormImg.addEventListener('click', onEditCloseClick);

// Ф-я открытия формы редактирования изображения:
fieldUpload.addEventListener('change', ()=>{
  editFormImg.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  closeEditFormImg.addEventListener('click', onEditCloseClick);
  document.addEventListener('keydown', onEditFormImgKeydown);
});

function onEditFormImgKeydown(evt) {
  if(evt.keyCode === 27){
    closeEditForm();
  }
}

function stopPropagation(evt){
  evt.stopPropagation();
}
fieldHashtag.addEventListener('keydown',stopPropagation);
