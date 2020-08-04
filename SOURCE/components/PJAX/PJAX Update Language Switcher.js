function PJAXUpdateLanguageSwitcher(data) {
	return new Promise((resolve) => {
		const $currentSwitcher = $('.lang-switcher');

		if (!$currentSwitcher.length) {
			resolve(true);
			return;
		}

		const
			rawHTML = $.parseHTML(data.next.html),
			$newSwitcher = $(rawHTML).find('.lang-switcher');

		$currentSwitcher.replaceWith($newSwitcher);
		resolve(true);
	});
}
