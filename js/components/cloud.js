AFRAME.registerComponent('cloud', {
	schema: {
		color: { type: 'color', default: 'white' }
	},
	createCloudSphere(position) {
		let sphere = document.createElement('a-sphere');
		sphere.setAttribute('radius', 3);
		sphere.setAttribute('color', this.data.color);
		sphere.setAttribute('position', position);

		return sphere;
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
	}
});

AFRAME.registerPrimitive('a-cloud', {
	defaultComponents: {
		cloud: {}
	},
	mappings: {
		color: 'cloud.color'
	}
})
