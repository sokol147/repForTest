class CarouselTouchPlugin {
  constructor(carousel) {
    carousel.container.addEventListener('dragstart', e => e.preventDefault());
    carousel.container.addEventListener('mousedown', this.startDrag.bind(this));
    carousel.container.addEventListener('touchstart', this.startDrag.bind(this));
    window.addEventListener('mousemove', this.drag.bind(this));
    window.addEventListener('touchmove', this.drag.bind(this));
    window.addEventListener('touchend', this.endDrag.bind(this));
    window.addEventListener('mouseup', this.endDrag.bind(this));
    window.addEventListener('touchcancel', this.endDrag.bind(this));
    this.carousel = carousel;
  }

  startDrag(e) {
    if (e.touches) {
      if (e.touches.length < 1) {
        e = e.touches[0];
      } else {
        return;
      }
    }
    this.origin = { x: e.screenX, y: e.screenY };
    this.width = this.carousel.containerWidth;
    this.carousel.disableTransition();
  }

  drag(e) {
    if (this.origin) {
      const point = e.touches ? e.touches[0] : e;
      const translate = { x: point.screenX - this.origin.x, y: point.screenY - this.origin.y };
      if (e.touches && Math.abs(translate.x) > Math.abs(translate.y)) {
        // e.preventDefault();
        e.stopPropagation();
      }
      const baseTranslate = this.carousel.currentItem * -100 / this.carousel.items.length;
      this.lastTranslate = translate;
      this.carousel.translate(baseTranslate + 100 * translate.x / this.width);
    }
  }

  endDrag() {
    if (this.origin && this.lastTranslate) {
      this.carousel.enableTransition();
      if (Math.abs(this.lastTranslate.x / this.carousel.carouselWidth) > 0.2) {
        if (this.lastTranslate.x < 0) {
          this.carousel.next();
        } else {
          this.carousel.prev();
        }
      } else {
        this.carousel.goToItem(this.carousel.currentItem);
      }
    }
    this.origin = null;
  }
}

export default CarouselTouchPlugin;
