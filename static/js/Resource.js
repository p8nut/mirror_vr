class Resource extends BasicEntity {
    constructor(univers) {
	super(univers,
	      new THREE.BoxGeometry(0.05, 0.05, 0.05),
	      new THREE.MeshLambertMaterial({color: 0xFFFF00}));
    }
    mouseClick(){
	console.log("show resources info")
	return true
    }
}
