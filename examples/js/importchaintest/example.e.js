var _example = Nux.NS('example.e');

_example.myFoo = function(){
	console.log("Hey! I'm a nux extension")
	return true;
}

/* Nux extension stuff below */

_example._meta.main = function(config) {
	/*
	should boot last
	 */
	console.log("5. BOOT: example E")
}

_example._meta.required = [
	'example.e'
]