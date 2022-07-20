const load = function(fooRender){
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((date) => {
      fooRender(date);
    });
};
export {load};

