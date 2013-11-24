;(function(config){
	var NuxConfig = {
		allowGlobals: true,
		globalName: "Nux",
		globalConfigName: 'NuxConfig',
		name: "Name",
		debug: false,
		prefix: "NX",
		// secure defined the requirement to check if an asset
		// is allowed to be imported.
		// If false, the extension must first be applied through
		// addAllowed(name)
		// If true, the extension will be allowed automatically
		secure: false,
		// Extension namespace to build an extension
		// based upon spaces loaded. - It"s at this
		// point we target another application or version 
		// foo.extension.2
		extensionNamespace: "nux.extension",
		// Load folder for extension matching the expression
		// {extennsionNamespace}.{extensionName}.js
		extensionPath: "js/nux/extensions/",
		// Call once, if only once instance of the 
		// Nux can be booted at any given time.
		runOnce: true,
		overrideSpace: 'override',
		
		// If a method is called prior to the Nux.boot() method
		// being called; autoBoot ensures the call does not go
		// unanswered. Instead; core logic is imported using 
		// boot config settings and an attempt is made to the method
		// call when required.
		autoBoot: true,
		// Automatically collect requirements (other extensions
		// the importing extension requires to run correctly)
		required: true,
		// Extensions allowed to be executed and implemenred
		// This should only exist in
		// core loaders and baked
		// objects
		allowed: [],
		// Special internal logger written to conform
		// to a log method for Nux, 
		// Apply slog name to define an action
		// performed under 'slog name' when in debug
		ignoreLog: ['handle'],
		
	}

	var Nux = {
		__config: function(){
			return NuxConfig
		},
		implementPreloaded: function(__nux){
			// implement a an object set into
			// nux.
			for (var i = __nux.length - 1; i >= 0; i--) {
				this.implement.apply(this, (function(){
						
						return [
							this.paths, 
							this.method(this.config, NuxConfig), 
							this.config
						]
					}).apply(__nux[i]));
			};

		},
		implement: function(paths, method, config){
			function assign(obj, keyPath, value) {
			   lastKeyIndex = keyPath.length-1;
				for (var i = 0; i < lastKeyIndex; ++ i) {
					key = keyPath[i];
					if (!(key in obj))
				   	obj[key] = {}
				 	obj = obj[key];
				}

				obj[keyPath[lastKeyIndex]] = value;
				return obj
			}
			// Map module into Nux.
			for(var key in config) {
				NuxConfig[key] = config[key]
			}

			return assign(this, paths, method);
		},

		
	};

	var NuxLoader = function(){
		if(window.hasOwnProperty('__Nux')) {
			Nux.implementPreloaded( window['__Nux'] );
		};

		var self = this
		/** legacy and shortcut additions. **/
		
		// self['import']  	= self.fetch.get;
		self.load 			= self.fetch.load;
		self.configure		= self.config.configure;
		self.booted 		= false;
		self.NS 			= self.core.namespace;
		self.space 			= self.core.space;
		self.onReady 		= self.events.ready;
		self.onAllExpected 	= self.events.allExpected;
		self.addAllowed 	= self.config.addAllowed;

		self.core.globalise.apply(self);
		
		var init = function(config, args) {
			console.time('Full load')

			self.config.merge(config);
			var loadA = ['required', 'nux'];
			var assetPath = self.config.configif(self.__config().assets)
				
			self.assets.add(assetPath)
				.load(loadA, function(){
					

					// Init assets is called from self core js
					// at this point all defined required assets
					// have been loaded.
				
					// Booted flag for call once.
					var booted = self.booted,
						cc = 0;

					if(booted && self.__config().runOnce) return booted;
					self.booted = true;
					
					console.time('Nux')
					if( self.__config().kernel) {
						self.use('kernel', function(){
							self.core.slog("READY","Nux booted.");
							self.events.callEvent('ready', true)
						})
					} else {
						self.core.slog("READY","Nux booted.");
						self.events.callEvent('ready', true)
						
					}

				});		
				return self;	
		};

		return self.boot = function(localConfig) {
			var bootConfig = config;
			var mergedConfig = Nux.config.merge(bootConfig, localConfig, 'FILL');
			
			return init.apply(this, [mergedConfig]);
		}
	}

	// Boot the Nux lib
	return NuxLoader.apply(Nux, arguments);
})({
	// Name the parental object to exist.
	// If this is not 'Nux' the initial Nux object
	// will be deleted from the namespace
	name: "Foo",
	// console logs and test are implemented if required.
	debug: true,
	// Load folder for extension matching the expression
	// {extennsionNamespace}.{extensionName}.js
	extensionPath: "js/nux/extensions/",
	vendorPath: "js/nux/vendor/",

	// Extensions allowed to be executed and implemenred
	// This should only exist in
	// core loaders and baked
	// objects
	allowed: [
	]
})