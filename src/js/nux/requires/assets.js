;(function(){
	return NuxComponentHeader.apply(this, arguments)
})('assets', {
	// relative prefix for all assets imported
	assetPath: './',

	// global options
	// independant file assets  used for Nux.
	assets: {
		'agile': "%(vendorPath)s/com.iskitz.ajile.src.js?mvcoff,mvcshareoff,cloakoff, debugoff",			
		'zoe': 	"%(vendorPath)s/zoe.min.js",
		'themis': [
			//"%(vendorPath)s/themis/getterSetter.js", 
			"%(vendorPath)s/themis/tester.js"],
		'nux': ["agile", "themis"],
		// assets fundamental to Nux - Will be loaded first
		'required': [
			'themis', 
			'agile',
		]
	}
},function(config, nuxConfig){

	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.
	return {
			allow: function(name) {
				/* returns true or false if the passed name is allowed
				access - this is both user defined and blacklist. 
				If an array is provided an object is returned.
				Key is the name of the iterative, value is true/false */
				if( !Themis.of(name, Array) ) {
					name = [name]
				};

				if( !Nux.__config().hasOwnProperty('allowed') ){
					Nux.errors.throw(30, 'config.def.allowed != []')
					Nux.core.log("WHAT?   Missing access allowances for", name);
					return false;
				};

				var inExtensions = false;

 				name.forEach(function(_name, i, a){
					Nux.__config().allowed.forEach(function(s,j,b){
						if(s == name || Nux.space(s) == _name) {
							inExtensions = true;
							// Nux.core.log('ALLOW   ', _name)
						}
					});
				});

				if( inExtensions || !Nux.__config().secure ) {
					// Nux.core.log("Allow access:", name);
					return true;
				};

				Nux.errors.throw(75, name);
				Nux.core.log("REFUSE ASSET", name);
				return false;
			},

			add: function(obj) {
				/**
				 * assign an object of assets for use
				 * with the framework. Correctly applying 
				 * these will allow for better baking.
				 */
				if(obj) ljs.addAliases(obj);

				return this
			},

			load: function(obj, cb, p) {
				// clean nux string
				var pc = arg(arguments, 2, Nux.__config().assetPath);
				var paths = Nux.config.configif(obj);
				var metaPc = (pc.hasOwnProperty('_meta'))? pc._meta.path: pc;

				var relPaths = Nux.config.relatives(obj, metaPc);

				// console.log('Load', paths, relPaths, metaPc)
				if(metaPc) {
					for (var i = 0; i < relPaths.length; i++) {
						if(metaPc[metaPc.length-1] == '/' || relPaths[i][0] == '/') {
							relPaths[i] = metaPc + '' + relPaths[i];
						}
					};
				}
				try {

					ljs.load(relPaths, cb);
					// console.log('load', obj, pc)
				} catch(e) {
					console.log(e)
				}
			}
		}
}).chain({
	'listener.handler': 'CHAIN'
}, function(){

	return {
		listener: {
			handler: function(listener){
				// assets inhection
				var ex = listener.item._meta;
				var assets = (ex && ex.assets)? ex.assets: null;

				if(assets && assets.length > 0) {
					// this.add(listener.name, 'assets', assets);
					var importPath = (ex) ? ex.importObject.path: null;
					
					console.log("ASSETS", assets)

					Nux.assets.load(assets, (function(ex){
						var self = this;

						return function(){
							console.log("DONE ASSETS", assets);
						}
					}).apply(this, [ex]), importPath)
				} else {
					if(listener.item.hasOwnProperty('_meta')){
						ex.assetsLoaded = true;
					}
				}

				Nux.listener.newStyleStack.stripFromStack('required', listener.name)
				Nux.listener.newStyleStack.handle(listener);
			}
		}
	}
})
