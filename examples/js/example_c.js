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
			
			$(button).addClass('imported');
		}, 'js/examplec');
	},
	renderPoly: function(count) {
		$(this).addClass('imported');

		return basic.shape.polygon(count);
	}
}

$(document).ready(function(){
	$('#spaceshipButton').click(function(){
		examples.importShip(this)
	});

	$('#spaceshipRendererButton').click(function(){
		examples.importRenderer(this);
		$('.polyButton').removeClass('hidden');
	});

	$('#triangleButton').click(function(){
		examples.renderPoly.call(this, 3)
	})

	$('#squareButton').click(function(){
		examples.renderPoly.call(this, 4)
	})
});

nuxReady = function(){
	// This method will boot when nux is prepared
}