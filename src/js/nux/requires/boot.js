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
})('bootmain', {
}, function(){
	console.log("Boot")
}).chain({
	// global options
	'listener.handler': 'CHAIN', // Ensure this occurs before chain occurs
},function(){
	return {
		listener: {
			handler: function(listener) {
				
				var ex = listener.item._meta;
				var map = (ex && ex.map)? ex.map: null,
					required = (ex && ex.required)? ex.required: null,
					errors = (ex && ex.errors)? ex.errors: null,
					assets = (ex && ex.assets)? ex.assets: null;
					// console.log("listener", listener.name);

				var stack = Nux.stack.createOrReturn(listener.name)
				
				var bootMethod =  function(ex){
					if(ex.hasOwnProperty('main')) {
						ex.main.apply(listener.item, [Nux]);
					};

					console.log("Boot method", listener.name);
					Nux.stack.remove('boot', listener.name)
					// A list of elements required
					// before boot.
					// stack.sets()
				}

				// Nux.stack.report()
				
				if(ex && ex.hasOwnProperty('main')) {
					var collection =  Nux.stack.add(listener.name, 'boot', [listener.name]);
					
					// Add this collection.boot to any other
					// boot - therefore when a boot occurs - all
					// elements waiting for it's boot is called.
					Nux.stack.eachSet(function(set, collection){
						if(set.has(listener.name) && (collection.name != listener.name) ) {
							console.log('BOOT', listener.name, 'waits for', collection.name)
							collection.set('boot').add(listener.name);
						}
					})
					
					collection.handler( (function(){
						var ex = this;
						return function(){
							console.log('Boot');
							bootMethod(ex);
						}
					}).apply(ex) )
					// if boot
					// add function to stacks
				}
			}
		}
	}
})