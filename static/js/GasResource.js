class GasResource extends BasicEntity {
  constructor(univers) {
    super(univers, new THREE.BoxGeometry(0.05, 0.05, 0.05));
  }
  mouseClick(event, elapsedTime) {
    return true;
  }
}