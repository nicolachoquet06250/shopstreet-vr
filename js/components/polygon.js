AFRAME.registerComponent('polygon', {
	schema: {
		color: { type: 'color', default: 'red' }
	},

	init: function() {
		let points = [];
		points.push(new THREE.Vector2(0, 0));
		points.push(new THREE.Vector2(3, 0));
		points.push(new THREE.Vector2(5, 2));
		points.push(new THREE.Vector2(5, 5));
		points.push(new THREE.Vector2(5, 5));
		points.push(new THREE.Vector2(2, 7));

		for (var i = 0; i < points.length; i++) {
			points[i].multiplyScalar(0.25);
		}
		var shape = new THREE.Shape(points);

		var extrudedGeometry = new THREE.ExtrudeGeometry(shape, {
			depth: 5,
			bevelEnabled: false
		});

		// Geometry doesn't do much on its own, we need to create a Mesh from it
		var extrudedMesh = new THREE.Mesh(extrudedGeometry, new THREE.MeshPhongMaterial({
			color: this.data.color
		}));
		this.el.object3D.add(extrudedMesh);

		var geometry = new THREE.ShapeGeometry(shape);
		var material = new THREE.MeshBasicMaterial({
			color: this.data.color
		});
		var mesh = new THREE.Mesh(geometry, material);
		this.el.object3D.add(mesh);
	}
});

AFRAME.registerComponent('wobble-normal', {
	schema: {},
	tick: function (t) {
		if (!this.el.components.material.material.normalMap) return;
		this.el.components.material.material.normalMap.offset.x += 0.0001 * Math.sin(t/10000);
		this.el.components.material.material.normalMap.offset.y += 0.0001 * Math.cos(t/8000);
		this.el.components.material.material.normalScale.x = 0.5 + 0.5 * Math.cos(t/1000);
		this.el.components.material.material.normalScale.x = 0.5 + 0.5 * Math.sin(t/1200);
	}
})

AFRAME.registerPrimitive('a-ocean-plane', {
	defaultComponents: {
		geometry: {
			primitive: 'plane',
			height: 10000,
			width: 10000
		},
		rotation: '-90 0 0',
		material: {
			shader: 'standard',
			color: 'blue',
			metalness: 1,
			roughness: 0.2,
			normalMap: 'url(https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/waternormals.jpg)',
			normalTextureRepeat: '50 50',
			normalTextureOffset: '0 0',
			normalScale: '0.5 0.5',
			opacity: 1
		},
		'wobble-normal': {}
	},
});

AFRAME.registerComponent('collide-listener', {
	init: function() {
		this.el.addEventListener('collide', function(e) {
			console.log('Player has collided with ', e);

			// e.detail.target.el; // Original entity (playerEl).
			// e.detail.body.el; // Other entity, which playerEl touched.
			// e.detail.contact; // Stats about the collision (CANNON.ContactEquation).
			// e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
		});
	}
});
