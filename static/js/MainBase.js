class MainBase extends Building {
    constructor(univers) {
	super(univers)
	const tower = new BasicEntity(this,
				      new THREE.IcosahedronGeometry(0.035, 1),
				      new THREE.MeshPhongMaterial({color: 0xFFFF00}))
	//this.add(tower);
	tower.position.set(0,0,-0.03);

	var food = this.food = 10;
	var gas = this.gas = 10;
	var minerals = this.minerals = 10;
	var population = this.population = 10;
    }

    mouseClick(event) {
	console.log("MainBase clicked")
	return true;
    }
}
