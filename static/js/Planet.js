class Planet extends BasicEntity {
    constructor(univers) {
	const size = 1;
	
	const texture = new THREE.TextureLoader().load('textures/moon.jpg');
	super(univers,
	      Planet.createLayerMesh(size),
	      new THREE.MeshLambertMaterial({
		  map:texture,
		  color: 0xFF8800,
		  side: THREE.DoubleSide,
		  polygonOffset: true,
		  polygonOffsetFactor: 0,
	      }));
	const grid = this.grid = new THREE.Mesh(new THREE.IcosahedronGeometry(size, 4), false);
	Planet.createLayers(this, size);
	Planet.addResourcesAndBuilding(this);
	this.add(grid);
	//ADD SUBLAYER OF PLANET
    }
    static addResourcesAndBuilding(planet) {
	let vertices = _.sampleSize(planet.grid.geometry.vertices, 50);
	vertices.forEach(vertice => {
            let resource = new Resource(planet);
            resource.position.copy(vertice)
	    resource.lookAt(planet.position);
	})
    }
    
    static createLayers(planet, size) {
	planet.add(new THREE.Mesh(
	    Planet.createLayerMesh(size * 0.95),
	    Planet.createLayerTexture(0xff0000, -0.1)));
	planet.add(new THREE.Mesh(
	    Planet.createLayerMesh(size * 0.80),
	    Planet.createLayerTexture(0xff4500, -0.2)));
	planet.add(new THREE.Mesh(
	    Planet.createLayerMesh(size * 0.5),
	    Planet.createLayerTexture(0xffd700, -0.3)));
	planet.add(new THREE.Mesh(
	    Planet.createLayerMesh(size * 0.1),
	    Planet.createLayerTexture(0xffffff, -0.4)));
    }

    static createLayerMesh(size/*, {min, max}*/) {
        const min = 1;
        const max = 1.02;
	var mesh = new THREE.IcosahedronGeometry(size, 4);
	mesh.vertices.forEach(element => {
            element.multiplyScalar(Math.random() * (max - min) + min);
	});
	return mesh;
    }

    static createLayerTexture(color, polygonOffsetFactor) {
	return new THREE.MeshLambertMaterial({
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
