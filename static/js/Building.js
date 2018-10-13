class Building extends BasicEntity {
  constructor(univers) {
    super(
      univers,
      new THREE.BoxGeometry(0.05, 0.05, 0.05),
      new THREE.MeshPhongMaterial({ color: 0xff0000 })
    );
    this.buildingDelay = 0;
    this.maxGain = 0;
    this.lastHarvest = 0;
    this.harvestCooldown = 0;
  };
  mouseClick(event, elapsedTime) {
    return true;
  };
  update(elapsedTime, delta) {
    if (this.harvestCooldown + this.lastHarvest < performance.now()) {
      /* display icon */
    }
  };
  static get costMineral() {
    return 10;
  };
  static get costGas() {
    return 0;
  };
}
