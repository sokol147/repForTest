class Video {
  render(obj) {
    const list = document.querySelector('.video-list');
    const li = document.createElement('div');
    li.setAttribute('class', 'video-item');

    const info = document.createElement('div');
    info.setAttribute('class', 'video-info');

    function convertDate(string) {
      return string.slice(0, 10);
    }

    const date = convertDate(obj.snippet.publishedAt);

    info.innerHTML = `
      <span class="video-chanel video-info-item">${obj.snippet.channelTitle}</span>
      <span class="video-date video-info-item">${date}</span>
      <p class="video-descr">${obj.snippet.description}</p>
    `;

    li.innerHTML = `
      <a href="https://www.youtube.com/watch?v=${obj.id.videoId}&feature=youtu.be" class="video-link">${obj.snippet.title}</a>
      <img src="${obj.snippet.thumbnails.medium.url}" alt="${obj.snippet.title}" class="video-preview">
    `;
    li.appendChild(info);
    list.appendChild(li);

    fetch(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=${obj.id.videoId}&part=snippet,statistics`)
      .then(res => res.json())
      .then((data) => {
        const views = document.createElement('span');
        views.setAttribute('class', 'video-views video-info-item');
        views.innerText = `${data.items[0].statistics.viewCount}`;
        info.appendChild(views);
      });
  }
}

export default Video;
