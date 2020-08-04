function PJAXStartLoading(data) {
	return new Promise((resolve) => {
		window.dispatchEvent(new CustomEvent('arts/barba/transition/start'));
		window.$barbaWrapper.addClass('cursor-progress');
		$('.menu').addClass('menu_disabled');

		Scroll.lock(true);
		window.$document.off('click resize');

		if (typeof window.$spinner !== 'undefined' && window.$spinner.length) {
			gsap.to(window.$spinner, 0.6, {
				autoAlpha: 1
			});
		}

		resolve(true);
	});
}
