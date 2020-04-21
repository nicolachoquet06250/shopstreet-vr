AFRAME.registerComponent('meteo', {
	init: function () {
		this.openstreetmap_url = 'https://nominatim.openstreetmap.org/reverse?format=json';
		this.longParam = 'lon';
		this.latParam = 'lat';
		this.addressdetails = '1';
		this.meteo_url = 'https://www.prevision-meteo.ch/services/json/';

		new Promise(resolve => navigator.geolocation.getCurrentPosition(resolve)).then(position => {
			fetch(`${this.openstreetmap_url}&${this.latParam}=${position.coords.latitude}&${this.longParam}=${position.coords.longitude}&addressdetails=${this.addressdetails}`)
				.then(r => r.json())
				.then(json => json.address.town)
				.then(ville => fetch(`${this.meteo_url}${ville}`)).then(r => r.json()).then(json => {
				console.log(json);
			});
		})
	}
});
