;(function(){
	NuxComponentHeader.apply(this, arguments)
})('assets', {
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
				ljs.load(paths, cb);
				try {
					// console.log('load', obj, pc)
				} catch(e) {
					console.log(e)
				}
			}
		}
})
