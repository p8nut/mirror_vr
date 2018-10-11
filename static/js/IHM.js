////////////////////////////// RESOURCES ///////////////////////////////
var base = {
  nb_population: 10,
  nb_food: 50,
  nb_minerals: 50.0,
  nb_gas: 50.0
};
///////////////////////////// !RESOURCES ///////////////////////////////

class IHM {
  constructor(univers) {
    var univers = (this.univers = univers);
    var stat = (this.stat = new dat.GUI({ autoplace: false }));
    var ihm = (this.ihm = new dat.GUI({ autoplace: false }));
    var scale = (this.scale = 1);

    stat.domElement.id = "stat";
    ihm.domElement.id = "ihm";

    stat
      .add(base, "nb_population", base.nb_population)
      .name("Population")
      .listen();
    stat
      .add(base, "nb_food", base.nb_food)
      .name("Food")
      .listen();
    stat
      .add(base, "nb_minerals", base.nb_minerals)
      .name("Minerals")
      .listen();
    stat
      .add(base, "nb_gas", base.nb_gaz)
      .name("Gas")
      .listen();
    stat.domElement.style.pointerEvents = "none";

    var options = (this.options = {
      add_building: function() {
        sendPopUp("message");
      },
      add_mineral_extractor: function() {},
      add_gaz_extractor: function() {},
      handle_fullscreen: function() {
	screenfull.toggle();
	if (screen.orientation)
	  screen.orientation.lock("landscape-primary");    
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
  update(elapsedTime) {
    this.handle_zoom();
  }
  handle_zoom() {
    var ratio = this.options.zoom / 100 + 0.7;
    this.univers.planet.scale.set(ratio, ratio, ratio);
  }
}
