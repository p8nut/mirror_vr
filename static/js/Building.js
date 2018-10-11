class Building extends BasicEntity {
    constructor(univers) {
	super(univers,
	      new THREE.BoxGeometry(0.05, 0.05, 0.05),
	      new THREE.MeshPhongMaterial({color: 0xFF0000}));
    }

    mouseClick() {
	console.log("show building info")
	return true;
    }
}

