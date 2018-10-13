class Building extends BasicEntity {
  constructor(univers) {
    super(
      univers,
      new THREE.BoxGeometry(0.05, 0.05, 0.05),
      new THREE.MeshPhongMaterial({ color: 0xff0000 })
    );
    this.buildingDelay = 0;
    this.costMineral = 0;
    this.costGas = 0;
    this.isDestructed = false;
    this.maxGain = 0;
    this.lastHarvest = 0;
    this.harvestCooldown = 0;
  }
  mouseClick() {
    if (this.harvestCooldown + this.lastHarvest < performance.now()) {
      this.lastHarvest = performance.now();
      this.univers.main_base.minerals += this.maxGain;
    }
    return true;
  }
  update(elapsedTime, delta) {
    if (this.harvestCooldown + this.lastHarvest < performance.now()) {
      /* display icon */
    }
  };
}