;(function(){
	NuxComponentHeader.apply(this, arguments)
})('listener', {
	// global options
},function(){
	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.
	return {
			// Storage place of handlers waiting for
			// imports
			listeners: [],
			masterListeners: {},
			// Is true when Nux is ready to accept
			// events
			add: function(names, handler){
				
				// Loop names, applying namespace - 
				// follow by applying this as the new
				// handler hook chain
				
				// Call the master listener, passing the element 
				// if which is called.
				Nux.listener.masterListener(names);

				var hookChain = [];
				for (var i = 0; i < names.length; i++) {
					var space = Nux.space(names[i]);
					hookChain.push(space);
				};

				// Push the listener chain
				Nux.listener.listeners.push({
					expectedListeners: hookChain,
					listeners: [handler],
					// List of extensions imported
					// (later to be passed to the handler method
					// as arguments)
					extensions: []
				});
				
				return true;
			},
			masterListener: function(space){
				/*
				Create and return the master listener
				 */

				if(!Nux.listener.masterListeners.hasOwnProperty(space)) {
					Nux.listener.masterListeners[space] = 1;
				} else {
					Nux.listener.masterListeners[space]++;
				};
				
				if(!Nux.listener.masterListeners['master']) {

					Nux.listener.masterListeners['master'] = Ajile.AddImportListener(Nux.listener.handler);
				}
				return Nux.listener._masterLister;
			},
			handler: function(listener){
				/*
				An extension was imported. The object passed is the 
				listener object containing the extension and the handler
				 */
				// call all methods hooked
				var ex = listener.item._meta;
				var handlers = [],
					required = (ex && ex.required)? ex.required: null,
					assets = (ex && ex.assets)? ex.assets: null;
					map = (ex && ex.map)? ex.map: null;

				if( listener.item ) {
					Nux.bootloader.wrap(listener.item);
				}

				if(required) {
					Nux.use(required, function(){
						// Boot should be allowed.
						listener.item.boot('requires');
					});
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

				if(assets) {
					var assetsLoaded = (function(listener){

						// This method will be called 
						// when the assets have been loaded. If no
						// assets are required, it will be called
						// immediately.
						var ext = listener.item
						return function(){
							ext._meta.assetsLoaded = true;
							ext.boot('assets');
						}

					})(listener);
					ex.assetsLoaded = false
					Nux.assets.load(assets, assetsLoaded);
				} else {
					if(listener.item.hasOwnProperty('_meta')){
						ex.assetsLoaded = true;
					}
				}
				
				// strip the listener names from expected listeners
				var len = Nux.listener.listeners.length;
				while(len--) {

					var handler = Nux.listener.listeners[len];

					var ni = handler.expectedListeners.indexOf(listener.name);
					if(ni > -1) {

						// Check the extension for required - push the allowed
						// into the import array for this extension.
						if(required) {
							handler.expectedListeners = handler.expectedListeners.concat(required);
						}

						// remove the name of the expected listeners
						handler.expectedListeners.splice(ni, 1);
						// add a reference to the item imported.
						// by using the same index, arguments passed
						// back to the handler method are
						// positioned the same in the arguments
						// list
						handler.extensions.push(listener.item);

					}

					if(handler.expectedListeners.length == 0) {
						// If all the expected listeners have been
						// removed, all extensions required for 
						// this handler have been fetched.
						handlers = handlers.concat(handler.listeners);
						Nux.listener.listeners.splice(len, 1);
					}
				};

				// run the extension boot method (main|run) 
				
				// Call each handler in the array
  				for (var i = 0; i < handlers.length; i++) {
					var hook = handlers[i];
					hook.apply(Nux, handler.extensions);
				};
			},
		}
})
