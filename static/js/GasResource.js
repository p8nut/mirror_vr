class GasResource extends BasicEntity {
    constructor(univers) {
	super(univers,
	      new THREE.BoxGeometry(0.05, 0.05, 0.05),
	      new THREE.MeshLambertMaterial({color: 0x00FF00}));
    }
    mouseClick(event, elapsedTime){
	return true
    }
}
