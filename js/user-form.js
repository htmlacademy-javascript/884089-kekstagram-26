const form = document.querySelector('.img-upload__form');
const editFormImg = form.querySelector('.img-upload__overlay');
const fieldUpload = form.querySelector('#upload-file');
const closeEditFormImg = form.querySelector('#upload-cancel');
const imgUploadPreview = form.querySelector('.img-upload__preview');
const fieldHashtag = form.querySelector('.text__hashtags');
const fieldDescription = form.querySelector('.text__description');

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

const maxLengthHashtags = (value) => value.trim().split(' ').length < 5 ;

pristine.addValidator(
  fieldHashtag,
  maxLengthHashtags,
  'нельзя указать больше пяти хэш-тегов',
  3,
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
  2,
  true
);

// Ф-я скрытия формы редактирования изображения:
function closeEditForm(){
  editFormImg.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imgUploadPreview.querySelector('img').value = '';
}

function onCloseClick(){
  closeEditForm();
  closeEditFormImg.removeEventListener('click', onCloseClick);
}

closeEditFormImg.addEventListener('click', onCloseClick);

// Ф-я открытия формы редактирования изображения:
fieldUpload.addEventListener('change', ()=>{
  editFormImg.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
});

function onEditFormImgKeydown(evt) {
  if(evt.keyCode === 27){
    closeEditForm();
  }
}

fieldUpload.addEventListener('keydown', onEditFormImgKeydown);

