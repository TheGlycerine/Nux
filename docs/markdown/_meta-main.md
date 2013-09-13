# _meta.main

The main run method allows you to execute logic when the
extension has been applied. 

	var foo = Nux.NS('foo');

	foo._meta.main = function(nux) {
		Nux.slog('SUP!', 'foo')
	}


Alternatively, you may pass a string reference to a method of which you would like to call. 


	var myExt = Nux.NS('example')

	myExt.metaRun = function(config){
		Nux.log('metaRun. Optionally run another method name at load')
	}

	myExt._meta.main = 'metaRun'


Finally, if the _meta.main method is not implemented, a root method `run()` will be called. This is mostly a legacy supported feature and will be removed. 

	var foo = Nux.NS('foo');

	foo.run = function(config){
	    Nux.slog("Hi :)", 'foo')
	}
