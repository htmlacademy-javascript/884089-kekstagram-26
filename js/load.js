import {saveArrayPreview} from './filters-form.js';
// import { xyi } from './render.js';
const errorLoadTemplate = document.querySelector('#js-error--load').content.querySelector('.error');
const errorLoad = errorLoadTemplate.cloneNode(true);


function erroView(){
  document.body.append(errorLoad);
}

const load = function(fooRender){
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response)=>{
      if(response.ok){
        return response.json();
      }
    })
    // .then((response) => response.json())
    .then((date) => {
      fooRender(date);
      saveArrayPreview(date);
    })
    .catch(() => {
      erroView();
    });
};
export {load};

