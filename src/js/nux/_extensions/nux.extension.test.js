var _test = Nux.NS('test');

_test._meta.main = function(config){
	Nux.core.slog("Run test")
}


_test._meta.required = [
	"nux.extension.testRequired", 
]

_test._meta.allowed = [
	"nux.extension.testAsset", 
	/*{ 
		name: "nux.extension.timer", 
		// List of allows overrides this
		// extension can extend
		overrides: ['nux.extension.listener']
	},*/
]