examples = {
	importShip: function(button){
		// Ship is imported
		Nux.use(['spaceship'], function(){
			console.log('spaceship has loaded');
			$(button).addClass('imported');
		}, 'js/examplec/');
	},
	importRenderer: function(button) {
		Nux.use(['spaceship.renderer'], function(){
			console.log('spaceship renderer');
			$(button).addClass('imported');
		}, 'js/examplec');
	}
}

$(document).ready(function(){
	$('#spaceshipButton').click(function(){
		examples.importShip(this)
	});

	$('#spaceshipRendererButton').click(function(){
		examples.importRenderer(this)
	});

});

nuxReady = function(){
	// This method will boot when nux is prepared
}