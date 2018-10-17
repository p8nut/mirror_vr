class Building extends BasicEntity {
  constructor(univers, mesh) {
    super(univers, new THREE.BoxGeometry(0.1, 0.1, 0.1));
    this.maxGain = 0;
    this.lastHarvest = 0;
    this.harvestCooldown = 0;
    this.isFactory = false;
};
  
  isHarvestable(now) {
    return this.lastHarvest + this.harvestCooldown < now && this.isFactory == true;
  }

  buildFactory(meshName, elapsedTime){
    this.isFactory = true;
    if (this.model)
      this.remove(this.model)
    else if (this.particleSystem)
      this.remove(this.particleSystem);
    this.model = assetManager.getObject(meshName).clone();
    this.model.scale.set(0.002, 0.002, 0.002);
    this.model.rotation.y = Math.PI;
    this.univers.main_base.minerals -= buildingType.costMineral;
    buildingType = null;
    this.lastHarvest = elapsedTime;
    this.univers.main_base.population += 1;
    this.add(this.model);
  }

  mouseClick(event, elapsedTime) {
    return true;
  }
  update(elapsedTime, delta) {
  }
  static get costMineral() {
    return 10;
  }
  static get costGas() {
    return 0;
  }
}
