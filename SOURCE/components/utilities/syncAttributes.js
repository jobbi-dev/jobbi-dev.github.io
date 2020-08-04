function syncAttributes($sourceElement, $targetElement) {
	if (!$sourceElement.length || !$targetElement.length) {
		return;
	}

	$targetElement.attr($sourceElement.getAllAttributes());
}
