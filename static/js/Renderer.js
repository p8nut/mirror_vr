class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    var renderer = (this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    }));
    this.renderer.context.getShaderInfoLog = function() {
      return "";
    };
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(canvas.width, canvas.height);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setClearColor(0x000000);
    renderer.autoClear = false;

    this.container = document.getElementById("container2");
    this.stats = new Stats();
    this.container.appendChild(this.stats.dom);
  }

  render(scene, camera) {
    this.stats.update();

    this.renderer.render(scene, camera);
  }

  clear() {
    this.renderer.clear();
  }

  clearDepth() {
    this.renderer.clearDepth();
  }

  resize() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.renderer.setSize(width, height);
  }
}
