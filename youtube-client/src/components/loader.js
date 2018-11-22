import Carousel from './carousel';
import Video from './video';

class Loader {
  constructor() {
    this.video = new Video();
    this.nextPageToken = '';
    this.prevPageToken = '';
  }

  getVideoInfo(word, pageToken = '') {
    return fetch(`https://www.googleapis.com/youtube/v3/search?pageToken=${pageToken}&key=AIzaSyCjaC4qAR-0Jm5lWEHyxRsv0hFPiQ2Em_w&type=video&part=snippet&maxResults=16&q=${word}`)
      .then(res => res.json())
      .then((data) => {
        this.nextPageToken = data.nextPageToken;
        this.prevPageToken = data.prevPageToken;
        for (let i = 0; i < data.items.length; i += 1) {
          this.video.render(data.items[i]);
        }
        new Carousel(document.querySelector('#carousel1'), {
          slidesVisible: 4,
          slidesToScroll: 4,
          loop: false,
          pagination: true,
          navigation: false,
        });
      });
  }
}

export default Loader;
