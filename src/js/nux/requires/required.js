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

				if(required) {
					// this.addToStack(listener.name, 'required', required);
					var self = this;

					console.log('REQUIRED', listener.name, required)
					Nux.stack.add(listener.name, 'required', required)
					Nux.use(required, function(){
						console.log('DONE REQUIRED', required)
						Nux.stack.add('required', required)
					}, ex.path);
				}
			}
		}
	}
})
