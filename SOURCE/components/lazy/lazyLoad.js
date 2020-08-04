class LazyLoad {
	constructor({
		scope,
		setPaddingBottom = false,
		run = false
	}) {
		this.$scope = scope || window.$document;
		this.$images = this.$scope.find('img[data-src]:not(.swiper-lazy)');
		this.$backgrounds = this.$scope.find('.lazy-bg[data-src]');

		if (setPaddingBottom) {
			this.setPaddingBottom();
		}

		if (run) {
			this.run();
		}

		this._bindEvents();

	}

	_bindEvents() {
		window.$window.on('arts/barba/transition/start arts/barba/transition/end arts/grid/filter', () => {
			this.run();
		});
	}

	setPaddingBottom() {
		this.$images.each(function () {
			const $el = $(this),
				$elParent = $el.parent(),
				elWidth = $el.attr('width') || 0,
				elHeight = $el.attr('height') || 0,
				elPB = parseFloat((elHeight / elWidth) * 100); // padding-bottom hack

			// we need both width and height of element
			// to calculate proper value for "padding-bottom" hack
			if (!elWidth || !elHeight) {
				return;
			}

			// position image absolutely
			gsap.set($el, {
				position: 'absolute',
				top: 0,
				left: 0,
			});

			// set padding-bottom to the parent element so it will
			// create the needed space for the image
			gsap.set($elParent, {
				position: 'relative',
				overflow: 'hidden',
				paddingBottom: elPB + '%'
			});
		});
	}

	run() {
		this.loadImages({
			target: this.$images
		});
		this.loadBackgrounds({
			target: this.$backgrounds
		});
	}

	loadBackgrounds({
		target,
		callback
	}) {
		if (target && target.length) {
			const instance = target.Lazy({
				threshold: 1000,
				chainable: false,
				afterLoad: (el) => {
					$(el).addClass('lazy-bg_loaded');

					if (typeof callback === 'function') {
						callback();
					}
				}
			});
			setTimeout(() => {
				instance.update();
			}, 50);
		}
	}

	loadImages({
		target,
		callback
	}) {
		if (target && target.length) {
			const instance = target.Lazy({
				threshold: 1000,
				chainable: false,
				afterLoad: (el) => {
					const
						$el = $(el),
						$elParent = $el.parent();

					$el.imagesLoaded({
						background: true
					}).always(() => {
						$elParent.addClass('lazy_loaded');
					});

					if (typeof callback === 'function') {
						callback();
					}
				}
			});
			setTimeout(() => {
				instance.update();
			}, 50);
		}
	}
}
