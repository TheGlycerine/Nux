/*
# Required.

An extension can optionally provide a list of elements
 */

;(function(){
	return NuxComponentHeader.apply(this, arguments)
})('required', {

},function(config, nuxConfig){

	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.
	
}).chain({
	'listener.handler': 'CHAIN',

}, function(){

	return {
		listener: {
			handler: function(listener){
				var ex = listener.item._meta;
				var required = (ex && ex.required)? ex.required: null;

				// debugger;
				if(required) {
					// this.addToStack(listener.name, 'required', required);
					var self = this;

					console.log('REQUIRED', listener.name, required)
					// debugger;
					Nux.stack.add(listener.name, 'required', required);
					/*
					Given is a list of Sets - elements to 
					wait for empty before executing the final
					handler
					
					Nux.stack._stacks[listener.name].sets()

					 */
					Nux.use(required, (function(){
						var listener = this;
						return function(){
							Nux.stack.remove('required', required)
							console.log('DONE REQUIRED', required)
						}

					}).call(listener), ex.path);
				}
			}
		}
	}
})
