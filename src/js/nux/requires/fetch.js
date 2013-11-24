;(function(){
	NuxComponentHeader.apply(this, arguments)
})('fetch', {
	// global options
},function(){
	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.
	return {
			fails: {},
			expected: [],
			listeners :{},
			chain: [],
			imported: [],	

			load: function() {
				return Load.apply(this, arguments);
			},
			
			use: function(name) {
				/*
				Externally accessible method o implement a Nux
				extension. the Use method:

					use(nameString [, handlerFunction][, importPathString])

				returned is an extension chain containing:

					then(name [, handlerFunction])
				
				This method implements the fetch.get method
				 */
				var handler = arg(arguments, 1, Nux._F);
				var path = arg(arguments, 2, Nux.__config().extensionPath);
				
				// Add to handler chain
				// This method may throw an error is the asset has been refused.
				
				// Turn a string into an array if required.
				var _handlerHooks = (Themis.of(name, Array))? name: [name];
				// spaceify the names
				var handlerHooks = [];

				for (var i = 0; i < _handlerHooks.length; i++) {
					var _name = Nux.space(_handlerHooks[i]);
					handlerHooks.push(_name);
				};
				
				// name is implemented as array only
				Nux.listener.add(handlerHooks, handler);

				console.time(handlerHooks)
				// Add removeListener (on name import list) handler to listeners
				Nux.listener.add(handlerHooks, function(ext){
					console.timeEnd(ext.name);				});

				for (var i = 0; i < handlerHooks.length; i++) {
					var name = handlerHooks[i];
					// begin import
					Nux.fetch.get(name, path);
				};

				// Nux.fetch.get(Nux.space(name), path);
				
				/*
					// receive import
						// handle import to all listeners
							// slice import name from any handler in chain with importName in [name] array
							// handler handlers with an empty array of names should be called:
								Every call made removed a name from the list. If the
								list is empty all names are imported and the handler 
								should be called.
							// removed any called listener.
				// return chain methods:
					// Use: 
						perform another concurrent call. 
						use() is returned because you may want a different
						handler hooked to a name import
					// Then:
						After the previous handlers have been executed, ( use() )
						_then_ perform this method.
					// On: 
						Inhert handler of which is only called when the name
						is imported. No import is made when on() referenced
				 */
			},

			get: function(name){
				/*
				Perform an import utilizing the namespace.
				A single fully qualified name should be passed.
				listeners should already be prepared.
				This method implements the internally used _import method.
				*/
				var path = arg(arguments, 1, Nux.__config().extensionPath);
				return Nux.fetch._import(name, path);
			},
			
			_import: function(name){
				/*
				Performs an import to the referenced file.
				This should be used internally in favour of the 
				fetch.use(name, handler) method.
				Handlers and callbacks should have been setup prior
				to calling this method.

				return is undefined.
				 */
				
				var path = arg(arguments, 1, Nux.__config().extensionPath),
					v 	 = Include(name, path);
				return v;
			}
		}
})
