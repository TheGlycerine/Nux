Nux.onReady(function(Nux){
	 
	Nux.addAllowed([
		"nux.extension.core",
		"nux.extension.timer",
		"nux.extension.error",
		"nux.extension.loader",
		"nux.extension.packager",
		"nux.extension.alpha.signals"
	]);

	Nux.use(['core', 'timer'], function(extension){
		console.log("Core and timer imported")
	}).then('loader', function(extension){
		// stack overload.
		if(cc>10) { cc++; debugger;  };
		
		// Wait for all expected packages (as required via the imported packages)
		// to import.
		Nux.onAllExpected(function(){ 
			console.timeEnd('Full load')
			console.timeEnd('Nux')
			Nux.core.slog('FINISH', 'Nux');
		})
	});

});

var cc = 0;