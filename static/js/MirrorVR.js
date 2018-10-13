class MirrorVR{
    constructor(canvas) {
	this.canvas = canvas
	
	this.clock = new THREE.Clock();
	//////////////// BEGIN RENDRER /////////////
	const renderer = this.renderer = new Renderer(canvas)
	//////////////// END RENDERER //////////////
	
	//////////////// BEGIN SCENE ///////////////
	const univers = this.univers = new Univers(canvas);
	const controller = this.controller = univers.controller;
	const camera = this.camera = univers.camera;
	const planet = this.planet = univers.planet;
	const main_base = planet.main_base;
	//////////////// END SCENE /////////////////

	//////////////// BEGIN HUD /////////////////
	const hud = this.hud = new HUD(canvas, univers);
	const ihm = this.ihm = new IHM(univers);
	//////////////// END HUD ///////////////////
	//////////////// BEGIN POPUP ///////////////
	const popup = this.popup = new PopUp(this);
	//////////////// END POPUP /////////////////
    }

    update() {
	const elapsedTime = this.clock.getElapsedTime();
	const delta = this.clock.getDelta();
	
	this.univers.update(elapsedTime, delta);
	this.hud.update(elapsedTime, delta);
	this.ihm.update(elapsedTime, delta);

	this.renderer.clear()
	this.univers.render(this.renderer);
	this.renderer.clearDepth()
	this.hud.render(this.renderer);
    }

    windowResize() {
	const camera = this.camera;
	this.univers.resize()
	this.hud.resize();

	this.renderer.resize()
    }

    mouseMove(evt) {
	evt.preventDefault()
	this.hud.mouseMove(evt);
	this.univers.mouseMove(evt);
    }

    mouseClick(evt) {
	evt.preventDefault()
	if (this.hud.mouseClick(evt) !== true) {
	    this.univers.mouseClick(evt);
	}
    }

    mouseDoubleClick(evt) {
	evt.preventDefault()
    }
}
