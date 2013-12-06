;(function(){
	return NuxComponentHeader.apply(this, arguments)
})('bootloader', {
	// global options
},function(){
	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.
	return {
			/*
			booting and boot handlers ensure extensions and
			required extensions are booted in a queue.
			 */
			boots: {},
			mainSpace: function(ext){
				/*
				space provided to the main() method when a new
				component is booted
				 */
				
				return {
					ext: ext,
					scope: ext,
					arguments: [Nux]
				}
			},

			wrap: function(ext){
				/*
				Wrap the object into a boot sequence 
				setup with an endpoint inject into the
				extension configured to run the main method
				at the correct time
				 */
				var bootSpace = ( Nux.bootloader.boots.hasOwnProperty(ext.name) )? 
									Nux.bootloader.boots[ext.name]: null;
				
				if( !Nux.bootloader.boots[ext.name] ) {
					bootSpace = Nux.bootloader.boots[ext.name] = {
						requires: true,
						assets: true,
						init: false
					}
				}

				if(ext._meta) {	
					if( ext._meta.required ) {
						bootSpace.requires = false;
					}

					if( ext._meta.assets ) {
						bootSpace.assets = false;
					}
				}

				bootFunction = (function(bootSpace){
					var mainSpace = this;
					return function(loadVal){

						var self = mainSpace;
						var val = arg(arguments, 1, true);
						var extBootSpace = bootSpace;
						extBootSpace[loadVal] = val;
						
						var tv = true;
						for(var x in extBootSpace) {
							if( extBootSpace[x] === false ) {
								tv = false;
							}
						}
						
						if( tv ) {
							// All components for boot have been flagged true.
							// proceed to call the main boot method.
							if( ext._meta && 
								ext._meta.hasOwnProperty('main') && 
								!extBootSpace.booted
								) {

								
								ext._meta.main.apply(self.scope, self.arguments);
								extBootSpace.booted = true;
							

							}
						}
						
					}

				}).apply(this.mainSpace(ext), [bootSpace]);

				if(!ext._meta) {
					ext._meta = {}
				}
				ext._meta.boot = bootFunction;
				// Calls the boot function and persists to 
				// run the method. The 'init' is mearly to 
				// shim a value to change and to provide some 
				// context of sequence for later event listeners.
				ext._meta.boot('init')
				return ext
			}
		}
}).chain({
	'listener.handler': 'CHAIN',
	'listener.importObject': 'CHAIN'
}, function(){
	return {
		listener: {
			handler: function(listener){

				if( listener.item ) {

					Nux.bootloader.wrap(listener.item);
				}

			},
			importObject: function(hookChain, handler, path){
				// debugger;
			}
		}
	}
})
