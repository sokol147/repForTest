import CarouselTouchPlugin from './carousel-touch-plugin';
import Loader from './loader';

class Carousel {
  constructor(element, options = {}) {
    this.loader = new Loader();

    this.element = element;
    this.options = Object.assign({}, {
      slidesToScroll: 1,
      slidesVisible: 1,
      loop: false,
      pagination: false,
      navigation: true,
    }, options);
    const children = [].slice.call(element.children);
    this.isMobile = false;
    this.isTablet = false;
    this.currentItem = 0;
    this.moveCallbacks = [];

    this.root = this.createDivWithClass('carousel');
    this.container = this.createDivWithClass('carousel__container');
    this.root.setAttribute('tab-index', '0');
    this.root.appendChild(this.container);
    this.element.appendChild(this.root);
    this.items = children.map((child) => {
      const item = this.createDivWithClass('carousel__item');
      item.appendChild(child);
      this.container.appendChild(item);
      return item;
    });
    this.setStyle();
    if (this.options.navigation) {
      this.createNavigation();
    }
    if (this.options.pagination) {
      this.createPagination();
    }

    this.moveCallbacks.forEach(cb => cb(0));
    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.root.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowRight') {
        this.next();
      } else if (e.key === 'ArrowLeft') {
        this.prev();
      }
    });
    new CarouselTouchPlugin(this);
  }

  setStyle() {
    const ratio = this.items.length / this.slidesVisible;
    this.container.style.width = `${ratio * 100}%`;
    this.items.forEach(item => item.style.width = `${((100 / this.slidesVisible) / ratio)}%`);
  }

  createNavigation() {
    const nextButton = this.createDivWithClass('carousel__next');
    const prevButton = this.createDivWithClass('carousel__prev');
    this.root.appendChild(nextButton);
    this.root.appendChild(prevButton);
    nextButton.addEventListener('click', this.next.bind(this));
    prevButton.addEventListener('click', this.prev.bind(this));
    if (this.options.loop === false) {
      return;
    }
    this.onMove((index) => {
      if (index === 0) {
        prevButton.classList.add('carousel__prev--hidden');
      } else {
        prevButton.classList.remove('carousel__prev--hidden');
      }
      if (this.items[this.currentItem + this.slidesVisible] === undefined) {
        nextButton.classList.add('carousel__next--hidden');
      } else {
        nextButton.classList.remove('carousel__next--hidden');
      }
    });
  }

  createPagination() {
    const pagination = this.createDivWithClass('carousel__pagination');
    const buttons = [];
    this.root.appendChild(pagination);
    for (let i = 0; i < this.items.length; i += this.options.slidesToScroll) {
      const button = this.createDivWithClass('carousel__pagination__button');
      button.innerHTML = Math.floor(i / this.options.slidesToScroll) + 1;
      button.addEventListener('click', () => {
        this.goToItem(i);
      });
      pagination.appendChild(button);
      buttons.push(button);
    }
    this.onMove((index) => {
      const activeButton = buttons[Math.floor(index / this.options.slidesToScroll)];
      activeButton.innerHTML = Math.floor(index / this.options.slidesToScroll) + 1;
      if (activeButton) {
        buttons.forEach(button => button.classList.remove('carousel__pagination__button--active'));
        activeButton.classList.add('carousel__pagination__button--active');
      }
    });
  }

  translate(percent) {
    this.container.style.transform = `translate3d(${percent}%, 0, 0)`;
  }

  next() {
    this.goToItem(this.currentItem + this.slidesToScroll);
  }

  prev() {
    this.goToItem(this.currentItem - this.slidesToScroll);
  }

  goToItem(index) {
    if (index < 0) {
      // add prev page token request here
      // const container = document.querySelector('.video-list');
      // container.innerHTML = '';
      // this.loader.getVideoInfo(searchWord, prevPageToken);

      if (this.options.loop) {
        index = this.items.length - this.slidesVisible;
      } else {
        return;
      }
    } else if (index >= this.items.length
      || (this.items[this.currentItem + this.slidesVisible] === undefined
      && index > this.currentItem)) {
      // add new page token request here
      // const container = document.querySelector('.video-list');
      // container.innerHTML = '';
      // this.loader.getVideoInfo(searchWord, nextPageToken);

      if (this.options.loop) {
        index = 0;
      } else {
        return;
      }
    }
    const translateX = index * -100 / this.items.length;
    this.translate(translateX);
    this.currentItem = index;
    this.moveCallbacks.forEach(cb => cb(index));
  }

  onMove(cb) {
    this.moveCallbacks.push(cb);
  }

  onWindowResize() {
    const mobile = window.innerWidth < 450;
    if (mobile !== this.isMobile) {
      this.isMobile = mobile;
      this.setStyle();
      this.moveCallbacks.forEach(cb => cb(this.currentItem));
    }
    const tablet = window.innerWidth < 850;
    if (tablet !== this.isTablet) {
      this.isTablet = tablet;
      this.setStyle();
      this.moveCallbacks.forEach(cb => cb(this.currentItem));
    }
  }

  createDivWithClass(className) {
    const div = document.createElement('div');
    div.setAttribute('class', className);
    return div;
  }

  disableTransition() {
    this.container.style.transition = 'none';
  }

  enableTransition() {
    this.container.style.transition = '';
  }

  get slidesToScroll() {
    if (this.isMobile) return 1;
    if (this.isTablet) return 2;
    return this.options.slidesToScroll;
  }

  get slidesVisible() {
    if (this.isMobile) return 1;
    if (this.isTablet) return 2;
    return this.options.slidesVisible;
  }

  get containerWidth() {
    return this.container.offsetWidth;
  }

  get carouselWidth() {
    return this.root.offsetWidth;
  }
}

export default Carousel;
