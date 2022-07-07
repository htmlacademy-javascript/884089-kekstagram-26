const form = document.querySelector('.img-upload__form');
const editFormImg = form.querySelector('.img-upload__overlay');
const fieldUpload = form.querySelector('#upload-file');
const closeEditFormImg = form.querySelector('#upload-cancel');
const imgUploadPreview = form.querySelector('.img-upload__preview');
const fieldHashtag = form.querySelector('.text__hashtags');
// const fieldDescription = form.querySelector('.text__description');
const pristine = new Pristine(form,{
  classTo:'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass:'text__error'
});
pristine.addValidator(
  form.querySelector('.text__description'),
  (value)=> value.length >= 140,
  'длина комментария не может составлять больше 140 символов',
  1,
  true
);

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  (value)=> value.length >= 2 && value.length <= 20,
  'От 2 до 20 символов включая #',
  2,
  true
);

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  ()=> {
    const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
    const testValid = re.test(fieldHashtag.value);
    return testValid;
  },
  'хэш-тег начинается с символа # и не может содержать пробелы, спецсимволы (#, @, $ и т. п.)',
  1,
  true
);

form.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  pristine.validate();
});


// Ф-я скрытия формы редактирования изображения:
function hiddenEditFormImg(){
  editFormImg.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imgUploadPreview.querySelector('img').value = '';
}

function onCloseClick(){
  hiddenEditFormImg();
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
    hiddenEditFormImg();
  }
}

fieldUpload.addEventListener('keydown', onEditFormImgKeydown);

