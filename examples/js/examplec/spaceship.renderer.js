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


renderer.setup = function(){
	this.simulator = this.setupSim();
	this.animationLoop(this.simulator);
	basic.shape.simulator(this.simulator);
	this.polygon(4)
	
}

renderer._meta.main = function(){
	debugger;
	this.setup()
	console.log("Spaceship renderer");
}

renderer._meta.required = [
	'basic.renderer.verlet',
	'basic.shape'
]