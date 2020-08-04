function PJAXInitNewPage(data) {
	return new Promise((resolve) => {

		const $nextContainer = $(data.next.container);
		PJAXUpdateAudioBackground(data).then(() => {

			Promise
				.all([
					PJAXUpdateBody(data),
					PJAXUpdateNodes(data),
					PJAXUpdateHead(data),
					PJAXUpdateAdminBar(data),
					PJAXUpdateLanguageSwitcher(data),
					fontObserver(),
				])
				.then(() => SetText.splitText({
					target: $nextContainer.find('.js-split-text')
				}))
				.then(() => SetText.setLines({
					target: $nextContainer.find('.split-text[data-split-text-set="lines"]')
				}))
				.then(() => SetText.setWords({
					target: $nextContainer.find('.split-text[data-split-text-set="words"]')
				}))
				.then(() => SetText.setChars({
					target: $nextContainer.find('.split-text[data-split-text-set="chars"]')
				}))
				.then(() => {
					// re-init Contact Form 7
					if (typeof wpcf7 !== 'undefined') {
						wpcf7.initForm(jQuery('.wpcf7-form'));
					}

					// scroll at the page beginning
					Scroll.scrollToTop();

					// load images
					new LazyLoad({
						scope: $nextContainer,
						setPaddingBottom: true,
						run: true
					});

					// clear & re-init ScrollMagic
					window.SMController.destroy();
					window.SMController = null;
					window.SMController = new ScrollMagic.Controller();

					// re-init components
					initComponents({
						scope: $nextContainer,
						container: $nextContainer
					});

					// don't start animations immediately
					window.SMController.enabled(false);

					// ensure that scroll is still locked
					Scroll.lock(true);

					// init Elementor frontend
					if (typeof window.elementorFrontend !== 'undefined') {
						elementorFrontend.init();
					}

					// update ad trackers
					PJAXUpdateTrackers();

					resolve(true);
				});
		});
	});
}
