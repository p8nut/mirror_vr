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
    this.particleSystem = new THREE.GPUParticleSystem({
      maxParticles: 2500
    });
    this.add(this.particleSystem);
    this.tick = 0;
    this.options = {
      position: new THREE.Vector3(0, 0, 0),
      velocity: new THREE.Vector3(0, 0, 0),
      velocityRandomness: 0.05,
      positionRandomness: 0.02,
      color: 0xe9d208,
      colorRandomness: 0.2,
      turbulence: 0.1,
      lifetime: 3,
      size: 15,
      sizeRandomness: 1,
    };
    this.spawnerOptions = {
      spawnRate: 1000,
      timeScale: 0.000001
    };
    this.iconModel = assetManager.getObject("GasIcon").clone();
    this.iconModel.scale.set(0.002, 0.002, 0.002);
    this.iconModel.rotation.y = Math.PI;
    this.iconModel.position.z = -0.2;
    this.add(this.iconModel);
    this.isFactory = false;
    this.maxGain = 10;
    this.lastHarvest = 0;
    this.harvestCooldown = 3000;
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


    var deltaTime = delta * this.spawnerOptions.timeScale;
    this.tick += deltaTime;
    if (this.tick < 0) tick = 0;
    if (deltaTime > 0) {
      for (var x = 0; x < this.spawnerOptions.spawnRate * deltaTime; x++) {
        this.particleSystem.spawnParticle(this.options);
      }
    }
    this.particleSystem.update(this.tick);
  }
  static get costMineral() {
    return 20;
  }
}
