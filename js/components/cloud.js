AFRAME.registerComponent('cloud', {
	schema: {
		color: { type: 'color', default: 'white' },
		type: { type: 'string', default: 'normal' }
	},
	createCloudSphere(position) {
		switch (this.data.type) {
			case 'normal':
				this.data.color = 'white';
				break;
			case 'gray':
				this.data.color = 'lightgray';
				break;
			case 'raining':
				this.data.color = 'darkgray';
				break;
		}
		let sphere = document.createElement('a-sphere');
		sphere.setAttribute('radius', 3);
		sphere.setAttribute('color', this.data.color);
		sphere.setAttribute('position', position);

		return sphere;
	},
	createRain() {
		let goutte = document.createElement('a-box');
		goutte.setAttribute('width', 1);
		goutte.setAttribute('height', 1);
		goutte.setAttribute('depth', 1);
		goutte.setAttribute('color', 'blue');
		goutte.setAttribute('static-body', '');
		goutte.setAttribute('position', { x: 0, y: -1, z: 0 });
		let interval = setInterval(() => {
			let new_position = goutte.getAttribute('position');
			new_position.y -= 0.2;
			new_position.x -= 0.1;
			console.log(new_position.y);
			if (new_position.y <= -99) {
				clearInterval(interval);
				this.el.removeChild(goutte);
			}
			goutte.setAttribute('position', new_position);
		}, 50);
		this.el.appendChild(goutte);
	},

	init() {
		this.el.appendChild(this.createCloudSphere({ x: 0, y: 0, z: 0 }));
		this.el.appendChild(this.createCloudSphere({ x: 1.5, y: 0, z: 0 }));
		this.el.appendChild(this.createCloudSphere({ x: 0, y: 0, z: 1.5 }));
		this.el.appendChild(this.createCloudSphere({ x: 1.5, y: 0, z: 1.5 }));
		this.el.appendChild(this.createCloudSphere({ x: 1.5, y: 0, z: 3 }));
		this.el.appendChild(this.createCloudSphere({ x: 3, y: 0, z: 1.5 }));
		this.el.appendChild(this.createCloudSphere({ x: 3, y: 0, z: 3 }));
		this.el.appendChild(this.createCloudSphere({ x: 3, y: 0, z: 4.5 }));
		this.el.appendChild(this.createCloudSphere({ x: 4.5, y: 0, z: 3 }));
		this.el.appendChild(this.createCloudSphere({ x: 4.5, y: 0, z: 4.5 }));

		switch (this.data.type) {
			case 'raining':
				this.createRain();
				break;
		}
	}
});

AFRAME.registerPrimitive('a-cloud', {
	defaultComponents: {
		cloud: {}
	},
	mappings: {
		color: 'cloud.color',
		type: 'cloud.type'
	}
})
