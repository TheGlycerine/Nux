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
					Nux.fetch.use(required, function(){
						console.log('REQUIRED received', required)
					}, ex.path);
				}
			}
		}
	}
})
