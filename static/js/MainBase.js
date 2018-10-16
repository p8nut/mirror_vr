var assetManager = AssetManager.getInstance();
assetManager.loadObject(
  "MainBase",
  "./objects/Buildings/Colony/Colony.obj",
  "./objects/Buildings/Colony/Colony.mtl"
);
var popup = PopUp.getInstance();

class MainBase extends Building {
  constructor(univers) {
    super(univers);
    this.model = assetManager.getObject("MainBase").clone();
    this.model.scale.set(0.002, 0.002, 0.002);
    this.model.rotation.y = Math.PI;
    this.add(this.model);

    var food = (this.food = 20);
    var gas = (this.gas = 10);
    var minerals = (this.minerals = 10);
    var population = (this.population = 10);

    this.lastEat = 0;
    this.eatCooldown = 5000;
    this.gameOver = false;
  }
  feedPopulation() {
    var p = this.univers.main_base.population;
    var f = this.univers.main_base.food;
    if (p <= f) f -= p;
    else {
      p -= p - f;
      f = 0;
    }
    this.univers.main_base.population = p;
    this.univers.main_base.food = f;
  }
  isFoodTime(now) {
    return this.lastEat + this.eatCooldown < now;
  }
  update(elapsedTime, delta) {
    if (this.isFoodTime(elapsedTime)) {
      this.feedPopulation();
      this.lastEat = elapsedTime;
    }
    if (this.univers.main_base.population == 0 && !this.gameOver) {
      popup.send("Your population starved to death!", 10000, "#e02416");
      this.gameOver = true;
    }
  }
  mouseClick(event, elapsedTime) {
    return true;
  }
}
