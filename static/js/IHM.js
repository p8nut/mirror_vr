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
      .name("Population")
      .listen();
    this.stat
      .add(base, "food", base.food)
      .name("Food")
      .listen();
    this.stat
      .add(base, "minerals", base.minerals)
      .name("Minerals")
      .listen();
    this.stat
      .add(base, "gas", base.gas)
      .name("Gas")
      .listen();
    this.stat.domElement.style.pointerEvents = "none";

    var options = (this.options = {
      add_mineral_factory: function() {
	      buildingType = MineralFactory;
      },
      add_gas_factory: function() {
	buildingType = GasFactory;
      },
      add_rocket: function (){	      
      },
      handle_fullscreen: function() {
        screenfull.toggle();
        if (screen.orientation)
          Promise.all([screen.orientation.lock("landscape-primary")]);
      },
      zoom: 0,
    });

    var build = this.ihm.addFolder("Build");
    build.add(options, "add_mineral_factory").name("<span class=\"resName\">Mineral factory</span> <span class=\"resCost\">" + MineralFactory.costMineral + " minerals</span>");
    build.add(options, "add_gas_factory").name("<span class=\"resName\">Gas factory</span> <span class=\"resCost\">" + GasFactory.costMineral + " minerals</span>");
    build.add(options, "add_rocket").name("Rocket");
    build.open();

    var opt = this.ihm.addFolder("Options");
    opt.add(options, "zoom", 0, 100).name("Zoom");
    opt.add(options, "handle_fullscreen").name("Fullscreen");
    opt.open();
  }
  update(elapsedTime, delta) {
    this.handle_zoom();
  }
  handle_zoom() {
    var ratio = this.options.zoom / 100 + 0.7;
    this.univers.planet.scale.set(ratio, ratio, ratio);
  }
}
