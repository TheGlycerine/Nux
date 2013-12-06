var renderer = Nux.NS('spaceship.renderer');

renderer.polygon = function(points) {

}

renderer._meta.main = function(){
	console.log("Spaceship renderer");
}

renderer._meta.required = [
	'spaceship'
]