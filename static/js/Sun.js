var popup = PopUp.getInstance();

class Sun extends BasicEntity {
  constructor(univers) {
    super(univers, new THREE.CubeGeometry(1000, 1000, 1000));
    this.add(new THREE.PointLight(0xf0f0f0, 10, 100000));
    
    this.textureLoader = new THREE.TextureLoader();
    this.textureFlare0 = this.textureLoader.load( 'objects/Lensflares/lensflare0.png' );
    this.textureFlare3 = this.textureLoader.load( 'objects/Lensflares/lensflare3.png' );

    var light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
    light.color.setHSL( 0.08, 0.8, 0.5 );
    light.position.set( 0, 0, 0 );
    this.add( light );

    var lensflare = new THREE.Lensflare();
    lensflare.addElement( new THREE.LensflareElement( this.textureFlare0, 700, 0, light.color ) );
    lensflare.addElement( new THREE.LensflareElement( this.textureFlare3, 60, 0.6 ) );
    lensflare.addElement( new THREE.LensflareElement( this.textureFlare3, 70, 0.7 ) );
    lensflare.addElement( new THREE.LensflareElement( this.textureFlare3, 120, 0.9 ) );
    lensflare.addElement( new THREE.LensflareElement( this.textureFlare3, 70, 1 ) );
    light.add( lensflare );
	}
	mouseClick(event, elapsedTime) {
		popup.send("DON'T TOUCH THE SUN!!!", 2000, "#1b32b4");
	}
}
