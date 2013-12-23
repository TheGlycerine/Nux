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

				if( Nux.stack.has(listener.name) ) {
					console.warn('stack', listener.name, Nux.stack._stacks[listener.name])
				}

				if(ex) {
					var stack = Nux.stack.createOrReturn(listener.name)
					var bootMethod =  function(stack, stacks){
				
						ex.main.apply(listener.item, [Nux]);
						// A list of elements required
						// before boot.
						// stack.sets()
						console.log("required and assets imported, boot", listener.name);

					}
					if(ex.hasOwnProperty('main') && stack.ready()) {
					
						console.log('* BOOT Booting', listener.name)
						Nux.stack.callCollection(listener.name, bootMethod)
						console.log('* BOOT BOOTED', listener.name);
						// Inform the stack this listener is done
						Nux.stack.callCollection(bootMethod)
						
					}
				}

				// if boot
				// add function to stacks

			}
		}
	}
})