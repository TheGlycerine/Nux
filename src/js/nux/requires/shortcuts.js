;(function(){
	NuxComponentHeader.apply(this, arguments)
})('_use', {
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
		
		/*
		var self = this;
		self.load 			= self.fetch.load;
		self.configure		= self.config.configure;
		self.booted 		= false;
		self.NS 			= self.core.namespace;
		self.space 			= self.core.space;
		self.onReady 		= self.events.ready;
		self.onAllExpected 	= self.events.allExpected;
		self.addAllowed 	= self.config.addAllowed;
		*/
	}
})
