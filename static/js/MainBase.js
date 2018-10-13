var assetManager = AssetManager.getInstance();
assetManager.load(
  "MainBase",
  "./objects/Buildings/Colony/Colony.obj",
  "./objects/Buildings/Colony/Colony.mtl"
);

class MainBase extends Building {
  constructor(univers) {
    super(univers);
    const tower = new BasicEntity(
      this,
      new THREE.IcosahedronGeometry(0.035, 1),
      new THREE.MeshPhongMaterial({ color: 0xff0000 })
    );
    this.model = assetManager.getObject("MainBase").clone();
    this.model.scale.set(0.002, 0.002, 0.002);
    this.model.rotation.y = Math.PI;
    this.add(this.model);
    var food = (this.food = 10);
    var gas = (this.gas = 10);
    var minerals = (this.minerals = 10);
    var population = (this.population = 10);
  }

  mouseClick(event, elapsedTime) {
    console.log("MainBase clicked");
    return true;
  }
}
