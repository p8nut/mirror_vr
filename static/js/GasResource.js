class GasResource extends BasicEntity {

  constructor(univers) {
    super(univers, new THREE.BoxGeometry(0.05, 0.05, 0.05));
		this.particleSystem = new THREE.GPUParticleSystem({
			maxParticles: 2500
		});
		this.add(this.particleSystem);
		this.tick = 0;
		this.options = {
			position: new THREE.Vector3(0, 0, 0),
			velocity: new THREE.Vector3(0, 0, 0),
			velocityRandomness: 1,
			positionRandomness: 0.1,
			color: 0xffff00,
			colorRandomness: .2,
			turbulence: 0.1,
			lifetime: 0.1,
			size: 5,
			sizeRandomness: 1
		};
		this.spawnerOptions = {
			spawnRate: 1000,
			timeScale: 0.0001
		};
  }
  update(elapsedTime, delta) {
		var deltaTime = delta * this.spawnerOptions.timeScale;
		this.tick += deltaTime;
		if (this.tick < 0) tick = 0;
		if (deltaTime > 0) {
			for (var x = 0; x < this.spawnerOptions.spawnRate * deltaTime; x++) {
				this.particleSystem.spawnParticle(this.options);
			}
		}
		this.particleSystem.update(this.tick);  
  }
  mouseClick(event, elapsedTime) {
    return true;
  }
}
