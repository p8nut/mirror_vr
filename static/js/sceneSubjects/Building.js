class Building extends BasicEntity {
    constructor (sceneManager, parent) {
	super(sceneManager, parent);

	this.mesh = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.2, 32),
                                   new THREE.MeshPhongMaterial({color: 0xFF0000}));

	super.add(this.mesh);
    }
    
    onClick(intersect) {
	console.log("building clicked")
    }

    onOver(intersect) {
	console.log("building over")
    }
    
    update(time) {	
    }
    
}
