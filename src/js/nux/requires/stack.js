;(function(){
	return NuxComponentHeader.apply(this, arguments)
})('stack', {
	// global options
},function(){

	return {
		_stacks: {},
		setCollections: {},
		SetCollection: function SetCollection(name){
			/*
			combines a list of Sets with a handler.
			The handler will be call automatically
			once all the set.list() are empty.
			 */
			var setCollection = (function Collection(name){
				var sets = [];
				var handled = false;
				this._class = 'Collection';
				this.name = name;
				var self = this;
				this.add = function(set){
					// add a set to the collection
					sets.push(set);
					// this.handleIfReady()
					return this;
				}

				this.sets = function(){
					return this.set()
				}

				this.each = function(func) {
					for (var i = 0; i < this.sets().length; i++) {
						func(this._sets()[i])
					};
				}
				this.has = function(name, ret){
					/*
					return boolean if the stack exists.
					 */
					for (var i = sets.length - 1; i >= 0; i--) {
						
						if(sets[i].name == name) return (ret)? sets[i]: true;
					};

					return false;
				}

				this.set = function(name) {
					// return a set from the collection;
					return (name)? this.has(name, true): sets;
				}

				this._handler = [];
				this.handler = function(handler){

					if(handler === undefined) {

						if(this._handler.length > 0) {
							var _h = (function(){
								var self=this;
								return function(){
									handled = true;
									var scope = self.scope()
									for (var i = self._handler.length - 1; i >= 0; i--) {
										var __handler = self._handler[i];
										__handler.apply(scope || Nux, [self]);
									};
								}
							}).call(this)

						} else {
							if(this.name == 'example.c') debugger;
							console.warn("collection has no handler", this.name)
						}

						
						return _h;

					} else {
						this._handler.push(handler);
						this.handleIfReady()
						return this;
					}
				}

				this._scope;
				this.scope = function(scope){
					if(!scope) {
						return this._scope;
					} else {
						this._scope = scope;
						return this;
					}
				}

				this.each = function(func) {
					for (var i = sets.length - 1; i >= 0; i--) {
						var set = sets[i];
						if(func) {
							func(set)
						};
					};
					return this;
				}


				this.ready = function(){

					var ready = {}
					var count = 0
					this.each(function(set){
						// console.log('checking', set.name, set.list)
						ready[set.name]= (set.ready())? 1: 0;
					})

					for (var set in ready) {
						count += ready[set];	
					}

					// console.log('ready', ready, count, '==', sets.length);

					return Boolean(count == sets.length);
				}
				this.done = function(){
					/*
					ready and handler has been called. 
					This set should become stale until delete.
					 */
					return (this.ready() && handled);
				}

				this.remove = function(name, arr) {
					// pass an array of elements to be removed
					// from the inner sets. 
					// The concept of a set collection, defines all 
					// set.list()'s elements are globally deleted when
					// an asset arrives; as all extensions (a stack) 
					// share resources.
					if(arr === undefined && Themis.of(name, Array))  {
						arr = name;
						name = undefined;
					}

					this.each(function(set){
						if(arr.length > 0) {
							if(name && set.name ==  name) {
								set.remove(arr);
							} else {
								set.remove(arr);
							}
						}
					});
					this.handleIfReady()
				};

				this.handleIfReady = function(){
					if(this._handler===false) return false;
					if(this.ready() && !this.done()) {
						var h = this.handler();
						if(h) h()
					}
					return false;
				}

				return this;
			}).apply({}, [name]);
			return setCollection;

		},
		report: function(name){
			// debugger;
			for (var s in Nux.stack._stacks) {
				var _s = Nux.stack._stacks[s];

				if (Nux.stack._stacks.hasOwnProperty(s) &&
					( (name)? s == name: true )) {
					
					console.log('stack', _s.name, ':', _s.ready());
					_s.each(function(set){ 
						console.log(' - ', set.name, set.list, set.ready())
					});
					console.log('---')
				}
			}
		},
 
		Set: function(name, list, handler){
			
		},
		hasSet: function(name){
			return (this._stacks.hasOwnProperty(name));
		},

		inSet: function(value,_set) {
			/*
			returns the location of
			the value passed within a 
			set within a stack
			 */
			out = [];
			Nux.stack.eachSet(function(set, stack) {
				if( set.list.indexOf(value) > -1 
					&& stack.name != value
					&& ( _set? set.name==_set: true )) {
					out.push({ set: set.name, stack: stack.name })
				}
			})
			return out;
		},

		createOrReturn: function(name){
			if(!this.hasSet(name)) {
				console.log("MAKE", name);
				// if(name == 'example.c') debugger
				this._stacks[name] = this.SetCollection(name);
			} 
			return this._stacks[name];
		
		},
		create: function(name, handler) {
			/* By using the create() method,
			you can ensure a correct handler is 
			applied to the collection stack */
			
			// A dummy collection evokes the createOrReturn
			var collection =  Nux.stack.add(name, 'stack', []);

			// A handler is added (in theory a boot method)
			collection.handler(handler)
			return collection
		},
		add: function(id, stack, values) {
			/*
			Adds to a stack
			 */
			
			/*
			Create a new boot stack to be given back
			 */
			var collection = this.createOrReturn(id);
			// This should be a collection element returned.
			if(!collection.has(stack)) {
				// stack should be an array
				set = this.Set(stack, values, function(){
					/*
					This is the set handler - this will be called when all
					the elements from the 'values' has been stripped from the
					Sets list.
					 */
					console.log('  -', this.name, 'add() handler')
				});

				collection.add(set);
			} else {
				// console.log('add', id, stack)
				set = collection.set(stack)
				set.add(values)
			}
			return collection
			// Apply to other collection wait set - This
			// extension must complete before the 
			// referenced collection completes.
			// debugger;

			// Now apply this

		},

		remove: function(_slice, value){
			var stackSize = 0,
				ready = {};

			//console.log('looking at', _slice)
			for (var id in this._stacks) {
				stackSize++;
				var collection = this._stacks[id]
				// if value in stack[slice] - remove it.
				if(collection.ready() && !collection.done()) {
					console.log('- STACK Call collection(stack)', collection.name, _slice);

					// this should occur after the 
					// required have booted.
					var _h = collection.handler();
					console.log(_h)

				}else if(!collection.set(_slice)) {
					// console.warn("Missing slice for", id, this._stacks, '=', collection);
				} else {
					/* Remove this element from the stack Set */
					//console.log("Slicing", _slice, value)
					if(collection.name == _slice) {
						var i = collection.remove(value);
					}
				}

				if(this.finished(id)) {
					this.callCollection(id);
				}
				
			}

			return ready;
		},

		each: function(func) {

			for (var stackName in Nux.stack._stacks) {
				if (Nux.stack._stacks.hasOwnProperty(stackName)) {
					func(Nux.stack._stacks[stackName]);
				}
			}
		},
		eachSet: function(func){
			// iter each Set in every
			// Stack.
			Nux.stack.each(function(stack) {
				// Nux.stack
				// 	._stacks['example.a']
				// 	.set('required')
				// 	.has(listener.name)
				stack.each(function(set){
					var _s = stack;
					func(set, _s);
				})
			})
		},
		callCollection: function(id, f, s){
			/*
			return the chain handle method assigned to
			this id. This is done automically if finished
			returns true after a remove() call.
			 */
			
			var _call = function(h){
				if(h) {
					return h.apply((collection)? collection.scope() || Nux: this, [collection, this._stacks])
				};
			}

			
			if(Themis.of(id, Function)) {
				f = id;
				id = undefined;
			}
			if(!id) {
				this.each(function(stack){
					if(stack.ready() && !stack.done()) {
						// A stack needs to be 
						// given to this at point
						// of creation.
						// This should be a boot
						// method (for a)
						
						// console.log('Stack callCollection', stack.name)
						// debugger;
						
						var _h = stack.handler() || f;

						_call(_h);
					}
				})
			} else {


				var collection = this.createOrReturn(id);
				var h = collection.handler();

				if(f) {

					collection.handler(f);
					collection.scope(s || this);
					return this;
				};

				return _call(h)
			}
		},
		finished: function(id){
			/*
			If all elements within a stack entity is empty (all
			elements within the slice array have been removed using
			stripFromStack()) then true is returned.
			 */
			var setCollection;
			var ready = 0;
			var setCount = 0;
			for (var ext in this._stacks) {
				setCollection = this._stacks[ext];
				if(setCollection._class == 'Collection') {
					if( setCollection.ready() ) {
						ready += 1;
					}
				} else {
					for (var name in setCollection) {
						setCount++;
						var set = setCollection[name];
						this._stacks[ext][set]
						if(set.hasOwnProperty('ready')) {
							if( set.ready() ) {
								ready += 1;
							}
						}
					}
				}
			}
 
			var comp = setCount == ready;
			// debugger;
			return comp;
		},
		has: function(id, stack) {
			
			if(!stack) {
				var o= false;
				this.each(function(stack) {
					if(stack.name == id) {
						o =true
					}
				})
				return o;
			}

			for (var prop in this._stacks[id]) {
				if(prop == stack) {
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
	
			Nux.stack.has(listener.name);
			Nux.stack.has(listener.name, 'required');
			 */
			if(id) {
				return this._stacks[id]
			}
			return this._stacks;
		}
	}
}).chain({
	// global options
	'listener.handler': 'CHAIN_FIRST', // Ensure this occurs before chain occurs
},function(){
	return {
		listener: {
			handler: function(listener){
				console.log("CREATE stack", listener.name)
				
				Nux.stack.create(listener.name, function() {
					console.log("ERM Boot?!", listener.name);
					// Nux.stack.report(listener.name)
				})

			}
		}
	}
})
