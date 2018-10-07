const canvas = document.getElementById("canvas");

const sceneManager = new SceneManager(canvas);

bindEventListeners();
bindCamera();
render();

function bindEventListeners() {
    window.onresize = resizeCanvas;
    window.onclick = evt => sceneManager.onClick(evt)
    window.onmousemove = evt => sceneManager.onMouseMove(evt)
    resizeCanvas();
}

function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height= '100%';
    
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    sceneManager.onWindowResize();
}

function render() {
    requestAnimationFrame(render);
    sceneManager.update();
}


function bindCamera() {
    var wsUri = 'ws://'+window.location.hostname+':9090'
    console.log(wsUri)
    let websocket = new WebSocket(wsUri);
    websocket.onopen = evt => console.log(evt);
    websocket.onclose = evt => console.log(evt);
    websocket.onerror = evt => console.log(evt);

    websocket.onmessage = function(evt){
    	let p = JSON.parse(evt.data)
	sceneManager.controller.position.set(p.x, p.y, p.z);
	sceneManager.controller.quaternion.set(p.qx,p.qy,p.qz,p.qw);
    };

}
