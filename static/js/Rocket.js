var assetManager = AssetManager.getInstance();
assetManager.loadObject(
  "Rocket",
  "./objects/Buildings/Rocket/Rocket.obj",
  "./objects/Buildings/Rocket/Rocket.mtl"
);
var popup = PopUp.getInstance();

class Rocket extends Building {
  constructor(univers) {
    super(univers, new THREE.BoxGeometry(0.05, 0.05, 0.05));
    this.model = assetManager.getObject("Rocket").clone();
    this.model.scale.set(0.002, 0.002, 0.002);
    this.model.rotation.y = Math.PI;
    this.add(this.model);
		
		this.isLaunched = false;
    this.maxGain = 15;
    this.lastHarvest = 0;
    this.speedValue = 0;
    this.planet = univers;
    this.popuped = false;
  }
  isLaunchable() {
    return this.univers.main_base.gas >= Rocket.costGas;
  }
  update(elapsedTime, delta) {
    if (this.isLaunched) {
      this.model.position.x += this.speedValue;
      this.speedValue += 0.0001;
      this.lookAt(this.planet.position);
    }
  }
  mouseClick(event, elapsedTime) {
    if (this.isLaunchable()) {
      this.univers.main_base.gas -= Rocket.costGas;
      this.isLaunched = true;
      popup.send("You saved the population in time !", 10000, "#00FF00", "big");
      popup.reload();
    }
    else {
      popup.send("You need 300 gas to launch a rocket");
    }
  }
  static get costMineral() {
    return 200;
  }
  static get costGas() {
    return 300;
  }
}
