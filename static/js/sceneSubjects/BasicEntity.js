class BasicEntity extends THREE.Object3D{
    constructor (sceneManager, parent) {
	super();
	this.sceneManager = sceneManager;
	parent.add(this);
	sceneManager.entities.push(this);
    }
    
    onClick(intersect) {
    }

    onOver(intersect) {
    }
    
    update(time) {	
    }
    
}
