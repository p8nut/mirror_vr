class Planet extends BasicEntity {
    constructor(univers) {
	const texture = new THREE.TextureLoader().load('textures/moon.jpg');
	super(univers,
	      Planet.createLayerMesh(1),
	      new THREE.MeshPhongMaterial({
		  map:texture,
		  color: 0xFF8800,
		  //flatShading: true,
		  side: THREE.DoubleSide,
		  polygonOffset: true,
		  polygonOffsetFactor: 0,
		  //wireframe:true
	      }));
	const grid = this.grid = new THREE.Mesh(
	    this.geometry.clone(), false);
	this.add(grid);
	//ADD SUBLAYER OF PLANET
    }
    
    static createLayerMesh(size/*, {min, max}*/) {
	var mesh = new THREE.IcosahedronGeometry(size, 4);
	mesh.vertices.forEach(element => {
            const min = 1;
            const max = 1.02;
            element.multiplyScalar(Math.random() * (max - min) + min);
	});
	return mesh;
    }

    static createLayerTexture(color, polygonOffsetFactor) {
	return new THREE.MeshPhongMaterial({
            color: color,
            flatShading: true,
            side: THREE.DoubleSide,
            polygonOffset: true,
            polygonOffsetFactor: polygonOffsetFactor,
            //wireframe:true
	});
    }

    update(elapsedTime) {
    	if (elapsedTime % 2) {
	    this.rotation.y += Math.PI / 2640;
	}
    }
    
    mouseClick(intersect) {
	console.log("add building")
	let vertices = this.grid.geometry.vertices;
	let local_intersect = this.worldToLocal(intersect.point);
	let vertice = null;
	let min;
	for (let i = 0; i < vertices.length; i++) {
            let distance = vertices[i].distanceTo(local_intersect);
            if (vertice === null || distance < min) {
		min = distance;
		vertice = vertices[i];
            }
	}

	for (let i = 0; i < this.children.length; i++) {
	    if (this.children[i].position.x === vertice.x &&
		this.children[i].position.y === vertice.y &&
		this.children[i].position.z === vertice.z) {
		return true;
	    }
	}
	let building = new Building(this);
	building.position.copy(vertice)
	building.lookAt(this.position)
	return true;
    }
}
