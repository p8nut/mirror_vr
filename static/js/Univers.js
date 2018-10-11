class Univers extends THREE.Scene{
    constructor(canvas) {
	super();
	this.background = new THREE.Color("#000000");
	this.add(new THREE.AmbientLight(0xFFFFFF, 0.05));
	
	this.canvas = canvas;
	this.raycaster = new THREE.Raycaster()
	
	//////////////// BEGIN PLANET //////////////
	const planet = this.planet = new Planet(this)
	planet.position.set(0,1,0);
	//////////////// END PLANET //////////////

	//////////////// BEGIN SUN /////////////////
	const sun = this.sun = new Sun(this);
	sun.position.x = 80000

	this.add(sun);
	//////////////// END SUN ///////////////////

	//////////////// BEGIN CAMERA //////////////
	const controller = this.controller = new THREE.Group();
	controller.position.set(0,0,3);
	this.add(controller);
	
	const camera = this.camera = Univers.buildCamera(this.canvas);
	controller.add(camera);
	camera.lookAt(this.planet.position);
	//////////////// END CAMERA ////////////////

    }

    static buildCamera(canvas) {
	const aspectRatio = canvas.width / canvas.height;
	const fieldOfView = 60;
	const nearPlane = 1;
	const farPlane = 10000;
	return new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    }

    resize() {
	const camera = this.camera;

	camera.aspect = canvas.width / canvas.height;
	camera.updateProjectionMatrix();
    }
    
    update(elapsedTime) {
	for (let i = 0; i < this.children.length; ++i) {
	    if(this.children[i].update) {
		this.children[i].update(elapsedTime);
	    }
	}
    }

    render(renderer) {
	renderer.render(this, this.camera);
    }

    mouseMove() {
    }

    mouseClick(event) {
	console.log("click WORLD")	
	let intersects = Univers.findIntersects(this, event);
	for (let i = 0; i < intersects.length; i++) {
	    const intersect = intersects[i];
	    if (intersect.object && intersect.object.mouseClick) {
		if (intersect.object.mouseClick(intersect) === true)
		    return true;
	    }
	}
	return false;
    }

    static findIntersects(world, event) {
	var intersect = null;
	let m = new THREE.Vector2();
	m.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	m.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	world.raycaster.setFromCamera(m, world.camera);
	let intersects = world.raycaster.intersectObjects( world.children, true );
        return intersects;
  }
}
