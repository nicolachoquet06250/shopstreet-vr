AFRAME.registerComponent('meteo', {
	schema: {
		active: {
			default: true
		}
	},
	init: function () {
		this.openstreetmap_url = 'https://nominatim.openstreetmap.org/reverse?format=json';
		this.longParam = 'lon';
		this.latParam = 'lat';
		this.addressdetails = '1';
		this.meteo_url = 'https://www.prevision-meteo.ch/services/json/';

		if (this.data.active) {
			new Promise(resolve => navigator.geolocation.getCurrentPosition(resolve)).then(position => {
				fetch(`${this.openstreetmap_url}&${this.latParam}=${position.coords.latitude}&${this.longParam}=${position.coords.longitude}&addressdetails=${this.addressdetails}`)
					.then(r => r.json())
					.then(json => json.address.town)
					.then(ville => fetch(`${this.meteo_url}${ville}`)).then(r => r.json()).then(json => {
					console.log(json);
				});
			})
		}
	}
});

/*AFRAME.registerComponent('position-reader', {
	schema: {
		oldPosition: {
			type: 'vec3',
			default: {x: 0, y: 0, z: 0}
		}
	},
	tick: function () {
		var position = this.el.getAttribute('position');
		if (position.x !== this.data.oldPosition.x || position.y !== this.data.oldPosition.y || position.z !== this.data.oldPosition.z) {
			this.data.oldPosition = {
				x: position.x,
				y: position.y,
				z: position.z
			};
			this.el.dispatchEvent(
				new CustomEvent("position-change", {
					detail: {
						newPosition: {
							x: position.x,
							y: position.y,
							z: position.z
						},
						oldPosition: this.data.oldPosition
					},
					bubbles: true,
					cancelable: true
				})
			);
			this.el.addEventListener('position-change', e => {
				console.log(e);
			})
			// this.el.setAttribute('position', `${position.x} ${position.y} ${position.z}`);
		}
	}
});*/
