import {saveArrayPreview} from './filters-form.js';
import { unblockButton } from './user-form.js';
const errorLoadTemplate = document.querySelector('#js-error--load').content.querySelector('.error');
const errorLoad = errorLoadTemplate.cloneNode(true);
const GET_URL = 'https://26.javascript.pages.academy/kekstagram/data';
const SEND_URL = 'https://26.javascript.pages.academy/kekstagram';


function onErroView(){
  document.body.append(errorLoad);
}

const load = function(fooRender){
  fetch(GET_URL)
    .then((response)=>{
      if(response.ok){
        return response.json();
      }
    })
    .then((data) => {
      fooRender(data);
      saveArrayPreview(data);
    })
    .catch(() => {
      onErroView();
    });
};

const sendData = (formData,onSuccess,modalSuccessMessageWindow,
  keydownSuccessMessageWindow,modalErrorMessageWindow)=>{
  fetch(
    (SEND_URL),
    {
      method: 'POST',
      body: formData,
    },
  )
    .then( (response)=>{
      if(response.ok){
        onSuccess();
        modalSuccessMessageWindow();
      }else {
        keydownSuccessMessageWindow();
      }
    })
    .catch(()=>{
      modalErrorMessageWindow();
      unblockButton();
    });
};
export {load,sendData};

