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
				if(Nux.hasOwnProperty('stack')) {
					var stackSpace = Nux.stack.create(hookChain, handler);
	
					// Add data to be given to the handlers when called
					stackSpace.data.path = path;
	
					// Add a set of strings into array set
					stackSpace.expected.add(hookChain);
					stackSpace.handlers.add(handler);
				}
				
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
			newStyleStack: {
				_stacks: {},
				addToStack: function(id, stack, values) {
					console.log('add', id, stack)
					if(!this._stacks.hasOwnProperty(id)) {
						this._stacks[id] = {}
					}

					if(!this._stacks[id].hasOwnProperty(stack)) {
						this._stacks[id][stack] = [];
					}

					this._stacks[id][stack] = this._stacks[id][stack].concat(values)
					// console.log(id, this._stacks[id])
					// console.log('this._stacks[', id, '][', stack, ']', values);
					// console.log(this._stacks)

				},
				stripFromStack: function(_slice, value) {

					var stackSize = 0,
						ready = {};

					for (var id in this._stacks) {
						stackSize++;
						var slice = this._stacks[id][_slice];
						// if value in stack[slice] - remove it.
						// console.log('looking at', slice)
						if(!slice) {
							console.warn("Missing slice for", id, this._stacks, '=', slice);
						} else {
							var i = slice.indexOf(value);

							// console.log('finding slice', value, typeof(value), 'in', slice, 'for', id)
							if(i > -1) {
								// console.log('slice', value, 'from', _slice, slice, i)
								slice.splice(i, 1);
							}
						}

						if(slice.length == 0) {
							// console.log(_slice, "done for slice", id)
							if(!ready.hasOwnProperty(id)) ready[id] = []
							ready[id].push(_slice);
						}
					}

					return ready;
				},
				finished: function(id){
					/*
					If all elements within a stack entity is empty (all
					elements within the slice array have been removed using
					stripFromStack()) then true is returned.
					 */
					var dic = (id)? this._stacks[id]: this._stacks;
					var v, t=0;
					for (var prop in dic) {
						v = this._stacks[id][prop];
						t += v.length;
					}

					return Boolean(!t);
				},
				handle: function(listener){ 
					var ex = listener.item._meta;
					var map = (ex && ex.map)? ex.map: null,
						required = (ex && ex.required)? ex.required: null,
						errors = (ex && ex.errors)? ex.errors: null,
						assets = (ex && ex.assets)? ex.assets: null;
				},
				has: function(id, stack) {

					for (var prop in this._stacks[id]) {
						if(this._stacks[prop] == stack) {
							return true
						}
					}
					return false;
				},
				expected: function(id) {
					/*
					Return an object defining arrays of elements needed.
					if an element in an array is empty, all requested
					items have been removed with stripFromStack
					 */
					if(id) {
						return this._stacks[id]
					}
					return this._stacks;
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
				
				// console.log('GOT', listener.name)

				// remove a listener based upon a passed sort method
				

				/*
				Nux.stack.traverse('expected', function(name){
					if(name == listener.name) {
						console.log('SLICE', name)
						this.remove(name);
					}
				});
				*/
				
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
				
				Nux.listener.newStyleStack.stripFromStack('required', listener.name)
				Nux.listener.newStyleStack.handle(listener)
			
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
