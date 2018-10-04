var renderer = new THREE.WebGLRenderer({
    alpha: true
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000,0);
renderer.autoClear = false;

document.body.appendChild(renderer.domElement);

///////////////////// CREATE 3D SCENE  /////////////////////////////
let display3d = {
    'scene':null,
    'controller': null,
    'camera': null
}
display3d.scene = new THREE.Scene();
display3d.controller = new THREE.Group();
display3d.camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,10000);
display3d.camera.rotation.x = -Math.PI / 2;

display3d.scene.add(display3d.controller)
display3d.controller.add(display3d.camera);
////////////////////////////////////////////////////////////////////

///////////////////// 3D SCENE BASIQUE DEBUG //////////////////////////////
var cube = new THREE.Mesh(
    new THREE.CubeGeometry(200,200,200),
    new THREE.MeshNormalMaterial()
);
cube.position.z = 0;
cube.position.x = 0;
cube.position.y = 0;

var cube2 = new THREE.Mesh(
    new THREE.CubeGeometry(200,200,200),
    new THREE.MeshNormalMaterial()
);
cube2.position.z = -500;
cube2.position.x = 00;
cube2.position.y = 0;

var cube3 = new THREE.Mesh(
    new THREE.CubeGeometry(200,200,200),
    new THREE.MeshNormalMaterial()
);
cube3.position.z = -1000;
cube3.position.x = 00;
cube3.position.y = 0;

display3d.scene.add(cube);
display3d.scene.add(cube2);
display3d.scene.add(cube3);

////////////////////////////////////////////////////////////////////////

///////////////////// UPDATE CAMERA POS ORI //////////////////////////////
var wsUri = "ws://"+window.location.hostname+":8080"
console.log(wsUri)
let websocket = new WebSocket(wsUri);
websocket.onopen = function(evt) {
    console.log(evt)
    // ws.send("start");
    // ws.send("ctrl#1enable")
};
websocket.onclose = function(evt) { console.log(evt) };
websocket.onmessage = function(evt){
    let p = JSON.parse(evt.data)
    display3d.controller.position.x = p.x * 1000;
    display3d.controller.position.y = p.y * 1000;
    display3d.controller.position.z = p.z * 1000;
    display3d.controller.quaternion.w = p.qw;
    display3d.controller.quaternion.x = p.qx;
    display3d.controller.quaternion.y = p.qy;
    display3d.controller.quaternion.z = p.qz;
};

websocket.onerror = function(evt) {
    console.log(evt);
};     
//////////////////////////////////////////////////////////////////////////

///////////////////// CREATE 2D SCENE  /////////////////////////////
let display2d = {
    scene:null,
    camera: null
}
display2d.scene = new THREE.Scene();
display2d.camera = new THREE.OrthographicCamera(-window.innerWidth/2,
						+window.innerWidth/2,
						+window.innerHeight/2,
						-window.innerHeight/2
						,0,100);

display2d.scene.add(new THREE.AmbientLight())

var cube2d = new THREE.Mesh(
    new THREE.CubeGeometry(10,10,1),
    new THREE.MeshNormalMaterial()
);
cube2d.position.z = -10;
cube2d.position.x = 200;
cube2d.position.y = -20;

display2d.scene.add(cube2d)

////////////////////////////////////////////////////////////////////



window.addEventListener('resize', onWindowResize, false);
function onWindowResize()
{
    display3d.camera.aspect = window.innerWidth / window.innerHeight;
    display3d.camera.updateProjectionMatrix();    
    renderer.setSize(window.innerWidth, window.innerHeight);

    display2d.camera.left = -window.innerWidth/2,
    display2d.camera.right = +window.innerWidth/2,
    display2d.camera.top = +window.innerHeight/2,
    display2d.camera.bottom = -window.innerHeight/2,
    display2d.camera.updateProjectionMatrix();    
}

function animate() {
    requestAnimationFrame(animate);
    renderer.clear()
    renderer.render(display3d.scene, display3d.camera);
    renderer.clearDepth()
    renderer.render(display2d.scene, display2d.camera);
}
animate();
