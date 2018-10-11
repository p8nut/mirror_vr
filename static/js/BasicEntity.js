class BasicEntity extends THREE.Mesh {
    constructor(univers, mesh, texture) {
	super(mesh, texture)
	univers.add(this)
	this.univers = univers;
    }

    update(elapsedTime) {
	for (let i = 0; i < this.children.length; ++i) {
	    if(this.children[i].update) {
		this.children[i].update(elapsedTime);
	    }
	}
    }

    mouseMoveOver() {
	if (this.parent && this.parent.mouseOver) {
	    return this.parent.mouseOver(event);
	}
	return false;
    }
    
    mouseClick(event) {
	if (this.parent && this.parent.mouseClick) {
	    return this.parent.mouseClick(event);
	}
	return false;
    }
}
