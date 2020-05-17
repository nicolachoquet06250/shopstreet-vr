AFRAME.registerComponent('building', {
	schema: {
		// link
		destination: { type: "string" },
		image: { type: "string" },
		title: { type: "string" },
		// building
		radius: { type: "int", default: 5 },
		modules: { type: "int", default: 1 },
		// position
		rotation: { type: "vec3", default: { x: 0, y: 0, z: 55 } },
		rotationY: { type: "int", default: 0 },
		// material
		metalness: { type: "int", default: 1 }
	},
	createModule(position) {
		let {radius, metalness, rotation, rotationY} = this.data;
		let module = document.createElement('a-dodecahedron');
		module.setAttribute('radius', radius);
		module.setAttribute('metalness', metalness);
		// module.setAttribute('color', this.el.getAttribute('color'));
		module.setAttribute('color', 'yellow');
		module.setAttribute('static-body', '');
		module.setAttribute('position', position);
		module.setAttribute('rotation', { x: 0, y: rotationY, z: 0 });
		return module;
	},
	init() {
		if (this.el.getAttribute('href')) this.data.destination = this.el.getAttribute('href');
		if (this.el.getAttribute('image')) this.data.image = this.el.getAttribute('image');
		if (this.el.getAttribute('title')) this.data.title = this.el.getAttribute('title');
		if (this.el.getAttribute('radius')) this.data.radius = parseInt(this.el.getAttribute('radius'));
		if (this.el.getAttribute('modules')) this.data.modules = parseInt(this.el.getAttribute('modules'));
		if (this.el.getAttribute('rotationY')) this.data.rotationY = parseInt(this.el.getAttribute('rotationY'));
		if (this.el.getAttribute('metalness')) this.data.metalness = parseInt(this.el.getAttribute('metalness'));

		let { radius, rotation, rotationY, destination, title, image, metalness, modules } = this.data;

		let box = document.createElement('a-box');
		box.setAttribute('width', radius);
		box.setAttribute('height', radius);
		box.setAttribute('depth', radius);
		box.setAttribute('visible', 'false');
		box.setAttribute('static-body', '');
		this.el.appendChild(box);

		let link = document.createElement('a-link');
		link.setAttribute('href', destination);
		link.setAttribute('title', title);
		link.setAttribute('image', image);
		link.setAttribute('position', '-5.9 5 0');
		link.setAttribute('rotation', '55 90 0');
		link.classList.add('portals');
		this.el.appendChild(link);

		// modules = 1;

		if (modules > 1) {
			modules--;

			// for (let m = 1; m <= modules; m++) {
				let m = 1;
				this.el.appendChild(this.createModule({ x: 6.5, y: 5, z: 0 }));

				// this.el.appendChild(this.createModule({ x: 0, y: 8, z: 0}));

				// this.el.appendChild(this.createModule({ x: 0, y: 12, z: 0}));
			// }
		}

		this.el.setAttribute('radius', radius);
		this.el.setAttribute('metalness', metalness);
		this.el.setAttribute('rotation', `${rotation.x} ${rotationY} ${rotation.z}`);
	}
});

AFRAME.registerPrimitive('a-building', {
	defaultComponents: {
		building: {},
		geometry: { primitive: 'dodecahedron' },
		material: {}
	},
	mappings: {
		href: 'building.destination',
		image: 'building.image',
		title: 'building.title',
		radius: 'geometry.radius',
		color: 'material.color',
		metalness: 'material.metalness',
		modules: 'building.modules'
	}
});
