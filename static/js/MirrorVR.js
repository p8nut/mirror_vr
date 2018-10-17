class MirrorVR {
  constructor(canvas) {
    this.canvas = canvas;

    const oldTime = (this.oldTime = 0);
    const elapsedTime = (this.elapsedTime = 0);
    const deltaTime = (this.deltaTime = 0);

    //////////////// BEGIN RENDRER /////////////
    const renderer = (this.renderer = new Renderer(canvas));
    //////////////// END RENDERER //////////////

    //////////////// BEGIN SCENE ///////////////
    const univers = (this.univers = new Univers(canvas));
    const controller = (this.controller = univers.controller);
    const camera = (this.camera = univers.camera);
    const planet = (this.planet = univers.planet);
    const main_base = planet.main_base;
    //////////////// END SCENE /////////////////

    //////////////// BEGIN HUD /////////////////
    const hud = (this.hud = new HUD(canvas, univers));
    const ihm = (this.ihm = new IHM(univers));
    //////////////// END HUD ///////////////////
  }

  update() {
    const oldTime = (this.oldTime = this.elapsedTime);
    const elapsedTime = (this.elapsedTime = performance.now());
    const deltaTime = (this.deltaTime = this.elapsedTime - this.oldTime);

    this.univers.update(elapsedTime, deltaTime);
    this.hud.update(elapsedTime, deltaTime);
    this.ihm.update(elapsedTime, deltaTime);

    this.renderer.clear();
    this.univers.render(this.renderer);
    this.renderer.clearDepth();
    this.hud.render(this.renderer);
  }

  windowResize() {
    const camera = this.camera;
    this.univers.resize();
    this.hud.resize();

    this.renderer.resize();
  }

  mouseMove(event) {
    event.preventDefault();
    this.hud.mouseMove(event);
    this.univers.mouseMove(event);
  }

  mouseClick(event) {
    event.preventDefault();
    if (this.hud.mouseClick(event) !== true) {
      this.univers.mouseClick(event, this.elapsedTime);
    }
  }

  mouseDoubleClick(event) {
    event.preventDefault();
  }
}
