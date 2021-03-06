const canvas = document.getElementById("canvas");

var assetManager = AssetManager.getInstance();
assetManager.wait().then(function() {
  const mirrorVR = new MirrorVR(canvas);

  bindCamera();
  bindEventListeners();
  const fpsController = new FpsController(60, function(e){
      mirrorVR.update()
  });
  fpsController.start();

  function bindEventListeners() {
    window.onresize = resizeCanvas;
    canvas.ondblclick = event => mirrorVR.mouseDoubleClick(event);
    canvas.onclick = event => {
      mirrorVR.mouseClick(event);
    };
    canvas.onmousemove = event => mirrorVR.mouseMove(event);
    resizeCanvas();
  }

  function resizeCanvas() {
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    mirrorVR.windowResize();
  }


  function bindCamera() {
    var wsUri = "ws://" + window.location.hostname + ":9090";
    console.log(wsUri);
    let websocket = new WebSocket(wsUri);
    websocket.onopen = event => console.log(event);
    websocket.onclose = event => console.log(event);
    websocket.onerror = event => {
      console.log(event);
    };
    websocket.onmessage = function(event) {
      let p = JSON.parse(event.data);
      mirrorVR.controller.position.set(p.x, p.y, p.z);
      mirrorVR.controller.quaternion.set(p.qx, p.qy, p.qz, p.qw);
      // Quick fix for camera orientation in MirrorVR camera.lookAt
	mirrorVR.camera.rotation.set(-Math.PI / 2, Math.PI, 0);
    };
  }
});
