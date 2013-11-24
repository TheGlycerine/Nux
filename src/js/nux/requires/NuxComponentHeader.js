// This shared resource should be implemented as the
// required components header within the boot.
// It's currently here to assist in development ease.
NuxComponentHeader = function(){

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
		Nux.implement(arguments);
	}

};