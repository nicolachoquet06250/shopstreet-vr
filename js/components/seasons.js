AFRAME.registerComponent('seasons', {
	schema: {
		active: { default: true }
	},
	init() {
		if (this.data.active) {
			let currentYear =  (new Date()).getFullYear();
			fetch(`https://kalendrier.ouest-france.fr/dates-changements-saisons-${currentYear}.html`).then(r => r.text())
				.then(html => {
					let parser = new DOMParser();
					let dom = parser.parseFromString(html, 'text/html');
					console.log(dom.querySelector('table#saisons'));
				});
		}
	}
});
