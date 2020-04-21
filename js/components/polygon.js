AFRAME.registerComponent('polygon', {
	init: function() {
		var x = 0,
			y = 0;
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
			amount: 5,
			bevelEnabled: false
		});

		// Geometry doesn't do much on its own, we need to create a Mesh from it
		var extrudedMesh = new THREE.Mesh(extrudedGeometry, new THREE.MeshPhongMaterial({
			color: 'blue'
		}));
		this.el.object3D.add(extrudedMesh);

		var geometry = new THREE.ShapeGeometry(shape);
		var material = new THREE.MeshBasicMaterial({
			color: 'blue'
		});
		var mesh = new THREE.Mesh(geometry, material);
		this.el.object3D.add(mesh);
	}
});
