class Planet extends BasicEntity {
    constructor (sceneManager, parent) {
	super(sceneManager, parent);
	const radius = 1;
	this.planetLayers = []

	const layersInfo = [{
            color: 0x0000ff,
            polygonOffsetFactor: 0,
            radius: radius
	},{
            color: 0xff0000,
            polygonOffsetFactor: -0.1,
            radius: radius * 0.95
	},{
            color: 0xff4500,
            polygonOffsetFactor: -0.2,
            radius: radius * 0.80
	},{
            color: 0xffd700,
            polygonOffsetFactor: -0.3,
            radius: radius * 0.5
	},{
            color: 0xffffff,
            polygonOffsetFactor: -0.4,
            radius: radius * 0.1
	}];
	for (let i in layersInfo) {	    
	    let layerInfo = layersInfo[i];
	    let layer = new THREE.Mesh(new THREE.IcosahedronGeometry(layerInfo.radius, 4),
                                       new THREE.MeshPhongMaterial({
					   color: layerInfo.color,
					   flatShading: true,
					   side: THREE.DoubleSide,
					   polygonOffset: true,
					   polygonOffsetFactor: layerInfo.polygonOffsetFactor,
				       }));
	    layer.geometry.vertices.forEach(element => {
       		const min = 0.98;
		const max = 1.02;
		element.multiplyScalar(Math.random() * (max - min) + min);
            });
	    
	    super.add(layer)
	    this.planetLayers.push(layer);
	}
    }
    
    onClick(intersect) {
	console.log("planet clicked")
	let pos = this.worldToLocal(intersect.point);
	
	if (intersect.object === this.planetLayers[0]) {
	    console.log("build")
	    let building = new Building(this.sceneManager, this);
	    building.position.copy(pos);
	    building.lookAt(this.position);
	    
	}
    }

    onOver(intersect) {
    }
    
    update(time) {	
    }
    
}
