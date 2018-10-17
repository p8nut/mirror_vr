var assetManager = AssetManager.getInstance();
assetManager.loadObject(
  "Farm",
  "./objects/Buildings/Farm/Farm.obj",
  "./objects/Buildings/Farm/Farm.mtl"
);
assetManager.loadObject(
  "FarmIcon",
  "./objects/Items/Exclamation/Exclamation.obj",
  "./objects/Items/Exclamation/Exclamation.mtl"
);

class Farm extends Building {
  constructor(univers) {
    super(univers, new THREE.BoxGeometry(0.05, 0.05, 0.05));
    this.model = assetManager.getObject("Farm").clone();
    this.model.scale.set(0.002, 0.002, 0.002);
    this.model.rotation.y = Math.PI;
    this.add(this.model);
    this.iconModel = assetManager.getObject("FarmIcon").clone();
    this.iconModel.scale.set(0.002, 0.002, 0.002);
    this.iconModel.rotation.y = Math.PI;
    this.iconModel.position.z = -0.2;
    this.add(this.iconModel);

    this.maxGain = 100;
    this.lastHarvest = 0;
    this.harvestCooldown = 9000;

    univers.main_base.population += 2;
    univers.main_base.food -= 80;
  }
  isHarvestable(now) {
    return this.lastHarvest + this.harvestCooldown < now;
  }
  mouseClick(event, elapsedTime) {
    if (this.isHarvestable(elapsedTime)) {
      this.univers.main_base.food += this.maxGain;
      this.lastHarvest = elapsedTime;
    }
  }
  update(elapsedTime, delta) {
    if (this.isHarvestable(elapsedTime)) this.iconModel.visible = true;
		else this.iconModel.visible = false;
  }
  static get costMineral() {
    return 10;
  }
}
