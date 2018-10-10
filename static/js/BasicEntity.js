class BasicEntity extends THREE.Mesh {
    constructor(univers, mesh, texture) {
	super(mesh, texture)
	univers.add(this)
    }

    update(elapsedTime) {
	for (let i = 0; i < this.children.length; ++i) {
	    if(this.children[i].update) {
		this.children[i].update(elapsedTime);
	    }
	}
    }

    mouseMoveOver() {
    }
    
    mouseClick(event) {
	return false;
    }
}
