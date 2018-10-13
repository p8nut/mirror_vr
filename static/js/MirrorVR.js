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

    mouseMove(event) {
	event.preventDefault()
	this.hud.mouseMove(event);
	this.univers.mouseMove(event);
    }

    mouseClick(event) {
	event.preventDefault()
	const elapesdTime = this.clock.getElapsedTime();
	if (this.hud.mouseClick(event) !== true) {
	    this.univers.mouseClick(event, elapesdTime);
	}
    }

    mouseDoubleClick(event) {
	event.preventDefault()
    }
}
