/*
An extension can boot a method when first
imported. This boot depends upon if:
	
	And requirements have been imported
	Any requirements have been booted
	Any assets have loaded

Once these conditions are met, the _meta.main method
will be executed.
 */
;(function(){
	return NuxComponentHeader.apply(this, arguments)
})('wait', {
}, function(){
}).chain({
	// global options
	'listener.handler': 'CHAIN_FIRST', // Ensure this occurs before chain occurs
},function(){
	return {
		listener: {
			handler: function(listener) {
				
				var ex = listener.item._meta;
				var map = (ex && ex.map)? ex.map: null,
					required = (ex && ex.required)? ex.required: null,
					errors = (ex && ex.errors)? ex.errors: null,
					assets = (ex && ex.assets)? ex.assets: null;
					// console.log("!!  listener", listener.name);					
					
					var collection =  Nux.stack.add(listener.name, 'wait', []);
					
					Nux.stack.eachSet(function(set, stack) {
						if( set.has(collection.name) ) {
							// Push this stack into the wait
							console.log("Push (wait)", collection.name, 'to', stack.name)
							stack.set('wait').add(collection)
						}
					})

				// if boot
				// add function to stacks

			}
		}
	}
})