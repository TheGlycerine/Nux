;(function(){
	NuxComponentHeader.apply(this, arguments)
})('stack', {
	// global options
},function(){
	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.
	var stackSpace = []
	return {
		_scopes: ['handlers', 'expected'],
		_space: stackSpace,
		stackChain: function(name, _name, handlers){
			var self = this;
			self._array = [];
			self.name = name;

			var scope = function(handlers) {
				this.chain = {
					data: {},
					handlers: handlers,
					name: self.name,
					_name: _name,
					add: function(e){
						// add an element to this stack
						for (var i = 0; i < e.length; i++) {
							self._array.push(e[i])
						};
					},
					list: function(){
						return self._array;
					},
					each: function(f){
						var l = this.list();
						var ret = []
						for (var i = 0; i < l.length; i++) {
							ret.push( f.apply(this, [ l[i] ]) );
						};
						return ret;
					},
					remove: function(v) {
						for (var i = self._array.length - 1; i >= 0; i--) {
							if(self._array[i] == v) {
								self._array.splice(i, 1);
							}
						};
						if(self._array.length == 0) {
							this.call()
						}
					}, 
					call: function(){
						// call the assigned handlers
						console.log('Call handlers', this._name, this.name, handlers)
						for (var i = 0; i < handlers.length; i++) {
							debugger;
							// Pass the ext of which called through here...
							handlers[i]()
						};
						
					}
				}

				return this.chain;
			}

			var _scope =  new scope(handlers)
			return _scope;
		},
		extend: function(name){

		},
		scopes: function(s){

			if(s) {
				this._scopes.push(s);
				return this;
			}

			return this._scopes;
		},
		traverse: function(scope, func) {
			for (var i = 0; i < stackSpace.length; i++) {
				var stack = stackSpace[i];
				if(stack.hasOwnProperty(scope))
				var items = stack[scope].each(func);
			};
		},

		create: function(name, handler) {
			var space = {
				data: {
					name: name
				}
			}

			var _scopes = this.scopes();

			for (var i = 0; i < _scopes.length; i++) {
				var scope = _scopes[i];
				space[scope] = new this.stackChain(scope, name, [handler])
			};

			stackSpace.push(space);
			return space;
		}
	}
})
