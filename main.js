// @ts-nocheck
//Connecting to API
const API_KEY = `ezjplPArIt4fNgmePl9IX9V8T8cxMiB5`;
const API_URL = `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=25&q=`;
const giphys = document.getElementsByClassName('giphys');

const showGiphys = (images) => {
  const {
    data
  } = images;
  data.forEach(el => {
    const img = document.createElement('img');
    img.setAttribute('src', el.images.fixed_height.url);
    giphys[0].appendChild(img);
  });
}

const getGiphys = async type => {
  giphys[0].textContent = '';
  const response = await fetch(`${API_URL}${type}`);
  const data = await response.json();
  if (data.data.length) {
    showGiphys(data)
  } else if (input.value.length) {
    giphys[0].innerHTML = `<h2>Please type correct giphy you want to find</h2>`;
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const input = document.querySelector('.search__input');
const form = document.querySelector('.search');
const search = () => {
  getGiphys(input.value);
}
input.addEventListener('keyup', debounce(search, 300));
form.addEventListener('submit', e => e.preventDefault());