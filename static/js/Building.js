class Building extends BasicEntity {
  constructor(univers, mesh) {
    super(univers, new THREE.BoxGeometry(0.1, 0.1, 0.1));
    this.buildingDelay = 0;
    this.maxGain = 0;
    this.lastHarvest = 0;
    this.harvestCooldown = 0;
  }
  mouseClick(event, elapsedTime) {
    return true;
  }
  update(elapsedTime, delta) {}
  static get costMineral() {
    return 10;
  }
  static get costGas() {
    return 0;
  }
}
