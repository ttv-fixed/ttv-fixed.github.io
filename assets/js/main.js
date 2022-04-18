/**
* Template Name: iPortfolio - v3.7.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()


/**
 * @author Sławomir Kokłowski {@link https://www.kurshtml.edu.pl}
 * @copyright NIE usuwaj tego komentarza! (Do NOT remove this comment!)
 * @version 2.5.0
 */

 function GalleryModel(items) {
	this.items = items || [];
}

GalleryModel.prototype.get = function(index) {
	var item = this.items[index];
	if (!item) {
		return null;
	}
	return {
		title: item.getAttribute('data-gallery'),
		src: this._getSrc(item),
		alt: item.title,
		protected: !item.getAttribute('href')
	};
};

GalleryModel.prototype.indexOf = function(src) {
	for (var i = 0; i < this.items.length; ++i) {
		var item = this.items[i];
		if (this._getSrc(item) === src) {
			return i;
		}
	}
	return -1;
};

GalleryModel.prototype.count = function() {
	return this.items.length;
};

GalleryModel.prototype.preload = function(index) {
	var item = this.items[index];
	if (item) {
		new Image().src = item.href;
	}
};

GalleryModel.prototype._getSrc = function(item) {
	return item.getAttribute('href') || item.getAttribute('data-href');
};

function GalleryView(items) {
	this.items = items || [];
	this._reset();
	this.style = this._createStyle();
	this.delay = 500;
	this._overflow = '';
	this._timeout = null;
	this._listeners = [];
	this._protectedEvents = ['mousedown', 'contextmenu', 'selectstart', 'select', 'copy', 'dragstart', 'drag'];
}

GalleryView.prototype.start = function(callback) {
	this.items.forEach(function(item) {
		var src = item.getAttribute('href');
		if (!src) {
			src = item.getAttribute('data-href');
			item.style.cursor = 'pointer';
		}
		item.addEventListener('click', function(event) {
			callback(src);
			event.preventDefault();
		})
	});
};

GalleryView.prototype.open = function(goBack, goForward, onClose, onLoad) {
	this.onLoad = onLoad;
	this._overflow = document.body.style.overflow;
	document.body.style.overflow = 'hidden';
	this.container = this._createContainer();
	this.progress = this._createPropress();
	this.container.appendChild(this.progress);
	this.caption = this._createCaption();
	this.container.appendChild(this.caption);
	this.back = this._createNavigation('&#10094;', this.style.back, goBack);
	this.container.appendChild(this.back);
	this.forward = this._createNavigation('&#10095;', this.style.forward, goForward);
	this.container.appendChild(this.forward);
	this.container.appendChild(this._createCloseButton(onClose));
	document.body.appendChild(this.container);
	this._addListener(document, 'keydown', this._onKeyDown.bind(this, goBack, goForward, onClose));
};

GalleryView.prototype.close = function(callback) {
	clearTimeout(this._timeout);
	this._listeners.forEach(function(listener) {
		listener.target.removeEventListener(listener.type, listener.callback);
	});
	this._listeners = [];
	this.container.parentNode.removeChild(this.container);
	document.body.style.overflow = this._overflow;
	this._reset();
	if (callback) {
		callback();
	}
};

GalleryView.prototype.display = function(image, first, last) {
	this[first ? '_hide' : '_show']('back');
	this[last ? '_hide' : '_show']('forward');
	this._hide('caption');
	this.setCaption(image.title, image.alt);
	if (this.image) {
		this.image.style.visibility = 'hidden';
		this._displayProgress();
		if (image.protected) {
			this._protect();
		}
		this.image.src = image.src;
		if (!image.protected) {
			this._unprotect();
		}
	} else {
		this._displayProgress();
		this.image = this._createImage(image.src);
		this.image.style.visibility = 'hidden';
		if (image.protected) {
			this._protect();
		}
		this.container.insertBefore(this.image, this.container.firstChild);
	}
};

GalleryView.prototype.setCaption = function(title, alt) {
	this.caption.innerHTML = '';
	if (title) {
		var b = document.createElement('b');
		b.innerText = title;
		this.caption.appendChild(b);
	}
	if (alt) {
		if (title) {
			this.caption.appendChild(document.createElement('br'));
		}
		this.caption.appendChild(document.createTextNode(alt));
	}
};

GalleryView.prototype._protect = function() {
	var callback = function(event) {
		event.preventDefault();
	};
	this._protectedEvents.forEach(function(type) {
		this._addListener(this.image, type, callback);
	}, this);
	this.image.galleryimg = 'no';
};

GalleryView.prototype._unprotect = function() {
	this.image.removeAttribute('galleryimg');
	var listeners = [];
	this._listeners.forEach(function(listener) {
		if (listener.target === this.image && this._protectedEvents.indexOf(listener.type) >= 0) {
			listener.target.removeEventListener(listener.type, listener.callback);
		} else {
			listeners.push(listener);
		}
	}, this);
	this._listeners = listeners;
};

GalleryView.prototype._reset = function() {
	this.container = null;
	this.image = null;
	this.progress = null;
	this.caption = null;
	this.back = null;
	this.forward = null;
	this.onLoad = null;
};

GalleryView.prototype._addListener = function(target, type, callback) {
	this._listeners.push({
		target: target,
		type: type,
		callback: callback
	});
	target.addEventListener(type, callback);
};

GalleryView.prototype._onKeyDown = function(goBack, goForward, onClose, event) {
	switch (event.keyCode) {
		case 27:
			this.close(onClose);
			break;
		case 37:
			goBack(event);
			break;
		case 39:
			goForward(event);
			break;
	}
};

GalleryView.prototype._createStyle = function() {
	var margin = '10px';
	var overlayStyle = {
		left: 0,
		top: 0,
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	};
	var buttonStyle = {
		border: 0,
		padding: 0,
		lineHeight: 1,
		color: '#000',
		background: 'rgba(255, 255, 255, 0.5)',
		cursor: 'pointer'
	};
	var navigationStyle = {
		fontSize: '50px',
		width: '75px',
		height: '75px',
		borderRadius: '50%',
		position: 'absolute',
		fontWeight: 'bold'
	};
	var style = {
		container: {
			position: 'fixed',
			zIndex: 6000000,
			background: '#000'
		},
		image: {
			maxWidth: '100%',
			maxHeight: '100%'
		},
		progress: {
			position: 'absolute'
		},
		caption: {
			position: 'absolute',
			bottom: 0,
			left: 0,
			boxSizing: 'border-box',
			width: '100%',
			padding: margin,
			color: '#fff',
			background: 'rgba(0, 0, 0, 0.5)',
			font: '15px sans-serif',
			textAlign: 'center'
		},
		back: {
			left: margin
		},
		forward: {
			right: margin
		},
		close: {
			position: 'absolute',
			top: margin,
			right: margin,
			fontSize: '25px',
			width: '35px',
			height: '35px'
		}
	};
	this._forEach(overlayStyle, function(key, value) {
		style.container[key] = style.progress[key] = value;
	});
	this._forEach(buttonStyle, function(key, value) {
		style.close[key] = style.back[key] = style.forward[key] = value;
	});
	this._forEach(navigationStyle, function(key, value) {
		style.back[key] = style.forward[key] = value;
	});
	return style;
};

GalleryView.prototype._forEach = function(data, callback) {
	for (var key in data) {
		if (Object.prototype.hasOwnProperty.call(data, key)) {
			callback.call(this, key, data[key]);
		}
	}
};

GalleryView.prototype._show = function(name) {
	this[name].style.display = this.style[name].display || '';
};

GalleryView.prototype._hide = function(name) {
	this[name].style.display = 'none';
};

GalleryView.prototype._setStyle = function(element, style) {
	this._forEach(style, function(key, value) {
		element.style[key] = value;
	});
};

GalleryView.prototype._createContainer = function() {
	var div = document.createElement('div');
	this._setStyle(div, this.style.container);
	return div;
};

GalleryView.prototype._createImage = function(src) {
	var img = document.createElement('img');
	this._addListener(img, 'load', this._onLoad.bind(this));
	this._setStyle(img, this.style.image);
	img.src = src;
	return img;
};

GalleryView.prototype._createPropress = function() {
	var div = document.createElement('div');
	this._setStyle(div, this.style.progress);
	div.style.display = 'none';
	div.appendChild(document.createElement('progress'));
	return div;
};

GalleryView.prototype._displayProgress = function() {
	clearTimeout(this._timeout);
	this._timeout = setTimeout(this._show.bind(this, 'progress'), this.delay);
};

GalleryView.prototype._createCaption = function() {
	var div = document.createElement('div');
	this._setStyle(div, this.style.caption);
	div.style.display = 'none';
	return div;
};

GalleryView.prototype._createNavigation = function(text, style, callback) {
	var button = document.createElement('button');
	button.type = 'button';
	this._setStyle(button, style);
	button.style.display = 'none';
	button.innerHTML = text;
	this._addListener(button, 'click', callback);
	return button;
};

GalleryView.prototype._createCloseButton = function(callback) {
	var button = document.createElement('button');
	button.type = 'button';
	this._setStyle(button, this.style.close);
	button.innerHTML = '&#10006;';
	this._addListener(button, 'click', this.close.bind(this, callback));
	return button;
};

GalleryView.prototype._onLoad = function() {
	clearTimeout(this._timeout);
	this._hide('progress');
	this.image.style.visibility = 'visible';
	if (this.caption.innerText) {
		this._show('caption');
	}
	if (this.onLoad) {
		this.onLoad();
	}
};

function Gallery(model, view) {
	this.model = model;
	this.view = view;
	this.current = 0;
	this.opened = false;
	this.hash = '';
}

Gallery.prototype.start = function() {
	this.view.start(this.display.bind(this));
	if (location.hash) {
		var current = this.model.indexOf(location.hash.substring(1));
		if (current >= 0) {
			this.display(current);
		}
	}
};

Gallery.prototype.display = function(data) {
	var index = typeof data === 'string' ? this.model.indexOf(data) : data;
	var image = this.model.get(index);
	if (image) {
		this.current = index;
		if (!this.opened) {
			this.hash = location.hash;
			this.view.open(this.goBack.bind(this), this.goForward.bind(this), this._onClose.bind(this), this._onLoad.bind(this));
			this.opened = true;
		}
		this.view.display(image, this.current <= 0, this.current >= this.model.count() - 1);
		this._navigate(image.protected ? '' : '#' + image.src);
	}
};

Gallery.prototype.goBack = function() {
	this.display(this.current - 1);
};

Gallery.prototype.goForward = function() {
	this.display(this.current + 1);
};

Gallery.prototype._navigate = function(hash) {
	if (location.hash !== hash && typeof history !== 'undefined' && history.replaceState) {
		history.replaceState(null, '', location.pathname + location.search + hash);
	}
};

Gallery.prototype._onClose = function() {
	this.opened = false;
	this._navigate(this.hash);
};

Gallery.prototype._onLoad = function() {
	this.model.preload(this.current + 1);
	this.model.preload(this.current - 1);
};

(function() {
	var data = {};
	document.querySelectorAll('[data-gallery]').forEach(function(item) {
		var key = item.getAttribute('data-gallery') || '';
		if (data[key]) {
			data[key].push(item);
		} else {
			data[key] = [item];
		}
	});
	Object.keys(data).forEach(function(key) {
		var items = data[key];
		new Gallery(new GalleryModel(items), new GalleryView(items)).start();
	});
})();
