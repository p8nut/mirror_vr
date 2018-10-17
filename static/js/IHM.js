class IHM {
  constructor(univers) {
    this.univers = univers;
    this.stat = new dat.GUI({ autoplace: false });
    this.ihm = new dat.GUI({ autoplace: false });
    this.scale = 1;
    var base = univers.main_base;
    this.stat.domElement.id = "stat";
    this.ihm.domElement.id = "ihm";

    this.stat
      .add(base, "population", base.population)
      .name("<span class=\"resHud\"><img class=\"LogoHud\" src=\"./objects/Logo/Population.png\"></span>Population")
      .listen();
    this.stat
      .add(base, "food", base.food)
      .name("<span class=\"resHud\"><img class=\"LogoHud\" src=\"./objects/Logo/Food.png\"></span>Food")
      .listen();
    this.stat
      .add(base, "minerals", base.minerals)
      .name("<span class=\"resHud\"><img class=\"LogoHud\" src=\"./objects/Logo/Rock.png\"></span>Minerals")
      .listen();
    this.stat
      .add(base, "gas", base.gas)
      .name("<span class=\"resHud\"><img class=\"LogoHud\" src=\"./objects/Logo/Gas.png\"></span>Gas")
      .listen();
    this.stat.domElement.style.pointerEvents = "none";

    var options = (this.options = {
      add_mineral_factory: function() {
	      buildingType = MineralFactory;
      },
      add_gas_factory: function() {
	buildingType = GasFactory;
      },
      add_farm: function() {
	buildingType = Farm;
      },
      add_rocket: function (){	      
	      buildingType = Rocket;
      },
      handle_fullscreen: function() {
        screenfull.toggle();
        if (screen.orientation)
          Promise.all([screen.orientation.lock("landscape-primary")]);
      },
      zoom: 0,
    });

    var build = this.ihm.addFolder("Build");
    build.add(options, "add_mineral_factory").name("Mineral factory <span class=\"resCost\">" + MineralFactory.costMineral + " <img class=\"LogoIhm\" src=\"./objects/Logo/Rock.png\"></span>");
    build.add(options, "add_gas_factory").name("Gas factory <span class=\"resCost\">" + GasFactory.costMineral + " <img class=\"LogoIhm\" src=\"./objects/Logo/Rock.png\"></span>");
    build.add(options, "add_farm").name("Farm <span class=\"resCost\">" + Farm.costMineral + " <img class=\"LogoIhm\" src=\"./objects/Logo/Rock.png\"></span>");
    build.add(options, "add_rocket").name("Rocket <span class=\"resCost\">" + Rocket.costMineral + " <img class=\"LogoIhm\" src=\"./objects/Logo/Rock.png\"></span>");
    build.open();

    var opt = this.ihm.addFolder("Options");
    opt.add(options, "zoom", 0, 100).name("Zoom");
    opt.add(options, "handle_fullscreen").name("Fullscreen");
    opt.open();
  }
  update(elapsedTime, delta) {
    this.handle_zoom();
    this.handle_timer(elapsedTime);
  }
  handle_zoom() {
    var ratio = this.options.zoom / 100 + 0.7;
		this.univers.planet.scale.set(ratio, ratio, ratio);
		this.univers.planet.hitbox.scale.set(ratio, ratio, ratio);
  }
  handle_timer(elapsedTime) {
	  var timerbox = document.getElementById("timerbox");
	  var time = 300 - (elapsedTime / 1000);
	  if (parseInt(time) > 0)
		  timerbox.innerHTML = "<br>Comet incoming!<br>" + parseInt(time / 60) + ":" + parseInt(time % 60 / 10) + parseInt(time % 60 % 10) + "<br><br>";
	else   timerbox.innerHTML = "<br>Comet incoming!<br>0:00<br>";
  }
}
