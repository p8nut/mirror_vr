class GasFactory extends Building {
  constructor(univers) {
    super(
      univers,
      new THREE.BoxGeometry(0.05, 0.05, 0.05),
      new THREE.MeshLambertMaterial({ color: 0x00ff00 })
    );
    this.buildingDelay = 2000;
    this.maxGain = 10;
    this.lastHarvest = 0;
    this.harvestCooldown = 3000;
  };
  mouseClick() {
    if (this.harvestCooldown + this.lastHarvest < performance.now()) {
      this.lastHarvest = performance.now();
      this.univers.main_base.gas += this.maxGain;
    }
  };
  static get costMineral() {
    return 20;
  };
}
