class Building extends BasicEntity {
  constructor(univers) {
    super(
      univers,
      new THREE.BoxGeometry(0.1, 0.1, 0.1),
      new THREE.MeshPhongMaterial({ color: 0xff0000 })
    );
    this.buildingDelay = 0;
    this.maxGain = 0;
    this.lastHarvest = 0;
    this.harvestCooldown = 0;
  };
  isHarvestable(now) {
    return this.lastHarvest + this.harvestCooldown < now && this.isFactory == true;
  }
  
  buildFactory(meshName){
    this.isFactory = true;
    this.remove(this.model)
    this.model = assetManager.getObject(meshName).clone();
    this.model.scale.set(0.002, 0.002, 0.002);
    this.model.rotation.y = Math.PI;
    this.univers.main_base.minerals -= buildingType.costMineral;
    buildingType = null;
    this.univers.main_base.population += 10;
    this.add(this.model);
  }

  mouseClick(event, elapsedTime) {
    return true;
  };
  update(elapsedTime, delta) {
  };
  static get costMineral() {
    return 10;
  };
  static get costGas() {
    return 0;
  };
}
