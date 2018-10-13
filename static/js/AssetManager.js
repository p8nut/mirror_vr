class AssetManager{
    constructor() {
	var promises = this.promises = new Array();
	var objects = this.objects = new Array();
    }
    
    load(name, obj_path, mtl_path) {
	if (_.find(this.objects, o => o.name === name))
	    throw "already loaded with this name";
	const promises = this.promises;
	var objects = this.objects;

	let promise = ModelManager._loadObject(obj_path, mtl_path);

	promise.then(function(object){
	    objects.push({name:name, obj:object});
	});
	promises.push(promise);
    }

    static _loadObject(obj_path, mtl_path) {
	return new Promise(function(accept, reject) {
	    var mtlLoader = new THREE.MTLLoader();
	    mtlLoader.load(mtl_path,
			   function(materials) {
			       materials.preload();
			       var objLoader = new THREE.OBJLoader();
			       objLoader.setMaterials(materials);
			       objLoader.load(obj_path,
					      o => accept(o),
					      () => {},
					      e => reject(e));
			   },
			   () => {},
			   e => reject(e))
	})
    }
    
    getObject(name) {
	let elem = _.find(this.objects, o => o.name === name);
	if (elem) {
	    return elem.obj;
	}
	return null;
    }

    wait() {
	return Promise.all(this.promises);
    }

    static getInstance() {
	return assetManager;
    }
}
var assetManager = new AssetManager()
