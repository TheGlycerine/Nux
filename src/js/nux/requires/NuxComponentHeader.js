// This shared resource should be implemented as the
// required components header within the boot.
// It's currently here to assist in development ease.
NuxComponentHeader = function __self(){

	if(!window.hasOwnProperty('Nux')) {
		
		function assign(obj, keyPath, value) {
		   lastKeyIndex = keyPath.length-1;
		   for (var i = 0; i < lastKeyIndex; ++ i) {
		     key = keyPath[i];
		     if (!(key in obj))
		       obj[key] = {}
		     obj = obj[key];
		   }

		   obj[keyPath[lastKeyIndex]] = value;
		   return obj
		}

		NuxImplement(arguments);
	} else {
		Nux.implement.apply(this, arguments);
	}

	// Return an entity used to extend this after import
	return (function(){
		var options = arg(arguments, 0, {});
		var method = arg(arguments, 1, null);
		
		return {
			options: options,
			method: method,
			chain: function(map, obj) {
				return NuxComponentHeader.apply(this, arguments)

			},
			meta: function(name, v){
				/*
				Apply meta data about your nux component to add
				context when in use
				 */
				if(!window.hasOwnProperty('Nux')) {
					console.error('meta method not implemented')
				} else {
					Nux.errors.throw(04, 'meta', name);
				}
			}
		};

	}).apply(this, arguments);

};