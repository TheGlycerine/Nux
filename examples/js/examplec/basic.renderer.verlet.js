var _verlet = Nux.NS('basic.renderer.verlet');

_verlet.setupSim = function(){
	/*
	Setup the entire simulator
	 */
	var canvas = this.getCanvas('canvas');
	var sim = new VerletJS(canvas.width, canvas.height, canvas);
	sim.friction = .1;
	return sim
}

_verlet.animationLoop = function(simulator){
	// animation loop
    var loop = function() {
            simulator.frame(16);
            simulator.draw();
            requestAnimFrame(loop);
    };

    loop();
}

_verlet.setup = function(){
	this.simulator = this.setupSim();
	this.animationLoop(this.simulator);	
}

_verlet.getCanvas = function(canvasId){

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

_verlet._meta.main = function(){
	debugger;
	this.setup(); 
	console.log("Spaceship _verlet");
}

_verlet._meta.assets = [
	'./vendor/verlet-1.0.0.js',
]
