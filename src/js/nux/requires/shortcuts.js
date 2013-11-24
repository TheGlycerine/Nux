;(function(){
	NuxComponentHeader.apply(this, arguments)
})('use', {
	// global options
},function(){
	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.
	/** legacy and shortcut additions. **/
	// self['import']  	= self.fetch.get;
	return function(obj){
		console.log("Implement shortcuts")
		
		var self = this;
		self.load 			= self.fetch.load;
		self.configure		= self.config.configure;
		self.booted 		= false;
		self.NS 			= self.core.namespace;
		self.space 			= self.core.space;
		self.onReady 		= self.events.ready;
		self.onAllExpected 	= self.events.allExpected;
		self.addAllowed 	= self.config.addAllowed;
		
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
