var assetManager = AssetManager.getInstance();
assetManager.loadObject(
  "GasFactory",
  "./objects/Buildings/GasFactory/GasFactory.obj",
  "./objects/Buildings/GasFactory/GasFactory.mtl"
);
assetManager.loadObject(
  "GasIcon",
  "./objects/Items/Exclamation/Exclamation.obj",
  "./objects/Items/Exclamation/Exclamation.mtl"
);

class GasFactory extends Building {
  constructor(univers) {
    super(univers, new THREE.BoxGeometry(0.05, 0.05, 0.05));
    this.model = assetManager.getObject("GasFactory").clone();
    this.model.scale.set(0.002, 0.002, 0.002);
    this.model.rotation.y = Math.PI;
    this.add(this.model);
    this.iconModel = assetManager.getObject("GasIcon").clone();
    this.iconModel.scale.set(0.002, 0.002, 0.002);
    this.iconModel.rotation.y = Math.PI;
    this.iconModel.position.z = -0.2;
    this.add(this.iconModel);
    this.isFactory = false;
    this.buildingDelay = 2000;
    this.maxGain = 10;
    this.lastHarvest = 0;
    this.harvestCooldown = 3000;

    univers.main_base.population += 10;
  }
  
  mouseClick(event, elapsedTime) {
    if (this.isHarvestable(elapsedTime)) {
      this.univers.main_base.gas += this.maxGain;
      this.lastHarvest = elapsedTime;
    } else if (this.isFactory == false &&
      buildingType == GasFactory &&
      this.univers.main_base.minerals >= buildingType.costMineral) {
        super.buildFactory("GasFactory");
    }
  }
  update(elapsedTime, delta) {
    if (this.isHarvestable(elapsedTime))
      this.iconModel.visible = true;
    else
      this.iconModel.visible = false;
  }
  static get costMineral() {
    return 20;
  }
}
