function PJAXUpdateAdminBar(data) {
	return new Promise(function (resolve, reject) {
		const $currentBar = $('#wpadminbar');

		if (!$currentBar.length) {
			resolve(true);
			return;
		}

		const
			rawHTML = $.parseHTML(data.next.html),
			$newBar = $(rawHTML).filter('#wpadminbar');

		$newBar.find('.hide-if-no-customize').removeClass('hide-if-no-customize');
		$currentBar.replaceWith($newBar);

		resolve(true);
	});
}
