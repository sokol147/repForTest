import Loader from "./loader";

class Search {
  constructor() {
    this.searchWord = '';
    this.request = new Loader();
  }
  render() {
    const form = document.createElement('div');
    form.setAttribute('class', 'search-form');
    document.body.insertBefore(form, document.body.childNodes[0]);

    const searchInput = `
      <div class="form-control">
        <input type="text" placeholder="Enter request" class="search-input">
      </div>
    `;

    form.innerHTML = searchInput;

    const searchField = document.querySelector('.search-input');

    searchField.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 && searchField.value !== '') {
        this.searchWord = searchField.value;
        const container = document.querySelector('.video-list');
        container.innerHTML = '';
        this.request.getVideoInfo(this.searchWord);
      }
    });
  }

}

export default Search;
