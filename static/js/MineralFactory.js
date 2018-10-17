var assetManager = AssetManager.getInstance();
assetManager.loadObject(
  "MineralFactory",
  "./objects/Buildings/MineralFactory/Mine.obj",
  "./objects/Buildings/MineralFactory/Mine.mtl"
);
assetManager.loadObject(
  "MineralIcon",
  "./objects/Items/Exclamation/Exclamation.obj",
  "./objects/Items/Exclamation/Exclamation.mtl"
);
assetManager.loadObject(
  "MineralResource",
  "./objects/Buildings/MineralResource/Minerals.obj",
  "./objects/Buildings/MineralResource/Minerals.mtl"
);

class MineralFactory extends Building {
  constructor(univers) {
    super(univers, new THREE.BoxGeometry(10, 10, 10));
    this.model = assetManager.getObject("MineralResource").clone();
    this.univers = univers;
    this.model.scale.set(0.002, 0.002, 0.002);
    this.model.rotation.y = Math.PI;
    this.add(this.model);
    this.iconModel = assetManager.getObject("MineralIcon").clone();
    this.iconModel.scale.set(0.002, 0.002, 0.002);
    this.iconModel.rotation.y = Math.PI;
    this.iconModel.position.z = -0.2;
    this.add(this.iconModel);

		this.isFactory = false;
    this.maxGain = 30;
    this.lastHarvest = 0;
    this.harvestCooldown = 5000;
  }
  
  mouseClick(event, elapsedTime) {
    if (this.isHarvestable(elapsedTime)) {
      this.univers.main_base.minerals += this.maxGain;
      this.lastHarvest = elapsedTime;
    } else if (this.isFactory == false &&
      buildingType == MineralFactory &&
      this.univers.main_base.minerals >= buildingType.costMineral) {
        super.buildFactory("MineralFactory");
    }
  }
  update(elapsedTime, delta) {
    if (this.isHarvestable(elapsedTime)) {
      this.iconModel.visible = true;
    } else {
      this.iconModel.visible = false;
    }
  }
  static get costMineral() {
    return 10;
  }
}
