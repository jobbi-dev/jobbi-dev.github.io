function fontObserver() {

	return new Promise(function (resolve, reject) {

		const observers = [];

		if (!window.theme.fonts) {
			resolve(true);
		}

		$.each(window.theme.fonts, function () {
			const currentObserver = new FontFaceObserver(this);

			observers.push(currentObserver.load());
		});

		Promise
			.all(observers)
			.then(() => {
				resolve(true);
			})
			.catch(() => {
				console.error('Font Observer: There is an error occured while loading one or more fonts.');
				reject(true);
			});

	});

}
