;(function(){
	NuxComponentHeader.apply(this, arguments)
})('signature', {
	// global options
},function(){
	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.
	return {
			signatures: {},
			overrides: {},
			// A space defines a signatures set and values.
			space: function(){
				var _space = {
					allowed: false,
					children: false,
					expected: false,
					/* The extension has loaded and the methods main
					import has been run */
					run: false,
					received: false
				}

				return _space;
			},
			state: function(name){
				// return the state of an entity;
				var _n = Nux.space(name);
				return Nux.signature.signatures[_n];
			},
			createSpace: function(obj){
					return Nux.signature.signatures[obj] = (new Nux.signature.space);
			},
			getSpace: function(obj) {

				if(!Nux.signature.exists(obj)) {
					Nux.signature.createSpace(obj);
				}

				return Nux.signature.signatures[obj]
			},


			exists: function(name) {
				// A config has loaded itself.
				return Nux.signature.signatures.hasOwnProperty(name)
			},
			
			add: function(name){
				/*
				Add a signature to the map to check 
				when the extension is loading.
				 */
				// A config has loaded itself.
				var space;

				if(!Nux.signature.exists(name)) {
					space = Nux.signature.createSpace(name);
					Nux.core.slog("WANTED", name);
				}

				return space || Nux.signature.getSpace(name);
			},

			permit: function(name, children) {

				// If children, check to see if name permit 
				// has children referenced. 
				// If no children are dermined (by space awareness?)
				// Call the allowed and inspect the children
				var sigSpace = Nux.signature.getSpace(name);
				sigSpace.allowed = true;
				sigSpace.children = children;
				debugger
			},
			receive: function(name){
				var a = arguments;
				name = arg(a, 0, null);
				name = name.name || name;

				Nux.core.slog('RECEIVE', name)

				if(Nux.signature.expected(name)) {
					var sigSpace = Nux.signature.getSpace(name);
					sigSpace.received = true;
				} else {
					Nux.signature.allowed(name, function(){
						Nux.core.slog('UNEXPECTED', 'ALLOWED ' + name);
					}, function(){
						Nux.core.slog('UNEXPECTED', 'REFUSE ' + name);
					})
				}
			},

 			run: function(name, runValue) {
 				// the imported object's run procedure has
 				// occured
 				if( Nux.signature.exists(name)) {
 					var sigSpace = Nux.signature.getSpace(name);
 					sigSpace.run = runValue;
    				Nux.core.slog("RUN", name)

 				} else {

					Nux.signature.allowed(name, function(){
						Nux.core.slog('BAD RUN', name);
					}, function(){
						Nux.core.slog('NO RUN', 'REFUSE ' + name);
					})	
 				}

 				return Nux.signature.getSpace(name)
 			},

			expected: function(){
				/**
				 * return if the package name is expecting to load.
				 * This would occur between an import and receive event
				 * for the importing package.
				 * 
				 * expected() --> returns array of expected imports
				 * expected(name) --> returns bool if name is expected
				 * expected(name, bool) --> set the expecting value
				 */
				var a = arguments;
				var name = arg(a, 0, false);
				var v = null;

				if(name) {					
					if (arg(a, 1, false) == true ) {
						
						if(Nux.fetch.expected.indexOf(name) == -1) {
							
							Nux.fetch.expected.push(name);
							v = true;						
							if( Nux.signature.exists(name) ) {
								var sigSpace = Nux.signature.getSpace(name);
								sigSpace['expected'] = v;
								Nux.core.slog("EXPECTED", name)
							} 

						} else {

							v = true;

						}
			

					} else {
						if(Nux.fetch.expected.indexOf(name) > -1){
							v = true
						} else {
							v = false;
							sp = Nux.space(name);
							if(Nux.fetch.expected.indexOf(sp) > -1){
								v=true;
							}
						}
					}
				} 


				var exp = (v !== null)? v: Nux.fetch.expected;
				
				// Nux.signature.signatures[name]['expected'] = v
				return exp;
			},

			allowed: function(name) {
				// returns true/false if the passed sig is
				// allowed. Pass a callback method to call 
				// in async request methods; i.e User input 
				var cb = arg(arguments, 1, null);
				var cbf = arg(arguments, 2, null);
				if( cb ) {
 					var r = Nux.assets.allow(name);
					if( r ) {
						return cb(name) || r;
					} else {
						return cbf(name) || r;

					};
				} else {
					return Nux.assets.allow(name)
				}
			},

			overridesAllowed: function(name, overrides) {
				var allows = {}

				if( overrides ) {	
					for( var i = 0; i < overrides.length; i++ ) {
						var override = overrides[i];
						allows[override] = Nux.signature.overrideAllowed(name, override)
					};
				} else {
					if(name) {
						allows = Nux.signature.overrides[name];
					}
				}

				// how many? return false;
				return allows;
			},

			overrideAllowed: function(name, override) {
				/* Pass an override string 

				 	overrideAllowed()
				 	    returns the overrides allowed.
				 	    
				 	overrideAllowed(name)
				 		return a list of overrides for this name
				 		
				 	overrideAllowed(name, override)
				 		returns boolean if this override is allowed.
				 	
				 returning bool if this application
				 is allowed to override this method
				*/
				if( Nux.signature.exists(name) ) {
					
					if( override ) {
						if( Nux.signature.overrides.hasOwnProperty(name) ) {
							var value = Nux.signature.overrides[name][override];
							if( Themis.of(value, Boolean)) {
								return value;
							} else if( Themis.of(value, Object) ) {
								return value.allowed;
							}
						} else {
							return false;
						}
					
					} else {
						return Nux.signature.overrides[name]
					}
				}

				return  Nux.signature.overrides
			},

			addFail: function(name){
				// Add a fail account against the signature
				// returns the count of fails occured

				if( Nux.fetch.fails.hasOwnProperty(name) ) {
					Nux.fetch.fails[name] += 1
				} else {
					Nux.fetch.fails[name] = 1;
				}

				if(Nux.signature.exists(name)) {
					Nux.signature.signatures[name]['fails'] = Nux.fetch.fails[name];
					Nux.core.slog("FAILED", name)					
				} else {
					Nux.core.slog("LOST FAIL", name)
				}


				return Nux.fetch.fails[name];
			},

			hasFailed: function(name){
				// Check if the signature passed (plugin name)
				// has failed returns 
				// true for failed 
				// false for a passed signature
				if( Nux.fetch.fails.hasOwnProperty(name) ) {
					return true;
				} else {
					return false;
				}
			}
		}
})
