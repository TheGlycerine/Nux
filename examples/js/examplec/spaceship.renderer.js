var renderer = Nux.NS('spaceship.renderer');

renderer.polygon = function(points) {
	basic.shape.polygon(points, this.simulator)
}

renderer.getCanvas = function(canvasId){

	 var canvas = document.getElementById(canvasId);
    // canvas dimensions
    var width = parseInt(canvas.style.width);
    var height = parseInt(canvas.style.height);

    // retina
    var dpr = window.devicePixelRatio || 1;
    canvas.width = width*dpr;
    canvas.height = height*dpr;
    canvas.getContext("2d").scale(dpr, dpr);
    return canvas;
}

renderer.setupSim = function(){
	/*
	Setup the entire simulator
	 */
	var canvas = this.getCanvas('canvas');
	var sim = new VerletJS(canvas.width, canvas.height, canvas);
	sim.friction = .1;
	return sim
}

renderer.animationLoop = function(simulator){
	// animation loop
    var loop = function() {
            simulator.frame(16);
            simulator.draw();
            requestAnimFrame(loop);
    };

    loop();
}

renderer.setup = function(){
	this.simulator = this.setupSim();
	this.animationLoop(this.simulator);
	basic.shape.simulator(this.simulator);
	this.polygon(4)
	
}

renderer._meta.main = function(){
	this.setup()
	console.log("Spaceship renderer");
}



renderer._meta.required = [
	'spaceship',
	'basic.shape',
]

renderer._meta.assets = [
	'./vendor/verlet-1.0.0.js',
]