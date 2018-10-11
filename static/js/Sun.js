class Sun extends BasicEntity {
    constructor(univers) {
        super(univers,
              new THREE.SphereBufferGeometry( 0.1, 16, 8 ),
            new THREE.MeshBasicMaterial( { color: 0xff0000 } )
        );
        // sun.position.y = - 700000;
        // sun.visible = false;
	this.turbidity = 10,
	this.rayleigh = 2,
	this.mieCoefficient = 0.005,
	this.mieDirectionalG = 0.8,
	this.luminance = 1,
	this.inclination = 0.49, // elevation / inclinationthis.        
	this.azimuth = 0.25, // Facing front,this.this.          
	this.sun = ! true
	this.add(new THREE.PointLight(0xF0F0F0, 10, 100000));	

    }
}
