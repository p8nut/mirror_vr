var assetManager = AssetManager.getInstance();
assetManager.loadObject(
  "MainBase",
  "./objects/Buildings/Colony/Colony.obj",
  "./objects/Buildings/Colony/Colony.mtl"
);

class MainBase extends Building {
  constructor(univers) {
    super(univers);
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
    return true;
  }
}
