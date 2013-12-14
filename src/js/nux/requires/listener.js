;(function(){
	NuxComponentHeader.apply(this, arguments)
})('listener', {
	// global options
},function(){
	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.
	return {
			// Storage place of handlers waiting for
			// imports
			listeners: [],
			masterListeners: {},
			
			add: function(names, handler){
				var path = arg(arguments, 2, null);
				// Loop names, applying namespace - 
				// follow by applying this as the new
				// handler hook chain
				// console.log('add', names)
				// Call the master listener, passing the element 
				// if which is called.
				Nux.listener.masterListener(names);

				var hookChain = [];
				for (var i = 0; i < names.length; i++) {
					var space = Nux.space(names[i], path);
					hookChain.push(space);
				};

				// Push the listener chain
			
				var importObject = Nux.listener.importObject(hookChain, handler, path)

				// Create a new stack to be monitored by the import framework.
				var stackSpace = Nux.stack.create(hookChain, handler);

				// Add data to be given to the handlers when called
				stackSpace.data.path = path;

				// Add a set of strings into array set
				stackSpace.expected.add(hookChain);
				stackSpace.handlers.add(handler);
				
				console.log('add', names);

				Nux.listener.listeners.push(importObject);
				return true;
			},

			importObject: function(hookChain, handler, path) {
				return {
					expectedListeners: hookChain,
					listeners: [handler],
					// Store the import path of this object
					// to be later passed to imported children,
					path: path,
					// List of extensions imported
					// (later to be passed to the handler method
					// as arguments)
					extensions: []
				}
			},

			getListener: function(name){
				// Return the space listener item containing import
				// information on this imported object by reference of it's name.
				var ret =[]
				for (var i = 0; i < Nux.listener.listeners.length; i++) {
					var entity = Nux.listener.listeners[i];
					if(entity.expectedListeners.indexOf(name) > 0) {
						ret.push(entity)
					}
				};

				return ret;
			},
			masterListener: function(space){
				/*
				Create and return the master listener
				 */

				if(!Nux.listener.masterListeners.hasOwnProperty(space)) {
					Nux.listener.masterListeners[space] = 1;
				} else {
					Nux.listener.masterListeners[space]++;
				};
				
				if(!Nux.listener.masterListeners['master']) {
					Nux.listener.masterListeners['master'] = Ajile.AddImportListener(Nux.listener.handler);
				}
				return Nux.listener._masterLister;
			},
			stack: {
				_stack: {},
				add: function(index, object) {
					if(!this.has(index)) {
						this._stack[index] = []
					}

					this._stack[index].push(object)
				},

				remove: function(index, func) {
					/*
					Remove an element based upon a response from
					the passed method.
					The index defines what stack to remove
					the element from.
					 */
					if(!this.has(index)) {
						return false;
					}

					// run on each element in the referenced (index) stack
					var val = this.each(index, function(item){
						var action = func(item);
						
						if(action === true)  {
							// do remove
						} else if(action === false) {
							// do not remove
						}

					});
				}, 

				each: function(index, func) {
					if(!this.has(index)) {
						return false;
					}

					var val = []
					for (var i = 0; i < this._stack[index].length; i++) {
						var item = this._stack[index][i];
						val.push(fun(item));
					};

					return val;
				},
				has: function(index){
					// returns true/false if the index exists.
					return this._stack.hasOwnProperty(index);
				}
			},
			handler: function(listener) {
				/*
				An extension was imported. The object passed is the 
				listener object containing the extension and the handler
				 */
				// call all methods hooked
				var ex = listener.item._meta;
				// This will be filled with handlers expected to
				// be called - 
				var handlers = [];

				if(!ex && listener.name != 'com.iskitz.ajile') {
					console.warn("Wooh! this extension has no _meta?", listener)
				}

				// strip the listener names from expected listeners
				var len = Nux.listener.listeners.length;
				
				console.log('GOT', listener.name)

				// remove a listener based upon a passed sort method
				Nux.stack.traverse('expected', function(name){
					if(name == listener.name) {
						console.log('SLICE', name)
						this.remove(name);
					}
				});

				while(len--) {
					var importObject = Nux.listener.listeners[len];

					var ni = importObject.expectedListeners.indexOf(listener.name);
					if(ni > -1) {
						// remove the name of the expected listeners
						var v = importObject.expectedListeners.splice(ni, 1);
						//console.log('Splicing', ni, v)
						// add a reference to the item imported.
						// by using the same index, arguments passed
						// back to the handler method are
						// positioned the same in the arguments
						// list
						//importObject.extensions.push(listener.item);
						if(ex) {
							ex.importObject = importObject;
							ex.path = importObject.path;
						}
						// This item is expected and has listeners attached waiting.
						Nux.listener.handleExpected(importObject, listener.item, ex);
					}

					if(importObject.expectedListeners.length == 0) {
						// If all the expected listeners have been
						// removed, for an import object - all extensions required for 
						// this handler have been fetched.

						// Merge the listeners of the import handlers into the array
						// of handlers to be called.
						handlers = handlers.concat(importObject.listeners);

						Nux.listener.listeners.splice(len, 1);
					}
				};

				Nux.listener.callListenerHook(handlers, listener.item, listener.item._meta)
			},

			handleExpected: function(importObject, extension, meta) {

			},

			callListenerHook: function(handlers, extension, meta){
				// Called for the listener hooks waiting on an extension and it's
				// requirements to be called. Once all valid imports are
				// successfull, this method is called

				// run the extension boot method (main|run) 

				// Call each handler in the array
  				for (var i = 0; i < handlers.length; i++) {
					var hook = handlers[i];
					hook.apply(Nux, [extension]);
				};
			}
		}
})
