class Rocket extends Building {
  constructor(univers) {
    super(
      univers,
      new THREE.BoxGeometry(0.05, 0.05, 0.05),
      new THREE.MeshLambertMaterial({ color: 0x00ff00 })
    );
    this.buildingDelay = 5;
    this.maxGain = 15;
    this.lastHarvest = 0;
  }
  mouseClick(event, elapsedTime) {
    if (this.univers.main_base.gas >= Rocket.costGas)
      this.univers.main_base.gas -= Rocket.costGas;
      // launch Rocket
  }
  static get costMineral() {
    return 200;
  }
  static get costGas() {
    return 300;
  }
}
