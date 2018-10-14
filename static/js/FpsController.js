function FpsController(fps, callback) {
    var	delay = 2000 / fps;
    var time = null;
    var frame = -1;
    var tref;

    function loop(timestamp) {
	if (time === null) time = timestamp;
	var seg = Math.floor((timestamp - time) / delay);
	if (seg > frame) {
	    frame = seg;
	    callback({
		time: timestamp,
		frame: frame
	    })
	}
	tref = requestAnimationFrame(loop)
    }

    this.isPlaying = false;
    
    this.frameRate = function(newfps) {
	if (!arguments.length) return fps;
	fps = newfps;
	delay = 2000 / fps;
	frame = -1;
	time = null;
    };
    
    this.start = function() {
	if (!this.isPlaying) {
	    this.isPlaying = true;
	    tref = requestAnimationFrame(loop);
	}
    };
    
    this.pause = function() {
	if (this.isPlaying) {
	    cancelAnimationFrame(tref);
	    this.isPlaying = false;
	    time = null;
	    frame = -1;
	}
    };
}
