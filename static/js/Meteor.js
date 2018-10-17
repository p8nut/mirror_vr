var assetManager = AssetManager.getInstance();
assetManager.loadTexture("meteor", "/textures/moon.jpg");

function meteor(univers, bigMeteor = false) {
  var size = 0.02;
  if (bigMeteor) size = 0.5;
  var ico = new THREE.SphereGeometry(size);
  var material = new THREE.MeshLambertMaterial({
    map: assetManager.getTexture("meteor")
  });
  rock = new Physijs.SphereMesh(ico, material);
  rock.position.x = Math.random() * 2 - 1;
  rock.position.y = Math.random() * 2 - 1;
  rock.position.z = Math.random() * 2 - 1;
  rock.position.normalize();
  rock.position.multiplyScalar(10);
  univers.add(rock);

  var targetPosition = new THREE.Vector3();
  targetPosition.x = univers.planet.position.x;
  targetPosition.y = Math.random() * (0.9 - 0.1) + 0.1;
  targetPosition.z = univers.planet.position.z;
  var diff = rock.position.clone().sub(targetPosition);
  bvel = diff.normalize().negate();

  var gravity = 0.5;
  bvel.multiplyScalar(gravity);
  bvel.add(rock.getLinearVelocity()).multiplyScalar(2);
  rock.setLinearVelocity(bvel);

  rock.addEventListener("collision", function(
    other_object,
    relative_velocity,
    relative_rotation,
    contact_normal
  ) {
    if (other_object == univers.planet.hitbox) {
      univers.remove(this);
    }
  });
}
