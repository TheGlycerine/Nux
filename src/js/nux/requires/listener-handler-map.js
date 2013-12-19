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
	// Nux may not exist, t herefore A light loader is implemented
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
				if( meta && meta.required ){
					importObject.expectedListeners = importObject.expectedListeners.concat(meta.required);
				}
			},
			handleRequired: function(listener, callback) {
				var ex = listener.item._meta;
				var map = (ex && ex.map)? ex.map: null,
					required = (ex && ex.required)? ex.required: null,
					errors = (ex && ex.errors)? ex.errors: null,
					assets = (ex && ex.assets)? ex.assets: null;

				// Check the extension for required - push the allowed
				// into the import array for this extension.
				
					/*
					if(Nux.hasOwnProperty('stack'))
					Nux.stack.traverse('expected', function(name){
						if(name == listener.name) {
							console.log('Inserting required for', name, required)
							this.add(required);
						}
					});
					*/
					// ---------
					/*
					
					if(ex && Nux.hasOwnProperty('indexchain') ) {
						var waitChain  = ex.waitChain = Nux.indexchain.create(listener.name, callback)
						var importPath = (ex.hasOwnProperty('importObject'))? ex.importObject.path: ex.path;
					*/
					
					/*
					if(required) {
						console.log('required for', name, required)
						waitChain.add('required', required);
						Nux.use(required, function(){
							waitChain.done('required', required);
						}, importPath);
					}
					*/

					/*
					if(assets && assets.length > 0) {

						console.log("start assets", assets)
						waitChain.add('assets', assets); 

						Nux.assets.load(assets, function(){
							console.log('assets collected', assets)
							waitChain.done('assets', assets)
						}, importPath)
					}
	 				*/
				

				listener.item._meta.booted = false;
				
				var scope = Nux.use(required, function(fo){
					// Boot should be allowed.
					console.log('Required booted');
					
					// Scoped data() should be here and not anywhere else.

					for (var i = 0; i < required.length; i++) {

						var r = Import(required[i]);
						
						if( (r.hasOwnProperty('_meta')) && (!r._meta.booted) ) {
							if(r._meta.hasOwnProperty('main') ) {
								r._meta.main.apply(r, Nux)
								if(listener.hasOwnProperty('_meta')) {
									listener._meta._required = true;
									r._meta.booted = true;
								}
							}
						}
					};
					/*
					Nux.stack.traverse('required', function(name) {
						debugger;
					})
					*/
				}, 
				(ex.hasOwnProperty('importObject'))? ex.importObject.path: ex.path
					)

				
				scope.data({
						listener: listener
					});

				return listener;
			},
			handleAssets: function(listener){
				var ex = listener.item._meta;
				var map = (ex && ex.map)? ex.map: null,
					required = (ex && ex.required)? ex.required: null,
					errors = (ex && ex.errors)? ex.errors: null,
					assets = (ex && ex.assets)? ex.assets: null;

				return listener;
			},
			handler: function(listener){
				var ex = listener.item._meta;
				var map = (ex && ex.map)? ex.map: null,
					required = (ex && ex.required)? ex.required: null,
					errors = (ex && ex.errors)? ex.errors: null,
					assets = (ex && ex.assets)? ex.assets: null;

				/*
				if(ex) listener.item._meta._assets = false;

				if(assets) {
					listener = Nux.listener.handleAssets(listener)
				}

				if(ex && (!ex.__boot)) {
					ex.__boot = function(){
						if(this.hasOwnProperty('main') && !this.booted) {
							this.main.apply(listener.item, Nux);
							this.booted = true;
						}
					}
				}
				if(ex) listener.item._meta._required = false;
				if(required) {
					Nux.listener.handleRequired(listener, (function(){
						// should boot now.
						var ex = this;
						return function(){
							if(ex && ex.hasOwnProperty('__boot')) ex.__boot.apply(this)
						}
					}).apply(ex) )
				} else {
					if(ex && ex.hasOwnProperty('__boot')) ex.__boot.apply(this)
				}
				*/
			
				if(errors) {
					/*
					Implement errors given to for native implementation.
					An error will be provided if the error number has
					been used.
					 */
					for (var errorNo in errors) {
						if (errors.hasOwnProperty(errorNo)) {
							var e = errors.errorNo;
							Nux.errors.add(errorNo, errors[errorNo]);
						}
					}
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