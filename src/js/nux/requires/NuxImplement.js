var NuxImplement = function(args) {

	// Build the core component set required
	// to preload a Nux implementation.
	if(	!window.hasOwnProperty('__Nux') ){
		window['__Nux'] = [];
	}
	// Not place the implementation loader
	// ready for nux to implement later.
	
	
	// name
	// [name]
	// globalConfigObj
	// function
	var method = null;
	var globalConfigObj = {};
	var paths = [];

	for (var i = args.length - 1; i >= 0; i--) {
		var val = args[i];
		if(i == args.length - 1) {
			// This is the method to implement.
			method = val;
		} else if (i == args.length - 2) {
			// values to be merged into 
			// the global required options
			globalConfigObj = val;
		} else {
			paths.unshift(val);
		}

	};
	window['__Nux'].push((function(paths, method, globalConfigObj){
			return {
				paths: paths,
				method: method,
				config: globalConfigObj
			}
		})(paths, method, globalConfigObj));
}