class Container {
  render() {
    const videosContainer = document.createElement('div');
    videosContainer.setAttribute('class', 'caorusel-wrapper');
    videosContainer.innerHTML = '<div class="video-list" id="carousel1"></div>';

    document.body.insertBefore(videosContainer, document.body.childNodes[1]);
  }
}

export default Container;
