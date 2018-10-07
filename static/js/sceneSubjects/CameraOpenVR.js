class Controller extends BasicEntity{}

class CameraOpenVR extends THREE.PerspectiveCamera {
    constructor(sceneManager, parent, {width, height}) {
	const aspectRatio = width / height
	const fieldOfView = 60;
	const nearPlane = 0.3//2;
	const farPlane = 100;
	
	super(fieldOfView, aspectRatio, nearPlane, farPlane);
	this.rotation.x = - Math.PI / 2
	parent.add(this);
	sceneManager.entities.push(this);
    }
    
    onResize({width, height}) {
	this.aspect = width / height;
	this.updateProjectionMatrix();
    }

    update(time) {
	//console.log(this.position)
    }
}
