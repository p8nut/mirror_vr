class MirrorVR{
    constructor(canvas) {
	this.canvas = canvas
	
	this.clock = new THREE.Clock();
	//////////////// BEGIN RENDRER /////////////
	const renderer = this.renderer = new Renderer(canvas)
	//////////////// END RENDERER //////////////
	
	//////////////// BEGIN SCENE ///////////////
	var univers = this.univers = new THREE.Scene();
	univers.background = new THREE.Color("#000000");
	univers.add(new THREE.AmbientLight(0xFFFFFF, 0.05));
	//////////////// END SCENE /////////////////

	//////////////// BEGIN CAMERA //////////////
	const world = this.world = new World(canvas, univers);
	const controller = this.controller = world.controller;
	const camera = this.camera = world.camera;
	//////////////// END CAMERA ////////////////

	//////////////// BEGIN HUD /////////////////
	const hud = this.hud = new HUD(canvas, univers);
	//////////////// END HUD ///////////////////

	//////////////// BEGIN PLANET //////////////
	var planet = this.planet = new Planet(univers)
	planet.scale.set(0.5, 0.5, 0.5)
	planet.position.set(0,1,0);
	//////////////// END PLANET //////////////

	//////////////// BEGIN SUN /////////////////
        const sun = new THREE.Mesh(
            new THREE.SphereBufferGeometry( 0.1, 16, 8 ),
            new THREE.MeshBasicMaterial( { color: 0xff0000 } )
        );
        // sun.position.y = - 700000;
        // sun.visible = false;
	sun.turbidity = 10,
	sun.rayleigh = 2,
	sun.mieCoefficient = 0.005,
	sun.mieDirectionalG = 0.8,
	sun.luminance = 1,
	sun.inclination = 0.49, // elevation / inclinationsun.        
	sun.azimuth = 0.25, // Facing front,sun.sun.          
	sun.sun = ! true
	sun.add(new THREE.PointLight(0xF0F0F0, 10, 100000));	
        // var distance = 400000;
	 sun.position.x = 80000

	univers.add(sun);
	//////////////// END SUN ///////////////////

	
	controller.position.set(0,0,3);
	// this lookAt must be reset by main when camera is update by controller.
	camera.lookAt(this.planet.position);
	
    }

    update() {
	const elapsedTime = this.clock.getElapsedTime();
	
	this.world.update(elapsedTime);
	this.hud.update(elapsedTime);
	this.renderer.clear()
	this.world.render(this.renderer);
	this.renderer.clearDepth()
	this.hud.render(this.renderer);
    }

    windowResize() {
	const camera = this.camera;
	this.world.resize()
	this.hud.resize();

	this.renderer.resize()
    }

    mouseMove(evt) {
	evt.preventDefault()
	this.hud.mouseMove(evt);
	this.world.mouseMove(evt);
    }

    mouseClick(evt) {
	evt.preventDefault()
	if (this.hud.mouseClick(evt) !== true) {
	    this.world.mouseClick(evt);
	}
    }
    mouseDoubleClick(evt) {
	evt.preventDefault()
    }
}
