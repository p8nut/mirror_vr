class IHM {
  constructor(univers) {
    this.univers = univers;
    var stat = (this.stat = new dat.GUI({ autoplace: false }));
    var ihm = (this.ihm = new dat.GUI({ autoplace: false }));
    var scale = (this.scale = 1);
    var base = univers.main_base;
    stat.domElement.id = "stat";
    ihm.domElement.id = "ihm";

    stat
      .add(base, "population", base.population)
      .name("Population")
      .listen();
    stat
      .add(base, "food", base.food)
      .name("Food")
      .listen();
    stat
      .add(base, "minerals", base.minerals)
      .name("Minerals")
      .listen();
    stat
      .add(base, "gas", base.gas)
      .name("Gas")
      .listen();
    stat.domElement.style.pointerEvents = "none";

    var options = (this.options = {
      add_building: function() {},
      add_mineral_extractor: function() {},
      add_gaz_extractor: function() {},
      handle_fullscreen: function() {
        screenfull.toggle();
        if (screen.orientation)
          Promise.all([screen.orientation.lock("landscape-primary")]);
      },
      zoom: 0
    });

    var build = ihm.addFolder("Build");
    build.add(options, "add_mineral_extractor").name("Mineral extractor");
    build.add(options, "add_gaz_extractor").name("Gas extractor");
    build.add(options, "add_building").name("Building");
    build.open();

    var opt = ihm.addFolder("Options");
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
