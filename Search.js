export default class Search {
  constructor(giphys,searchInput,form) {
    this.API_KEY = `ezjplPArIt4fNgmePl9IX9V8T8cxMiB5`;
    this.API_URL = `http://api.giphy.com/v1/gifs/search?api_key=${this.API_KEY}&limit=25&q=`;
    this.giphys = document.querySelector(giphys);
    this.input = document.querySelector(searchInput);
    this.form = document.querySelector(form);
  }
  showGiphys(images) {
    const {
      data
    } = images;
    data.forEach(el => {
      const img = document.createElement('img');
      img.setAttribute('src', el.images.fixed_height.url);
      this.giphys.appendChild(img);
    });
  }
  async getGiphys(type) {
    this.giphys.textContent = '';
    const response = await fetch(`${this.API_URL}${type}`);
    const data = await response.json();
    if (data.data.length) {
      this.showGiphys(data)
    } else if (this.input.value.length) {
      this.giphys.innerHTML = `<h2>Please type correct giphy you want to find</h2>`;
    }
  }
  search() {
    this.getGiphys(this.input.value);
  }
  init() {
    this.input.addEventListener('keyup', () => this.search());
    this.form.addEventListener('submit', e => e.preventDefault());
  }
}