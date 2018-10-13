class MineralFactory extends Building {
  constructor(univers) {
    super(
      univers,
      new THREE.BoxGeometry(0.05, 0.05, 0.05),
      new THREE.MeshLambertMaterial({ color: 0x00ff00 })
    );
    this.icon = new BasicEntity(
      this,
      new THREE.BoxGeometry(0.05, 0.05, 0.05),
      new THREE.MeshLambertMaterial({ color: 0x00ff00 })
    );
    this.icon.position.z = -0.2;
    this.buildingDelay = 4;
    this.maxGain = 30;
    this.lastHarvest = 0;
    this.harvestCooldown = 5;
  }
  isHarvestable(now) {
    return this.lastHarvest + this.harvestCooldown < now;
  }
  mouseClick(event, elapsedTime) {
    if (this.isHarvestable(elapsedTime)) {
      this.univers.main_base.minerals += this.maxGain;
      this.lastHarvest = elapsedTime;
    }
  }
  update(elapsedTime, delta) {
    if (this.isHarvestable(elapsedTime)) this.icon.visible = true;
    else this.icon.visible = false;
  }
  static get costMineral() {
    return 10;
  }
}
