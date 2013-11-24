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
		var path = arg(arguments, 2, Nux.__config().extensionPath);

		if(!Nux.booted) {
			Nux.errors.throw(00, 'Nux.boot() must be performed')
		}
		
		var hook = Nux.fetch.use(obj, handler, path, obj);

		return hook;
	}
})
