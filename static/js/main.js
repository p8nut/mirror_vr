const canvas = document.getElementById("canvas");

const gameManager = new MirrorVR(canvas);

bindCamera();
bindEventListeners();
render();

function bindEventListeners() {
    window.onresize = resizeCanvas;
    window.ondblclick = evt => gameManager.mouseDoubleClick(evt)
    window.onclick = evt => {
	// if (screenfull.enabled) {
	//     screenfull.request();
	// }

	// screen.orientation.lock("portrait-primary");
	gameManager.mouseClick(evt)
    }
    window.onmousemove = evt => gameManager.mouseMove(evt)
    resizeCanvas();
}

function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height= '100%';
    
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    gameManager.windowResize();
}

function render() {
    requestAnimationFrame(render);
    gameManager.update();
}

function bindCamera() {
    var wsUri = 'ws://'+window.location.hostname+':9090'
    console.log(wsUri)
    let websocket = new WebSocket(wsUri);
    websocket.onopen = evt => console.log(evt);
    websocket.onclose = evt => console.log(evt);
    websocket.onerror = evt => {
	console.log(evt);
    }
    websocket.onmessage = function(evt){
	let p = JSON.parse(evt.data)
	gameManager.controller.position.set(p.x, p.y, p.z);
	gameManager.controller.quaternion.set(p.qx,p.qy,p.qz,p.qw);
	// Quick fix for camera orientation in MirrorVR camera.lookAt
	gameManager.rotation.set(-Math.PI/2,0,0);
    };
}
