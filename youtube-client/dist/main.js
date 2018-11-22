/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/carousel-touch-plugin.js":
/*!*************************************************!*\
  !*** ./src/components/carousel-touch-plugin.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CarouselTouchPlugin =
/*#__PURE__*/
function () {
  function CarouselTouchPlugin(carousel) {
    _classCallCheck(this, CarouselTouchPlugin);

    carousel.container.addEventListener('dragstart', function (e) {
      return e.preventDefault();
    });
    carousel.container.addEventListener('mousedown', this.startDrag.bind(this));
    carousel.container.addEventListener('touchstart', this.startDrag.bind(this));
    window.addEventListener('mousemove', this.drag.bind(this));
    window.addEventListener('touchmove', this.drag.bind(this));
    window.addEventListener('touchend', this.endDrag.bind(this));
    window.addEventListener('mouseup', this.endDrag.bind(this));
    window.addEventListener('touchcancel', this.endDrag.bind(this));
    this.carousel = carousel;
  }

  _createClass(CarouselTouchPlugin, [{
    key: "startDrag",
    value: function startDrag(e) {
      if (e.touches) {
        if (e.touches.length > 1) {
          return;
        } else {
          e = e.touches[0];
        }
      }

      this.origin = {
        x: e.screenX,
        y: e.screenY
      };
      this.width = this.carousel.containerWidth;
      this.carousel.disableTransition();
    }
  }, {
    key: "drag",
    value: function drag(e) {
      if (this.origin) {
        var point = e.touches ? e.touches[0] : e;
        var translate = {
          x: point.screenX - this.origin.x,
          y: point.screenY - this.origin.y
        };

        if (e.touches && Math.abs(translate.x) > Math.abs(translate.y)) {
          // e.preventDefault();
          e.stopPropagation();
        }

        var baseTranslate = this.carousel.currentItem * -100 / this.carousel.items.length;
        this.lastTranslate = translate;
        this.carousel.translate(baseTranslate + 100 * translate.x / this.width);
      }
    }
  }, {
    key: "endDrag",
    value: function endDrag() {
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
  }]);

  return CarouselTouchPlugin;
}();

/* harmony default export */ __webpack_exports__["default"] = (CarouselTouchPlugin);

/***/ }),

/***/ "./src/components/carousel.js":
/*!************************************!*\
  !*** ./src/components/carousel.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _carousel_touch_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carousel-touch-plugin */ "./src/components/carousel-touch-plugin.js");
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loader */ "./src/components/loader.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Carousel =
/*#__PURE__*/
function () {
  function Carousel(element) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Carousel);

    this.loader = new _loader__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.element = element;
    this.options = Object.assign({}, {
      slidesToScroll: 1,
      slidesVisible: 1,
      loop: false,
      pagination: false,
      navigation: true
    }, options);
    var children = [].slice.call(element.children);
    this.isMobile = false;
    this.isTablet = false;
    this.currentItem = 0;
    this.moveCallbacks = [];
    this.root = this.createDivWithClass('carousel');
    this.container = this.createDivWithClass('carousel__container');
    this.root.setAttribute('tab-index', '0');
    this.root.appendChild(this.container);
    this.element.appendChild(this.root);
    this.items = children.map(function (child) {
      var item = _this.createDivWithClass('carousel__item');

      item.appendChild(child);

      _this.container.appendChild(item);

      return item;
    });
    this.setStyle();

    if (this.options.navigation) {
      this.createNavigation();
    }

    if (this.options.pagination) {
      this.createPagination();
    }

    this.moveCallbacks.forEach(function (cb) {
      return cb(0);
    });
    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.root.addEventListener('keyup', function (e) {
      if (e.key === 'ArrowRight') {
        _this.next();
      } else if (e.key === 'ArrowLeft') {
        _this.prev();
      }
    });
    new _carousel_touch_plugin__WEBPACK_IMPORTED_MODULE_0__["default"](this);
  }

  _createClass(Carousel, [{
    key: "setStyle",
    value: function setStyle() {
      var _this2 = this;

      var ratio = this.items.length / this.slidesVisible;
      this.container.style.width = "".concat(ratio * 100, "%");
      this.items.forEach(function (item) {
        return item.style.width = "".concat(100 / _this2.slidesVisible / ratio, "%");
      });
    }
  }, {
    key: "createNavigation",
    value: function createNavigation() {
      var _this3 = this;

      var nextButton = this.createDivWithClass('carousel__next');
      var prevButton = this.createDivWithClass('carousel__prev');
      this.root.appendChild(nextButton);
      this.root.appendChild(prevButton);
      nextButton.addEventListener('click', this.next.bind(this));
      prevButton.addEventListener('click', this.prev.bind(this));

      if (this.options.loop === false) {
        return;
      }

      this.onMove(function (index) {
        if (index === 0) {
          prevButton.classList.add('carousel__prev--hidden');
        } else {
          prevButton.classList.remove('carousel__prev--hidden');
        }

        if (_this3.items[_this3.currentItem + _this3.slidesVisible] === undefined) {
          nextButton.classList.add('carousel__next--hidden');
        } else {
          nextButton.classList.remove('carousel__next--hidden');
        }
      });
    }
  }, {
    key: "createPagination",
    value: function createPagination() {
      var _this4 = this;

      var pagination = this.createDivWithClass('carousel__pagination');
      var buttons = [];
      this.root.appendChild(pagination);

      var _loop = function _loop(i) {
        var button = _this4.createDivWithClass('carousel__pagination__button');

        button.innerHTML = Math.floor(i / _this4.options.slidesToScroll) + 1;
        button.addEventListener('click', function () {
          _this4.goToItem(i);
        });
        pagination.appendChild(button);
        buttons.push(button);
      };

      for (var i = 0; i < this.items.length; i += this.options.slidesToScroll) {
        _loop(i);
      }

      this.onMove(function (index) {
        var activeButton = buttons[Math.floor(index / _this4.options.slidesToScroll)];
        activeButton.innerHTML = Math.floor(index / _this4.options.slidesToScroll) + 1;

        if (activeButton) {
          buttons.forEach(function (button) {
            return button.classList.remove('carousel__pagination__button--active');
          });
          activeButton.classList.add('carousel__pagination__button--active');
        }
      });
    }
  }, {
    key: "translate",
    value: function translate(percent) {
      this.container.style.transform = "translate3d(".concat(percent, "%, 0, 0)");
    }
  }, {
    key: "next",
    value: function next() {
      this.goToItem(this.currentItem + this.slidesToScroll);
    }
  }, {
    key: "prev",
    value: function prev() {
      this.goToItem(this.currentItem - this.slidesToScroll);
    }
  }, {
    key: "goToItem",
    value: function goToItem(index) {
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
      } else if (index >= this.items.length || this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem) {
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

      var translateX = index * -100 / this.items.length;
      this.translate(translateX);
      this.currentItem = index;
      this.moveCallbacks.forEach(function (cb) {
        return cb(index);
      });
    }
  }, {
    key: "onMove",
    value: function onMove(cb) {
      this.moveCallbacks.push(cb);
    }
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      var _this5 = this;

      var mobile = window.innerWidth < 450;

      if (mobile !== this.isMobile) {
        this.isMobile = mobile;
        this.setStyle();
        this.moveCallbacks.forEach(function (cb) {
          return cb(_this5.currentItem);
        });
      }

      var tablet = window.innerWidth < 850;

      if (tablet !== this.isTablet) {
        this.isTablet = tablet;
        this.setStyle();
        this.moveCallbacks.forEach(function (cb) {
          return cb(_this5.currentItem);
        });
      }
    }
  }, {
    key: "createDivWithClass",
    value: function createDivWithClass(className) {
      var div = document.createElement('div');
      div.setAttribute('class', className);
      return div;
    }
  }, {
    key: "disableTransition",
    value: function disableTransition() {
      this.container.style.transition = 'none';
    }
  }, {
    key: "enableTransition",
    value: function enableTransition() {
      this.container.style.transition = '';
    }
  }, {
    key: "slidesToScroll",
    get: function get() {
      if (this.isMobile) return 1;
      if (this.isTablet) return 2;
      return this.options.slidesToScroll;
    }
  }, {
    key: "slidesVisible",
    get: function get() {
      if (this.isMobile) return 1;
      if (this.isTablet) return 2;
      return this.options.slidesVisible;
    }
  }, {
    key: "containerWidth",
    get: function get() {
      return this.container.offsetWidth;
    }
  }, {
    key: "carouselWidth",
    get: function get() {
      return this.root.offsetWidth;
    }
  }]);

  return Carousel;
}();

/* harmony default export */ __webpack_exports__["default"] = (Carousel);

/***/ }),

/***/ "./src/components/container.js":
/*!*************************************!*\
  !*** ./src/components/container.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Container =
/*#__PURE__*/
function () {
  function Container() {
    _classCallCheck(this, Container);
  }

  _createClass(Container, [{
    key: "render",
    value: function render() {
      var videosContainer = document.createElement('div');
      videosContainer.setAttribute('class', 'caorusel-wrapper');
      videosContainer.innerHTML = '<div class="video-list" id="carousel1"></div>';
      document.body.insertBefore(videosContainer, document.body.childNodes[1]);
    }
  }]);

  return Container;
}();

/* harmony default export */ __webpack_exports__["default"] = (Container);

/***/ }),

/***/ "./src/components/loader.js":
/*!**********************************!*\
  !*** ./src/components/loader.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carousel */ "./src/components/carousel.js");
/* harmony import */ var _video__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./video */ "./src/components/video.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Loader =
/*#__PURE__*/
function () {
  function Loader() {
    _classCallCheck(this, Loader);

    this.video = new _video__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.nextPageToken = '';
    this.prevPageToken = '';
  }

  _createClass(Loader, [{
    key: "getVideoInfo",
    value: function getVideoInfo(word) {
      var _this = this;

      var pageToken = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      return fetch("https://www.googleapis.com/youtube/v3/search?pageToken=".concat(pageToken, "&key=AIzaSyCjaC4qAR-0Jm5lWEHyxRsv0hFPiQ2Em_w&type=video&part=snippet&maxResults=16&q=").concat(word)).then(function (res) {
        return res.json();
      }).then(function (data) {
        _this.nextPageToken = data.nextPageToken;
        _this.prevPageToken = data.prevPageToken;

        for (var i = 0; i < data.items.length; i += 1) {
          _this.video.render(data.items[i]);
        }

        new _carousel__WEBPACK_IMPORTED_MODULE_0__["default"](document.querySelector('#carousel1'), {
          slidesVisible: 4,
          slidesToScroll: 4,
          loop: false,
          pagination: true,
          navigation: false
        });
      });
    }
  }]);

  return Loader;
}();

/* harmony default export */ __webpack_exports__["default"] = (Loader);

/***/ }),

/***/ "./src/components/search.js":
/*!**********************************!*\
  !*** ./src/components/search.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader */ "./src/components/loader.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Search =
/*#__PURE__*/
function () {
  function Search() {
    _classCallCheck(this, Search);

    this.searchWord = '';
    this.request = new _loader__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  _createClass(Search, [{
    key: "render",
    value: function render() {
      var _this = this;

      var form = document.createElement('div');
      form.setAttribute('class', 'search-form');
      document.body.insertBefore(form, document.body.childNodes[0]);
      var searchInput = "\n      <div class=\"form-control\">\n        <input type=\"text\" placeholder=\"Enter request\" class=\"search-input\">\n      </div>\n    ";
      form.innerHTML = searchInput;
      var searchField = document.querySelector('.search-input');
      searchField.addEventListener('keypress', function (e) {
        if (e.keyCode === 13 && searchField.value !== '') {
          _this.searchWord = searchField.value;
          var container = document.querySelector('.video-list');
          container.innerHTML = '';

          _this.request.getVideoInfo(_this.searchWord);
        }
      });
    }
  }]);

  return Search;
}();

/* harmony default export */ __webpack_exports__["default"] = (Search);

/***/ }),

/***/ "./src/components/video.js":
/*!*********************************!*\
  !*** ./src/components/video.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Video =
/*#__PURE__*/
function () {
  function Video() {
    _classCallCheck(this, Video);
  }

  _createClass(Video, [{
    key: "render",
    value: function render(obj) {
      var list = document.querySelector('.video-list');
      var li = document.createElement('div');
      li.setAttribute('class', 'video-item');
      var info = document.createElement('div');
      info.setAttribute('class', 'video-info');

      function convertDate(string) {
        return string.slice(0, 10);
      }

      var date = convertDate(obj.snippet.publishedAt);
      info.innerHTML = "\n      <span class=\"video-chanel video-info-item\">".concat(obj.snippet.channelTitle, "</span>\n      <span class=\"video-date video-info-item\">").concat(date, "</span>\n      <p class=\"video-descr\">").concat(obj.snippet.description, "</p>\n    ");
      li.innerHTML = "\n      <a href=\"https://www.youtube.com/watch?v=".concat(obj.id.videoId, "&feature=youtu.be\" class=\"video-link\">").concat(obj.snippet.title, "</a>\n      <img src=\"").concat(obj.snippet.thumbnails.medium.url, "\" alt=\"").concat(obj.snippet.title, "\" class=\"video-preview\">\n    ");
      li.appendChild(info);
      list.appendChild(li);
      fetch("https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=".concat(obj.id.videoId, "&part=snippet,statistics")).then(function (res) {
        return res.json();
      }).then(function (data) {
        var views = document.createElement('span');
        views.setAttribute('class', 'video-views video-info-item');
        views.innerText = "".concat(data.items[0].statistics.viewCount);
        info.appendChild(views);
      });
    }
  }]);

  return Video;
}();

/* harmony default export */ __webpack_exports__["default"] = (Video);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/search */ "./src/components/search.js");
/* harmony import */ var _components_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/container */ "./src/components/container.js");


var searchBar = new _components_search__WEBPACK_IMPORTED_MODULE_0__["default"]();
var wrapper = new _components_container__WEBPACK_IMPORTED_MODULE_1__["default"]();
searchBar.render();
wrapper.render();

/***/ })

/******/ });
//# sourceMappingURL=main.js.map