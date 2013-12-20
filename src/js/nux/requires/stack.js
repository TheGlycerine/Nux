;(function(){
	NuxComponentHeader.apply(this, arguments)
})('stack', {
	// global options
},function(){

	return {
		_stacks: {},
		add: function(id, stack, values) {
			/*
			Adds to a stack
			 */
			if(!this._stacks.hasOwnProperty(id)) this._stacks[id] = {};
			if(!this._stacks[id].hasOwnProperty(stack)) this._stacks[id][stack] = [];
			// console.log('add', id, stack)
			this._stacks[id][stack] = this._stacks[id][stack].concat(values)
		},
		remove: function(_slice, value){
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

				if(slice && slice.length == 0) {
					// console.log(_slice, "done for slice", id)
					if(!ready.hasOwnProperty(id)) ready[id] = []
					ready[id].push(_slice);
				}

				if(this.finished(id)) {
					this.call(id)
				}
				
			}

			return ready;
		},
		call: function(id, f, s){
			/*
			return the chain handle method assigned to
			this id. This is done automically if finished
			returns true after a remove() call.
			 */
			if(!this._stacks[id])this._stacks[id] = {}
			if(f) {
				this._stacks[id].handler = f;
				this._stacks[id].scope = s || this;
				return this;
			}

			var h = this._stacks[id].handler;
			if(h) {
				h.apply(this._stacks[id].scope || Nux)
			}
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
	}
})
