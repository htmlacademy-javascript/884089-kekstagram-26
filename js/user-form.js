import { resetScale } from './controls.js';
const form = document.querySelector('.img-upload__form');
const editFormImg = form.querySelector('.img-upload__overlay');
const fieldUpload = form.querySelector('#upload-file');
const closeEditFormImg = form.querySelector('#upload-cancel');
const fieldHashtag = form.querySelector('.text__hashtags');
const fieldDescription = form.querySelector('.text__description');
const buttonSubmit = document.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageWindow = successTemplate.cloneNode(true);
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageWindow = errorTemplate.cloneNode(true);

const pristine = new Pristine(form,{
  classTo:'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass:'text__error'
});

export const setUserFormSubmit = (onSuccess)=>{
  form.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    if(pristine.validate()){
      buttonSubmit.disabled = true;
      const formData = new FormData(evt.target);
      fetch(
        'https://26.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      )
        .then( (response)=>{
          if(response.ok){
            onSuccess();
            modalSuccessMessageWindow();
            keydownSuccessMessageWindow();
          }
        })
        .catch(()=>{
          modalErrorMessageWindow();
        });
    }
  });
};

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
export function closeEditForm(){
  document.querySelector('body').classList.remove('modal-open');
  buttonSubmit.disabled = false;
  editFormImg.classList.add('hidden');
  resetScale();
}

function closeModalWindow(){
  if(document.querySelector('.success')){
    document.querySelector('.success').remove();
  }
  document.querySelector('.error').remove();
}

// Ф-я закрытия модального окна с сообщением об успешной отправке:
function modalSuccessMessageWindow(){
  document.body.append(successMessageWindow);
  const buttonClose = successMessageWindow.querySelector('.success__button');
  window.addEventListener('click',(evt)=>{
    const target = evt.target;
    if (!target.closest('successMessageWindow') && !target.closest('buttonClose')) {
      closeModalWindow();
    }
  });
  buttonClose.removeEventListener('click', closeModalWindow);
}
// Ф-я закрытия модального окна с сообщением об ошибке при отправке:
function modalErrorMessageWindow(){
  errorMessageWindow.style.zIndex= '2';
  document.body.append(errorMessageWindow);

  const buttonClose = errorMessageWindow.querySelector('.error__button');
  window.addEventListener('click',(evt)=>{
    const target = evt.target;
    if (!target.closest('errorMessageWindow') && !target.closest('buttonClose')) {
      closeModalWindow();
    }
  });
  buttonClose.removeEventListener('click', closeModalWindow);
}

function keydownSuccessMessageWindow(){
  document.addEventListener('keydown', (evt)=>{
    if(evt.keyCode === 27){
      closeModalWindow();
    }
  });
}

function onEditCloseClick(){
  closeEditForm();
  closeEditFormImg.removeEventListener('click', onEditCloseClick);
}

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
