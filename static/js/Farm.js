class Farm extends Building {
  constructor(univers) {
    super(
      univers,
      new THREE.BoxGeometry(0.05, 0.05, 0.05),
      new THREE.MeshLambertMaterial({ color: 0x00ff00 })
    );
    this.buildingDelay = 1000;
    this.maxGain = 15;
    this.lastHarvest = 0;
    this.harvestCooldown = 4000;
  };
    update(){
	
    }
  mouseClick() {
    if (this.harvestCooldown + this.lastHarvest < performance.now()) {
      this.lastHarvest = performance.now();
      this.univers.main_base.food += this.maxGain;
    }
  };
  static get costMineral() {
    return 10;
  };
}
