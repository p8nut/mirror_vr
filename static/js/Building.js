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

class Tower extends Building {
    constructor(univers) {
	super(univers)
	const tower = new THREE.Mesh(new THREE.IcosahedronGeometry(0.035, 1),
				     new THREE.MeshPhongMaterial({color: 0xFFFF00}))
	this.add(tower);
	tower.position.set(0,0,-0.03);
	
    }
}
