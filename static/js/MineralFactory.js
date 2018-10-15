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

class MineralFactory extends Building {
  constructor(univers) {
    super(
      univers,
      new THREE.BoxGeometry(0.05, 0.05, 0.05),
      new THREE.MeshLambertMaterial({ color: 0x00ff00 })
    );
    this.model = assetManager.getObject("MineralFactory").clone();
    this.model.scale.set(0.002, 0.002, 0.002);
    this.model.rotation.y = Math.PI;
    this.add(this.model);
    this.iconModel = assetManager.getObject("MineralIcon").clone();
    this.iconModel.scale.set(0.002, 0.002, 0.002);
    this.iconModel.rotation.y = Math.PI;
    this.iconModel.position.z = -0.2;
    this.add(this.iconModel);

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
