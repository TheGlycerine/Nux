nuxReady = function(){
	// This method will boot when nux is prepared

	// lets build a car!
	exa = Nux.use(['example.a'], function(){
		console.log("nuxReady: import example.a", this)
	}, 'js/importchaintest/');

}