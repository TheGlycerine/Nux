;(function(){
	NuxComponentHeader.apply(this, arguments)
})('data', {
	// global options
}, function(){
	// Hopefully this occurs when the user builds a chain,
	// allowing for scope understanding for all method bounds.
	// debugger;
	var s = {}
	return function(obj){
		var global = arg(arguments, 1, false)
		/* provide array or string of assets to import 
		these elements will be available to the bound 
		methods within the use string 
		*/
		var o = (global)? s: this.data;

		if(obj === undefined) {
			return s;
		}
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				var el = obj[prop];
				o[prop] = el;
			}
		}
		this.data = obj;
		return this;
	}
})
