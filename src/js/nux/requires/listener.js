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
				var path = arg(arguments, 2, null);
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
					// Store the import path of this object
					// to be later passed to imported children,
					path: path,
					// List of extensions imported
					// (later to be passed to the handler method
					// as arguments)
					extensions: []
				});
				
				return true;
			},
			getListener: function(name){
				// Return the space listener item containing import
				// information on this imported object by reference of it's name.
				var ret =[]
				for (var i = 0; i < Nux.listener.listeners.length; i++) {
					var entity = Nux.listener.listeners[i];
					if(entity.expectedListeners.indexOf(name) > 0) {
						ret.push(entity)
					}
				};

				return ret;
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
			handler: function(listener) {
				/*
				An extension was imported. The object passed is the 
				listener object containing the extension and the handler
				 */
				// call all methods hooked
				var ex = listener.item._meta;
				var handlers = [];

				// strip the listener names from expected listeners
				var len = Nux.listener.listeners.length;
				
				while(len--) {
					var importObject = Nux.listener.listeners[len];

					var ni = importObject.expectedListeners.indexOf(listener.name);

					if(ni > -1) {

						// remove the name of the expected listeners
						importObject.expectedListeners.splice(ni, 1);
						// add a reference to the item imported.
						// by using the same index, arguments passed
						// back to the handler method are
						// positioned the same in the arguments
						// list
						importObject.extensions.push(listener.item);
						ex.importObject = importObject;
						// This item is expected and has listeners attached waiting.
						Nux.listener.handleExpected(importObject, listener.item, ex);
					}

					if(importObject.expectedListeners.length == 0) {
						// If all the expected listeners have been
						// removed, for an import object - all extensions required for 
						// this handler have been fetched.

						// Merge the listeners of the import handlers into the array
						// of handlers to be called.
						handlers = handlers.concat(importObject.listeners);

						Nux.listener.listeners.splice(len, 1);
					}
				};

				Nux.listener.callListenerHook(handlers, listener.item, listener.item._meta)
			},

			handleExpected: function(importObject, extension, meta) {

			},

			callListenerHook: function(handlers, extension, meta){
				// Called for the listener hooks waiting on an extension and it's
				// requirements to be called. Once all valid imports are
				// successfull, this method is called

				// run the extension boot method (main|run) 

				// Call each handler in the array
  				for (var i = 0; i < handlers.length; i++) {
					var hook = handlers[i];
					hook.apply(Nux, [extension]);
				};
			}
		}
})
