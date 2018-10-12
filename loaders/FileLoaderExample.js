	var scene = this;
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setPath('./rsc/objmtl/SolarPanels/');
	mtlLoader.load('SolarPanels.mtl', function(materials) {
	    materials.preload();
	    var objLoader = new THREE.OBJLoader();
	    objLoader.setMaterials(materials);
	    objLoader.setPath('./rsc/objmtl/SolarPanels/');
	    objLoader.load('SolarPanels.obj', function(object) {
		object.scale.set(0.0015,0.0015,0.0015);
		object.rotation.z = Math.PI;
		object.position.y += 0.05;
		object.position.x += 0.01;
		scene.add(object);
	    });
	});	
    }
}
