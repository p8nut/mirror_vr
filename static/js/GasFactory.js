var assetManager = AssetManager.getInstance();
assetManager.load(
  "gasFactory",
  "./objects/Buildings/GasFactory/GasFactory.obj",
  "./objects/Buildings/GasFactory/GasFactory.mtl"
);

class GasFactory extends Building {
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
    this.model = assetManager.getObject("gasFactory").clone();
    this.model.scale.set(0.002, 0.002, 0.002);
    this.model.rotation.y = Math.PI;
    this.add(this.model);
    
    this.buildingDelay = 2;
    this.maxGain = 10;
    this.lastHarvest = 0;
    this.harvestCooldown = 3;
  }
  isHarvestable(now) {
    return this.lastHarvest + this.harvestCooldown < now;
  }
  mouseClick(event, elapsedTime) {
    if (this.isHarvestable(elapsedTime)) {
      this.univers.main_base.gas += this.maxGain;
      this.lastHarvest = elapsedTime;
    }
  }
  update(elapsedTime, delta) {
    if (this.isHarvestable(elapsedTime)) this.icon.visible = true;
    else this.icon.visible = false;
  }
  static get costMineral() {
    return 20;
  }
}
