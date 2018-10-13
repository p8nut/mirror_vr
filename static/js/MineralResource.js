var assetManager = AssetManager.getInstance();
assetManager.load(
  "MineralResource",
  "./objects/Buildings/MineralResource/MineralResource.obj",
  "./objects/Buildings/MineralResource/MineralResource.mtl"
);

class MineralResource extends BasicEntity {
  constructor(univers) {
    super(
      univers,
      new THREE.BoxGeometry(0.05, 0.05, 0.05),
      new THREE.MeshLambertMaterial({ color: 0xffff00 })
    );
    /*
	var particleSystem = this.particleSystem = new THREE.GPUParticleSystem( {
	    maxParticles: 25
	} );
	this.tick = 0;
	this.options = {
	    position: new THREE.Vector3(),
	    positionRandomness: .3,
	    velocity: new THREE.Vector3(),
	    velocityRandomness: .5,
	    color: 0xaa88ff,
	    colorRandomness: .2,
	    turbulence: .5,
	    lifetime: 2,
	    size: 5,
	    sizeRandomness: 1
	};
	this.spawnerOptions = {
	    spawnRate: 15000,
	    horizontalSpeed: 1.5,
	    verticalSpeed: 1.33,
	    timeScale: 1
	};
	this.add(particleSystem);
*/
    this.model = assetManager.getObject("MineralResource").clone();
    this.model.scale.set(0.002, 0.002, 0.002);
    this.model.rotation.y = Math.PI;
    this.add(this.model);
  }

  mouseClick(event, elapsedTime) {
    return true;
  }

  update(elapsedTime, delta) {
    // this.options.position.copy(this.position)
    // var delta = delta * this.spawnerOptions.timeScale;
    // this.tick += delta;
    // if ( this.tick < 0 ) this.tick = 0;
    // if ( delta > 0 ) {
    //     this.options.position.x = 0//Math.sin( this.tick * this.spawnerOptions.horizontalSpeed ) * 2;
    //     this.options.position.y = 0//Math.sin( this.tick * this.spawnerOptions.verticalSpeed ) * 1;
    //     this.options.position.z += .1 //Math.sin( this.tick * this.spawnerOptions.horizontalSpeed + this.spawnerOptions.verticalSpeed ) * 2;
    //     for ( var x = 0; x < this.spawnerOptions.spawnRate * delta; x++ ) {
    // 	// Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
    // 	// their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
    // 	this.particleSystem.spawnParticle( this.options );
    //     }
    // }
    // this.particleSystem.update( this.tick );
  }
}
