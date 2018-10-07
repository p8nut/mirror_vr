
class SceneManager {
    constructor(canvas) {
	this.canvas = canvas;
	this.screenDimensions = {
            width: canvas.width,
            height: canvas.height
	};
	
	this.clock = new THREE.Clock()
	
	this.scene = SceneManager.buildDefaultScene();
	this.renderer = SceneManager.buildDefaultRenderer(canvas);
	this.raycaster = new THREE.Raycaster();
	this.entities = new Array();

	this.controller = new Controller(this, this.scene)
	this.camera = new CameraOpenVR(this, this.controller, this.screenDimensions);

	this.planet = new Planet(this, this.scene);
	this.planet.position.set(0, 1, 0);

	this.scene.add(new THREE.AmbientLight(0xffffff, 1))
	//Space background is a large sphere
	var spacetex = THREE.ImageUtils.loadTexture('http://'+window.location.hostname+':8080/space.jpg');
	var spacesphereGeo = new THREE.IcosahedronGeometry(10,4);
	var spacesphereMat = new THREE.MeshPhongMaterial();
	spacesphereMat.map = spacetex;

	var spacesphere = new THREE.Mesh(spacesphereGeo,spacesphereMat);
	//spacesphere needs to be double sided as the camera is within the spacesphere
	spacesphere.material.side = THREE.DoubleSide;

	spacesphere.material.map.wrapS = THREE.RepeatWrapping;
	spacesphere.material.map.wrapT = THREE.RepeatWrapping;
	spacesphere.material.map.repeat.set( 5, 5);

	this.scene.add(spacesphere);
	
    }

    update() {
	const elapsedTime = this.clock.getElapsedTime();
	
        for(let i=0; i< this.entities.length; i++) {
            this.entities[i].update(elapsedTime);
	}

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
	const width = this.screenDimensions.width = this.canvas.width;
	const height = this.screenDimensions.height = this.canvas.height;

        this.camera.onResize(this.screenDimensions);
        this.renderer.setSize(width, height);
    }
    
    onMouseMove(event) {
	event.preventDefault();
	// let intersect = findIntersect(this, event);
	// if (intersect !== null && intersect.onOver) {
	//     intersect.onOver();
	// }
    }
    
    onClick(event) {
	event.preventDefault();
	let intersect = this.findIntersect(event);
	let object = null
	console.log(intersect)
	if (intersect !== null){
	    object = intersect.object;
	    while (object !== null && object.parent !== this.scene) {
	    	object = object.parent;
		if (object !== null && object.onClick) {
		    object.onClick(intersect);
		    break
		}
	    }
	}
    }

    findIntersect(event) {
	var intersect = null;
	let m = new THREE.Vector2();
	m.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	m.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	this.raycaster.setFromCamera(m, this.camera);
	let intersects = this.raycaster.intersectObjects( this.scene.children, true );
	if (intersects.length > 0) {
	    intersect = intersects[0];
	}
	
	return intersect;
    }
    
    static buildDefaultScene() {
	const scene = new THREE.Scene();
	scene.background = new THREE.Color("#000");
	
	return scene;
    }
    
    static buildDefaultRenderer(canvas) {
	const renderer = new THREE.WebGLRenderer({ canvas: canvas,
						   antialias: true,
						   alpha: true,
						 });
	const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
	renderer.setPixelRatio(DPR);
	renderer.setSize(canvas.width, canvas.height);

	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	
	return renderer;
    }    
}

