class World {
    constructor(canvas, scene) {
	this.canvas = canvas;
	this.scene = scene;
	this.raycaster = new THREE.Raycaster()
	
	const aspectRatio = canvas.width / canvas.height;
	const fieldOfView = 60;
	const nearPlane = 1;
	const farPlane = 100; 

	const controller = this.controller = new THREE.Group();
	const camera = this.camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
	camera.rotation.x = -Math.PI / 2;
	controller.add(camera);
	scene.add(controller);
    }
    
    resize() {
	const camera = this.camera;

	camera.aspect = canvas.width / canvas.height;
	camera.updateProjectionMatrix();
    }
    
    update(elapsedTime) {
	for (let i = 0; i < this.scene.children.length; ++i) {
	    if(this.scene.children[i].update) {
		this.scene.children[i].update(elapsedTime);
	    }
	}
    }

    render(renderer) {
	renderer.render(this.scene, this.camera);
    }

    mouseMove() {
    }

    mouseClick(event) {
	console.log("click WORLD")	
	let intersects = World.findIntersects(this, event);
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
	let intersects = world.raycaster.intersectObjects( world.scene.children, true );
        return intersects;
  }
}
