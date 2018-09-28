var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor(0xefefef,1);
document.body.appendChild(renderer.domElement);


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,10000);

window.addEventListener('resize', onWindowResize, false);
function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}


// create setup scene
var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1000,1000,1),
    new THREE.MeshNormalMaterial()
);
var cube = new THREE.Mesh(
    new THREE.CubeGeometry(200,200,200),
    new THREE.MeshNormalMaterial()
);
cube.position.z = 100;
cube.position.x = -200;
cube.position.y = 200;

var cube2 = new THREE.Mesh(
    new THREE.CubeGeometry(200,200,200),
    new THREE.MeshNormalMaterial()
);
cube2.position.z = 100;
cube2.position.x = 200;
cube2.position.y = 200;

var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(100,100,100),
    new THREE.MeshNormalMaterial()
);
sphere.position.z = 50;
sphere.position.x = 0;
sphere.position.y = -200;
scene.add(plane);
scene.add(cube);
scene.add(cube2);
scene.add(sphere);





///// create websocket client
var wsUri = "ws://"+window.location.hostname+":8080"
console.log(wsUri)
let websocket = new WebSocket(wsUri);
websocket.onopen = function(evt) { console.log(evt) };
websocket.onclose = function(evt) { console.log(evt) };
websocket.onmessage = function(evt){
    let p = JSON.parse(evt.data)
    camera.position.x = p.x * 1000;
    camera.position.y = p.y * 1000;
    camera.position.z = p.z * 1000;
    camera.quaternion.w = p.qw;
    camera.quaternion.x = p.qx;
    camera.quaternion.y = p.qy;
    camera.quaternion.z = p.qz;
    camera.updateMatrix()
};
websocket.onerror = function(evt) { console.log(evt) };     


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
