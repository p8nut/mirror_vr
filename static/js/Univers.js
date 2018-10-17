var assetManager = AssetManager.getInstance();
assetManager.loadCubeTexture("space", "objects/Textures/space.png");

var popup = PopUp.getInstance();

class Univers extends Physijs.Scene {
  constructor(canvas) {
    super();

    this.background = new THREE.Color("#000000");
    this.setGravity(new THREE.Vector3(0, 0, 0));
    this.add(new THREE.AmbientLight(0xffffff, 0.05));

    this.canvas = canvas;
    this.raycaster = new THREE.Raycaster();

    //////////////// BEGIN PLANET //////////////
    const planet = (this.planet = new Planet(this));
    planet.position.set(0, 1, 0);
    const main_base = (this.main_base = this.planet.main_base);
    //////////////// END PLANET //////////////

    //////////////// BEGIN SUN /////////////////
    const sun = (this.sun = new Sun(this));
    sun.position.x = 8000;

    this.add(sun);
    //////////////// END SUN ///////////////////

    //////////////// BEGIN CAMERA //////////////
    const controller = (this.controller = new THREE.Group());
    controller.position.set(0, 0, 3);
    this.add(controller);

    const camera = (this.camera = Univers.buildCamera(this.canvas));
    controller.add(camera);
    camera.lookAt(this.planet.position);
    //////////////// END CAMERA ////////////////

    this.background = assetManager.getCubeTexture("space");
    this.createNaturalDisaster();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  createNaturalDisaster() {
    setTimeout(meteor, 300000, this, true);
    setTimeout(function() {
      popup.send("GAME OVER!", 5000, "#e02416");
    }, 300000);

    var timer = this.getRandomInt(30, 270) * 1000;
    var msgTimer = timer - 10000;
    setTimeout(meteor, timer, this);
    setTimeout(function() {
      popup.send("Small comet incoming! Destory it!", 5000, "#e02416");
    }, msgTimer);
  }

  static buildCamera(canvas) {
    const aspectRatio = canvas.width / canvas.height;
    const fieldOfView = 60;
    const nearPlane = 0.15;
    const farPlane = 1000000;
    return new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
  }

  resize() {
    const camera = this.camera;

    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();
  }

  update(elapsedTime, delta) {
    for (let i = 0; i < this.children.length; ++i) {
      if (this.children[i].update) {
        this.children[i].update(elapsedTime, delta);
      }
    }
  }

  render(renderer) {
    renderer.render(this, this.camera);
    this.simulate();
  }

  mouseMove() {}

  mouseClick(event, elapsedTime) {
    let intersects = Univers.findIntersects(this, event);
    for (let i = 0; i < intersects.length; i++) {
      const intersect = intersects[i];
      if (intersect.object && intersect.object.mouseClick) {
        if (intersect.object.mouseClick(intersect, elapsedTime) === true)
          return true;
      }
    }
    return false;
  }

  static findIntersects(world, event) {
    var intersect = null;
    let m = new THREE.Vector2();
    m.x = (event.clientX / window.innerWidth) * 2 - 1;
    m.y = -(event.clientY / window.innerHeight) * 2 + 1;

    world.raycaster.setFromCamera(m, world.camera);
    let intersects = world.raycaster.intersectObjects(world.children, true);

    return intersects;
  }
}
