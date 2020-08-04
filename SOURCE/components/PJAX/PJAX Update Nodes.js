function PJAXUpdateNodes(data) {
	return new Promise((resolve) => {
		const
			$nextContainer = $($.parseHTML(data.next.html)),
			$currentHeader = $('#page-header'),
			$nextHeader = $nextContainer.find('#page-header'),
			nodesToUpdate = [
				'#page-header',
				'#page-footer',
				'#js-audio-background__options',
				'#js-page-transition-curtain'
			]; // selectors of elements that needed to update

		$.each(nodesToUpdate, function () {
			const
				$item = $(this),
				$nextItem = $nextContainer.find(this);

			// sync attributes if element exist in the new container
			if ($nextItem.length) {
				syncAttributes($nextItem, $item);
			}
		});

		resolve(true);
	});
}
