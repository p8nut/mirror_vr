var assetManager = AssetManager.getInstance();
assetManager.loadTexture("venus", "textures/venus.jpg");

var popup = PopUp.getInstance();
var buildingType = null;

class Planet extends BasicEntity {
  constructor(univers) {
    const size = 1;
    super(univers, new THREE.IcosahedronGeometry(size, 4));
    this.hitbox = new Physijs.SphereMesh(
      new THREE.SphereGeometry(0.8),
			new THREE.MeshPhongMaterial({ color: 0xff0000, visible: false }),
		);
		this.hitbox.position.set(0, 1, 0);
		univers.add(this.hitbox);
    const packaging = (this.packaging = new Physijs.SphereMesh(
      Planet.createLayerMesh(size),
      new THREE.MeshLambertMaterial({
        map: assetManager.getTexture("venus"),
        color: 0xff8800,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: 0
      })
    ));
    this.uni = univers;
    this.add(packaging);
    Planet.createLayers(this, size);
    Planet.addResourcesAndBuilding(this);
  }

  static addResourcesAndBuilding(planet) {
    let vertices = _.sampleSize(planet.geometry.vertices, 20);
    let vertice = vertices.pop();
    let main_base = (planet.main_base = new MainBase(planet));
    main_base.position.copy(vertice);
    main_base.lookAt(planet.position);

    let v = 0;
    vertices.forEach(vertice => {
      let resource = null;
      if (v % 3) {
        resource = new MineralFactory(planet);
      } else {
        resource = new GasFactory(planet);
      }
      v++;
      resource.position.copy(vertice);
      resource.lookAt(planet.position);
    });
  }

  static createLayers(planet, size) {
    planet.add(
      new THREE.Mesh(
        Planet.createLayerMesh(size * 0.95),
        Planet.createLayerTexture(0xff0000, -0.1)
      )
    );
    planet.add(
      new THREE.Mesh(
        Planet.createLayerMesh(size * 0.8),
        Planet.createLayerTexture(0xff4500, -0.2)
      )
    );
    planet.add(
      new THREE.Mesh(
        Planet.createLayerMesh(size * 0.5),
        Planet.createLayerTexture(0xffd700, -0.3)
      )
    );
    planet.add(
      new THREE.Mesh(
        Planet.createLayerMesh(size * 0.1),
        Planet.createLayerTexture(0xffffff, -0.4)
      )
    );
  }

  static createLayerMesh(size /*, {min, max}*/) {
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
      polygonOffsetFactor: polygonOffsetFactor
    });
  }

  update(elapsedTime, delta) {
    this.rotation.y += (Math.PI / 40) * (delta / 1000);
    super.update(elapsedTime, delta);
  }

  mouseClick(intersect, elapsedTime) {
    let vertices = this.geometry.vertices;
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
    if (buildingType != null) {
      if (buildingType.costMineral > this.main_base.minerals) {
        popup.send("Insufficient resources");
        return true;
      }
      if (buildingType == MineralFactory) {
        popup.send("Mineral factory must be placed on rock formation");
        return true;
      }
      if (buildingType == GasFactory) {
        popup.send("Gas factory must be placed on gas geyser");
        return true;
      }
      let building = new buildingType(this);
      this.main_base.minerals -= buildingType.costMineral;
      building.position.copy(vertice);
      building.lookAt(this.position);
      buildingType = null;
    }
    return true;
  }
}
