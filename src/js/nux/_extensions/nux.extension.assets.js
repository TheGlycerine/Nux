var assets = Namespace(Nux.space('assets'));

assets._meta.assets = [
]

assets.allow: function(name) {
	/* returns true or false if the passed name is allowed
	access - this is both user defined and blacklist. 
	If an array is provided an object is returned.
	Key is the name of the iterative, value is true/false */
	if( !Themis.of(name, Array) ) {
		name = [name]
	};

	if( !Nux.config.def.hasOwnProperty('allowed') ){
		Nux.errors.throw(30, 'config.def.allowed != []')
		Nux.core.log("WHAT?   Missing access allowances for", name);
		return false;
	};

	var inExtensions = false;

		name.forEach(function(_name, i, a){
		Nux.config.def.allowed.forEach(function(s,j,b){
			if(s == name || Nux.space(s) == _name) {
				inExtensions = true;
				// Nux.core.log('ALLOW   ', _name)
			}
		});
	});

	if( inExtensions || !Nux.config.def.secure ) {
		// Nux.core.log("Allow access:", name);
		return true;
	};

	Nux.errors.throw(75, name);
	Nux.core.log("REFUSE ASSET", name);
	return false;
};

assets.add: function(obj) {
	/**
	 * assign an object of assets for use
	 * with the framework. Correctly applying 
	 * these will allow for better baking.
	 */
	if(obj) ljs.addAliases(obj);

	return this
};

assets.load: function(obj, cb, p) {
	// clean nux string
	var pc = arg(arguments, 2, Nux.config.def.assetPath);
	ljs.path(pc);
	ljs.load(obj, cb);

	try {
		console.log('load', obj, pc)
	} catch(e) {
		console.log(e)
	}
};

