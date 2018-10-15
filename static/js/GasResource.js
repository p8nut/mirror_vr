class GasResource extends BasicEntity {
    constructor(univers) {
	super(univers,
	      new THREE.BoxGeometry(0.05, 0.05, 0.05),
          new THREE.MeshLambertMaterial({color: 0x00FF00}));
    this.univers = univers;
    }
    mouseClick(event, elapsedTime){
    if (buildingType == GasFactory)
      this.add(new GasFactory(this.univers))
	return true
    }
}
