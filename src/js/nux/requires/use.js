;(function(){
	NuxComponentHeader.apply(this, arguments)
})('use', {
	// global options
},function(){
	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.
	
	return function(obj){
		/* provide array or string of assets to import */
		var handler = arg(arguments, 1, Nux._F);
		// Attempt to collect the extension path from the parent.
		// Hopefully Use() has been used within an extensions' scope - 
		// thusly willy have a _.meta.importObject from it's related 
		// import
		// 
		// Failing that, use the global __config().extensionPath
		
		var ip = (this._meta && this._meta.importObject)? this._meta.importObject.path: Nux.__config().extensionPath;
		var path = arg(arguments, 2, ip);
		
		if(Themis.of(path, Object)) {
			path = (path.hasOwnProperty('_meta'))? path._meta.path: ip;
		}

		if(!Nux.booted) {
			Nux.errors.throw(00, 'Nux.boot() must be performed')
		}
		
		// Allow the second parameter to be a string for an import path;
		// Nux.use('com.path', 'path/folders');
		if(Themis.of(handler, String) && path == ip) {
			path = handler;
			handler = Nux._F;
		}
		var hook = Nux.fetch.use(obj, handler, path, obj);

		return hook;
	}
})
