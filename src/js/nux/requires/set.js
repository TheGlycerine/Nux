;(function(){
	return NuxComponentHeader.apply(this, arguments)
})('set', {
},function(config, nuxConfig){

	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.
	
}).chain({
	'stack.Set': 'REPLACE',
}, function(){

	return {
		stack: {
			Set: function(name, list, handler){
				/*
			A set defines a name and a list of elements.
			When the elements are removed a handler is called.
			Applied is a reduce method; to provide a 
			boolean value as return. This defines if the 
			element is ready.
			 */
			return (function Set(name, list, handler){
				// set to true when the handler has been called.
				var handled = false;

				this._class = 'Set'
				this.name = name;
				this.list = list.slice(0);
				this.handler = handler;
				this._ready = false;
				this._removeFilter;
				this.add = function(values){
					/*
					Add an element or a list of elements
					to the list.
					 */
					if(Themis.of(values, Array)) {
						this.list.concat(values);
					} else {
						this.list.push(values);
					}

					this.testHandler();
					return this;
				}

				this.ready = function(){
					this._ready = false;
					if(this.list.length == 0) {
						this._ready = true;
					}
					return this._ready;
				};

				this.each = function(func){
					for (var i = 0; i < this.list.length; i++) {
						var el = this.list[i];
						func(el)
					};
				};

				this.done = function(){
					return (this.ready && handled)
				}

				this.testHandler = function(){
					// call the handler if the set is ready.
					var _ready = this.ready()
					// if(_ready) debugger;
					if(_ready && this.handler && !handled){
						console.log('  -', this.name, 'finished')
						this.handler(this);

						this.handled = true;
					}
				}
				
				this.removeFilter = function(fun){
					if(fun) {
						this._removeFilter = fun;
						return this;
					} else {
						return this._removeFilter;
					}

				}

				this.has = function(value) {
					// return true/false
					// if this Set has the value 
					// within it's stack.
					return (this.list.indexOf(value) > -1)
				}

				this.remove = function(values){
					/* remove one or more elements from the list */
					var self = this;
					var _strip = function(value){
						var r = self.removeFilter();
						if(r) {
							r(this, value);
						} else {
							// if(value == 'example.c') debugger;
							var j = self.list.indexOf(value);
							// console.log('finding slice', value, typeof(value), 'in', slice, 'for', id)
							if(j > -1) {
								// if(Themis.of(value, Object)) debugger;
								if(self.name == 'boot' && value == 'example.a')debugger;
								console.log('slice', self.name, value)
								self.list.splice(j, 1);
							}
						}

					};
					if(Themis.of(values, Array)) {
						for (var i = 0; i < this.list.length; i++) {
							var value = this.list[i];
							_strip(value)
						};

					} else {
						value = values;
						_strip(value);
					}

					if(values !== undefined) return this;
					return this.list;
				}

				// this.testHandler()
				return this;

			}).call({}, name, list, handler);

			}
		}
	}
})
