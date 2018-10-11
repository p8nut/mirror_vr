class HUD {
    constructor(canvas, game_scene) {
	this.canvas = canvas;
	
	const left = 0
	const right = canvas.width;
	const top = 0
	const bottom = canvas.height;
	const near = 0;
	const far = 2;

	const raycaster = this.raycaster = new THREE.Raycaster();
	var point = this.point = new THREE.Vector2();

	var camera = this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
	
	var game_scene = this.game_scene = game_scene;
	var scene = this.scene = new THREE.Scene();
	scene.add(new THREE.AmbientLight(0xFFFFFF, 1));
	scene.add(camera)
/*
	var big  = this.big = new THREE.Mesh(
	    new THREE.BoxGeometry(100, 100, 1),
	    new THREE.MeshBasicMaterial({color: 0xFF7F50})
	);
	big.position.set(50,50,-1);
	scene.add(big);
	var rst = this.rst = new THREE.Mesh(
	    new THREE.BoxGeometry(100, 100, 1),
	    new THREE.MeshBasicMaterial({color: 0xFF0000})
	);
	rst.position.set(50,150,-1);
	scene.add(rst);
	var sml = this.sml = new THREE.Mesh(
	    new THREE.BoxGeometry(100, 100, 1),
	    new THREE.MeshBasicMaterial({color: 0x00FF00})
	);
	sml.position.set(50,250,-1);
	scene.add(sml);
	// add button and stuff.
	*/
    }

    resize() {
	const camera = this.camera;
	const canvas = this.canvas;
	
	camera.left = 0//canvas.width / -1;
	camera.right = canvas.width / 1;
	camera.top = 0//canvas.height / -1;
	camera.bottom = canvas.height / 1;

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

    mouseMove(event) {
	const canvas = this.canvas;
	const camera = this.camera;
	var point = this.point;
	point.x = ( event.clientX / canvas.width ) * 2 - 1;
	point.y = - ( event.clientY / canvas.height ) * 2 + 1;
    }

    mouseClick(event) {
	const canvas = this.canvas;
	const camera = this.camera;
	var point = this.point;
	point.x = ( event.clientX / canvas.width ) * 2 - 1;
	point.y = - ( event.clientY / canvas.height ) * 2 + 1;

	this.raycaster.setFromCamera(point, camera);
	var intersects = this.raycaster.intersectObjects(this.scene.children, true);
/*
	for (let i = 0; i < intersects.length; i++) {
	    let intersect = intersects[i]
	    if (intersect.object === this.sml) {
		this.game_scene.children[2].scale.multiplyScalar(1.1);
	    }
	    if (intersect.object === this.rst) {
		this.game_scene.children[2].scale.set(1,1,1);
	    }
	    if (intersect.object === this.big) {
		this.game_scene.children[2].scale.multiplyScalar(0.9);
	    }
	}
	console.log(this.game_scene.scale)
	*/
	return intersects.length > 0;
    }
}
