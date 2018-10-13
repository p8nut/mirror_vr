class MineralFactory extends Building {
  constructor(univers) {
    super(
      univers,
      new THREE.BoxGeometry(0.05, 0.05, 0.05),
      new THREE.MeshLambertMaterial({ color: 0x00ff00 })
    );
    this.buildingDelay = 4000;
    this.isDestructed = false;
    this.maxGain = 30;

    this.lastHarvest = 0;
    this.harvestCooldown = 5000;
  }
  static get costMineral(){return 10};
  static get costGas(){return 0};
}