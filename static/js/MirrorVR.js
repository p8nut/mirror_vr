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
	//////////////// END SCENE /////////////////

	//////////////// BEGIN HUD /////////////////
	const hud = this.hud = new HUD(canvas, univers);
	//////////////// END HUD ///////////////////	
    }

    update() {
	const elapsedTime = this.clock.getElapsedTime();
	
	this.univers.update(elapsedTime);
	this.hud.update(elapsedTime);

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
