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
				if(ex) {
					if(ex.hasOwnProperty('main')) {
						Nux.stack.call(listener.name, function(){
							ex.main.apply(listener.item, [Nux])

							console.log("required and assets imported, boot", listener.name)
						})
					}
				}

				// if boot
				// add function to stacks

			}
		}
	}
})