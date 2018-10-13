const canvas = document.getElementById("canvas");

const mirrorVR = new MirrorVR(canvas);

bindCamera();
bindEventListeners();
render();

function bindEventListeners() {
    window.onresize = resizeCanvas;
    canvas.ondblclick = evt => mirrorVR.mouseDoubleClick(evt)
    canvas.onclick = evt => {
	mirrorVR.mouseClick(evt)
    }
    canvas.onmousemove = evt => mirrorVR.mouseMove(evt)
    resizeCanvas();
}

function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height= '100%';
    
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    mirrorVR.windowResize();
}

function render() {
    
    requestAnimationFrame(render);
    mirrorVR.update();

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
	mirrorVR.controller.position.set(p.x, p.y, p.z);
	mirrorVR.controller.quaternion.set(p.qx,p.qy,p.qz,p.qw);
	// Quick fix for camera orientation in MirrorVR camera.lookAt
	mirrorVR.camera.rotation.set(-Math.PI/2,0,0);
    };
}
