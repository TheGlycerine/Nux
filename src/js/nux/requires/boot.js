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
					errors = (ex && ex.errors)? ex.erro]]]2q  rs: null,
					assets = (ex && ex.assets)? ex.assets: null;
				console.log("listener", listener.name);

				if( Nux.stack.has(listener.name) ) {
					debugger;
					console.log('stack', listener.name, Nux.stack._stacks[listener.name])
				}

				if(ex) {
					if(ex.hasOwnProperty('main')) {


						Nux.stack.callCollection(listener.name, function(stack, stacks){
							
							ex.main.apply(listener.item, [Nux]);
							// A list of elements required
							// before boot.
							stack.sets()
							console.log("required and assets imported, boot", listener.name);


						})
					}
				}

				// if boot
				// add function to stacks

			}
		}
	}
})