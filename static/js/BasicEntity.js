class BasicEntity extends THREE.Mesh {
  constructor(univers, mesh) {
    const texture = new THREE.MeshBasicMaterial({visible: false});
    super(mesh, texture);
    univers.add(this);
    this.univers = univers;
}

  update(elapsedTime, delta) {
    for (let i = 0; i < this.children.length; ++i) {
      if (this.children[i].update) {
        this.children[i].update(elapsedTime, delta);
      }
    }
  }

  mouseMoveOver() {
    if (this.parent && this.parent.mouseOver) {
      return this.parent.mouseOver(event);
    }
    return false;
  }

  mouseClick(intersects, elapsedTime) {
    if (this.parent && this.parent.mouseClick) {
      return this.parent.mouseClick(intersects, elapsedTime);
    }
    return false;
  }
}
