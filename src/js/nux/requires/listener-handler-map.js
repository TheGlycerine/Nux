;(function(){
	return NuxComponentHeader.apply(this, arguments)
})('handler', {

}, function(){

}).chain({
	// global options
	'listener.handler': 'CHAIN',
	'listener.handleExpected': 'CHAIN'
},function(){
	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.
	return {
		listener:{
			handleExpected: function(importObject, extension, meta){
				/*
				Handle expected import - an extension has been loaded.
				 */
				// If this extension has requirements, push them into the array of listeners 
				// required for the handler event
				if( meta.required ){
					importObject.expectedListeners = importObject.expectedListeners.concat(meta.required);
				}
			},

			handler: function(listener){
				var ex = listener.item._meta;
				var map = (ex && ex.map)? ex.map: null,
					required = (ex && ex.required)? ex.required: null;

				if(required) {
					// Check the extension for required - push the allowed
					// into the import array for this extension.
					Nux.use(required, function(){
						// Boot should be allowed.
						listener.item.boot('requires');
					}, (ex.hasOwnProperty('importObject'))? ex.importObject.path: null);
				}


				if(map) {
					for(var item in map) {
						
						// The item is the name of the
						// method to override.
						// the object value (map[item])
						// can be:
						// 	String - local method name to default chain
						// 	method - method to chain
						// 	Array [String|func] -
						// 	 in the array can a string or method
						// 	 set to implement as a chain.
						var val = map[item],
							target = Import(item),
							_mapMethod = null;

						for(method in val) {

							if(Themis.of(val[method], String)) 
							{
								// Implement a string
								// method into the chain
								_mapMethod = listener.item[val[method]]
							} 
							else if(Themis.of(val[method], Function)) 
							{
								// Implement a function
								// to the chain
								_mapMethod = val[method]
							} 

							if(_mapMethod) {
								var importItem = Import(item);
								// console.log('override', method);
							
								zoe.fn([importItem[method]], _mapMethod)
								// zoe.fn(importItem, method, _mapMethod);
								// console.log('override', importItem)								
							}
						}
						// chain the methods into the mapping
						}
				}
			}
		}
	}
})