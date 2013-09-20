var _kernal = Nux.NS('kernel');

_kernal._meta.main = function(config){
	var cc = 0;
	
	Nux.use(['core', 'timer'], function(extension){
		console.log("Core and timer imported")
	}).then('loader', function(extension){
		// stack overload.
		if(cc>10) { cc++; debugger;  };
		
		// Wait for all expected packages (as required via the imported packages)
		// to import.
		Nux.onAllExpected(function(){ 
			// This should only be run once and 
			// complete is defined by the extensions
			// loaded in this chain.
			console.timeEnd('Full load')
			console.timeEnd('Nux')
			Nux.core.slog('FINISH', 'Nux');
		})
	});
}

_kernal._meta.allowed = [
	"nux.extension.core", 
	/*{ 
		name: "nux.extension.timer", 
		// List of allows overrides this
		// extension can extend
		overrides: ['nux.extension.listener']
	},*/
	"nux.extension.timer",
	"nux.extension.error",
	"nux.extension.loader",
	"nux.extension.logger",
	"nux.extension.packager",
	"nux.extension.alpha.signals"
]