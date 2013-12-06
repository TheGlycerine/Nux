nuxReady = function(){
	// This method will boot when nux is prepared

	// lets build a spaceship!
	_nuxcar = Nux.use(['spaceship'], function(){
		console.log('spaceship has loaded')
	}, 'js/examplec/')
}