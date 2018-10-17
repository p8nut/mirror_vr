var assetManager = AssetManager.getInstance();
assetManager.loadTexture("meteor", "/textures/moon.jpg");

function meteor(univers) {
  var ico = new THREE.SphereGeometry(0.02);
  var material = new THREE.MeshLambertMaterial({
        map: assetManager.getTexture("meteor"),
  });
  rock = new Physijs.SphereMesh(ico, material);
  rock.position.x = Math.random() * 2 - 1;
  rock.position.y = Math.random() * 2 - 1;
  rock.position.z = Math.random() * 2 - 1;
  rock.position.normalize();
  rock.position.multiplyScalar(10); // Rayon d'apparition des comètes
  univers.add(rock);

	// Assume `rock` is the bullet, `univers.planet` is the "planet" body.
	var targetPosition;
	targetPosition.x 
  var diff = rock.position.clone().sub(univers.planet.position);
  bvel = diff.normalize().negate();
  // Force de gravité
  var grav = 1;
  bvel.multiplyScalar(grav);
  // Average it out
  bvel.add(rock.getLinearVelocity()).multiplyScalar(2);
  rock.setLinearVelocity(bvel);
  // Détection des collisions

  rock.addEventListener("collision", function(
    other_object,
    relative_velocity,
    relative_rotation,
    contact_normal
  ) {
    if (other_object == univers.planet.hitbox) {
      univers.remove(this);
      //parts.push(new ExplodeAnimation(this.position.x, this.position.y, this.position.z))
    }
  });
  // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`
}
